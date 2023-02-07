import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';
import { PASSWORD_VALIDATION } from '../auth.constants';

export class ChangeDto {
  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'user`s password',
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: PASSWORD_VALIDATION,
    },
  )
  readonly password: string;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'user`s confirm password',
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: PASSWORD_VALIDATION,
    },
  )
  @Match('password')
  readonly confirmPassword: string;
}
