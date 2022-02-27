import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IbanController } from './controllers/iban/iban.controller';
import { IbanService } from './services/iban/iban.service';
import { BalanceService } from './services/balance/balance.service';
import { BalanceController } from './controllers/balance/balance.controller';
import { TransferController } from './controllers/tranafer/transfer.controller';
import { TransferService } from './services/transfer/transfer.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, IbanController, BalanceController, TransferController],
  providers: [AppService, IbanService, BalanceService, TransferService],
})
export class AppModule {}
