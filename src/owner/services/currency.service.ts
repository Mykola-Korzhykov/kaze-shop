import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Owner } from '../models/owner.model';
import { Currencies } from '../models/currencies.model';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import countryToCurrency from 'country-to-currency';
import { Cron, CronExpression } from '@nestjs/schedule';
import getSymbolFromCurrency from 'currency-symbol-map';
@Injectable({ scope: Scope.TRANSIENT })
export class CurrencyService {
  private Logger = new Logger(CurrencyService.name);
  constructor(
    @InjectModel(Currencies)
    private readonly currenciesRepository: typeof Currencies,
    @InjectModel(Owner) private readonly ownerRepository: typeof Owner,
    private readonly httpService: HttpService,
  ) {}

  async setCurrencies(ownerId: number) {
    const currencies = await Currencies.findAll();
    if (currencies.length > 0) {
      this.Logger.log(currencies);
      return false;
    }
    let data: any;
    try {
      data = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.CURRENCIES_URL.trim()}/latest?base=${process.env.BASE_CURRENCY.trim()}`,
            {
              headers: {
                apikey: process.env.CURRENCIES_API_KEY.trim(),
                'Accept-Encoding': 'gzip,deflate,compress',
              },
            },
          )
          .pipe(map((res) => res.data))
          .pipe(
            catchError((error) => {
              this.Logger.error(error.response.data);
              throw error;
            }),
          ),
      );
      this.Logger.log(data);
      const currency = await Currencies.create({
        base: data.base,
        date: data.date,
        rates: JSON.stringify(data.rates),
      });
      currency.setOwnerId(ownerId);
      const owner = await Owner.findByPk(ownerId);
      currency.setAuthor(owner);
      await currency.save();
    } catch (error) {
      this.Logger.error(error);
      data = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.API_CURRENCIES.trim()}/${process.env.BASE_CURRENCY.trim()}.json`,
            { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } },
          )
          .pipe(map((res) => res.data))
          .pipe(
            catchError((error) => {
              this.Logger.error(error.response.data);
              throw error;
            }),
          ),
      );
      const currency = await Currencies.create({
        base: Object.keys(data)[1].toUpperCase().trim(),
        date: data.date,
        rates: JSON.stringify(
          data[process.env.BASE_CURRENCY.toLowerCase().trim()],
        ),
      });
      currency.setOwnerId(ownerId);
      const owner = await Owner.findByPk(ownerId);
      currency.setAuthor(owner);
      await currency.save();
    }
  }

  async renewCurrencies(): Promise<Currencies> {
    const currencies = await this.currenciesRepository.findAll({
      include: { all: true },
    });
    const currency = currencies[0];
    let data: any;
    try {
      data = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.CURRENCIES_URL.trim()}/latest?base=${process.env.BASE_CURRENCY.trim()}`,
            {
              headers: {
                apikey: process.env.CURRENCIES_API_KEY.trim(),
                'Accept-Encoding': 'gzip,deflate,compress',
              },
            },
          )
          .pipe(map((res) => res.data))
          .pipe(
            catchError((error) => {
              this.Logger.error(error.response.data);
              throw error;
            }),
          ),
      );
      currency.base = data.base;
      currency.date = data.date;
      currency.rates = JSON.stringify(data.rates);
      await currency.save();
    } catch (error) {
      this.Logger.error(error);
      data = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.API_CURRENCIES.trim()}/${process.env.BASE_CURRENCY.trim()}.json`,
            { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } },
          )
          .pipe(map((res) => res.data))
          .pipe(
            catchError((error) => {
              this.Logger.error(error.response.data);
              throw error;
            }),
          ),
      );
      currency.base = Object.keys(data)[1].toUpperCase().trim();
      currency.date = data.date;
      currency.rates = JSON.stringify(
        data[process.env.BASE_CURRENCY.toLowerCase().trim()],
      );
      await currency.save();
      return currency;
    }
  }

  async getCurrentCurrency(countryIsoCode: string): Promise<{
    currrencyCode: string;
    symbol: string;
    rate: number;
  }> {
    const currrencyCode = countryToCurrency[countryIsoCode];
    const currencies = await this.currenciesRepository.findAll({});
    if (currencies.length === 0) {
      return null;
    }
    const currency = currencies[0];
    const availableCurrencies: {
      [key: string]: number;
    } = JSON.parse(currency.rates);
    if (currrencyCode.toLowerCase() in availableCurrencies) {
      return {
        currrencyCode: countryToCurrency[countryIsoCode],
        symbol: getSymbolFromCurrency(currrencyCode),
        rate: availableCurrencies[currrencyCode.toLowerCase()],
      };
    }
    if (currrencyCode in availableCurrencies) {
      return {
        currrencyCode: countryToCurrency[countryIsoCode],
        symbol: getSymbolFromCurrency(currrencyCode),
        rate: availableCurrencies[currrencyCode],
      };
    }
    return null;
  }

  @Cron(CronExpression.EVERY_WEEK, {
    disabled: true,
  })
  async renewCurrenciesCron(): Promise<Currencies> {
    return this.renewCurrencies();
  }
}
