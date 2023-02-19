import {
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Owner } from '../models/owner.model';
import { Currencies } from '../models/currencies.model';
import axios from 'axios';
@Injectable({ scope: Scope.TRANSIENT })
export class CurrencyService {
    private readonly Logger = new Logger(CurrencyService.name);
    constructor(
        @InjectModel(Currencies) private readonly currenciesRepository: typeof Currencies,
        @InjectModel(Owner) private readonly ownerRepository: typeof Owner,
    ) { }
    
    static async setCurrencies(ownerId: number) {
        const currencies = await Currencies.findAll();
        if (currencies.length > 0) {
            console.log(currencies);
            return;
        }
        const response = await axios.get(
            `${process.env.CURRENCIES_URL.trim()}/latest?base=${process.env.BASE_CURRENCY.trim()}`,
            {
                headers: {
                    'apikey': process.env.CURRENCIES_API_KEY.trim(),
                },
            }
        );
        const currency = await Currencies.create({});
    }
}