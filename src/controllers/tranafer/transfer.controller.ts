import { Body, Controller, Param, Post } from '@nestjs/common';
import { TransferAmoundReqModel } from 'src/models/transfer-amount.req';
import { TransferService } from 'src/services/transfer/transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post(':iban')
  tranferAmount(
    @Param('iban') iban: string,
    @Body() body: TransferAmoundReqModel,
  ) {
    return this.transferService.tranferAmount(iban, body);
  }
}
