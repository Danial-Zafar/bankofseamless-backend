import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { countryIbanLookup } from 'src/data/iban-lookup.reference';

import { TransferAmoundReqModel } from 'src/models/transfer-amount.req';

@Injectable()
export class TransferService {
  constructor(private readonly appService: AppService) {}

  tranferAmount(iban: string, body: TransferAmoundReqModel) {
    if (!this.isValidIBan(iban)) {
      throw new HttpException('IBAN is not valid', HttpStatus.BAD_REQUEST);
    } else if (!this.isValidCurrency(iban, body)) {
      throw new HttpException(
        'IBAN does not match with currency',
        HttpStatus.CONFLICT,
      );
    } else {
      if (this.appService.getBalance() > body.amount) {
        this.appService.updatebalance(body.amount);

        return {
          code: 202,
        };
      } else {
        throw new HttpException(
          'amount exceeds the available balance',
          HttpStatus.PAYMENT_REQUIRED,
        );
      }
    }
  }

  isValidCurrency(iban: string, body: TransferAmoundReqModel): boolean {
    const countryCode = iban.substring(0, 2);

    if (countryIbanLookup[countryCode]) {
      const lookup = countryIbanLookup[countryCode];

      return lookup[0] === body.currency ? true : false;
    }
  }

  isValidIBan(iban): boolean {
    return false;
  }
}
