import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class BalanceService {
  constructor(private readonly appService: AppService) {}

  getBalance() {
    const balance = this.appService.getBalance();
    console.log(balance);

    const responseObj = {
      code: 200,
      data: {
        balance: balance,
      },
    };

    return responseObj;
  }
}
