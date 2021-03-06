import { Controller, Get } from '@nestjs/common';

import { BalanceService } from 'src/services/balance/balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  getBalance() {
    return this.balanceService.getBalance();
  }
}
