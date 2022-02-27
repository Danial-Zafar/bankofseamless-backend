import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  balance = 100000;

  getBalance() {
    return this.balance;
  }

  updatebalance(transfer: number) {
    this.balance -= transfer;
  }
}
