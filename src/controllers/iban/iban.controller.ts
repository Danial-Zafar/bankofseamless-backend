import { Controller, Get, Param } from '@nestjs/common';
import { IbanService } from 'src/services/iban/iban.service';

@Controller('bank')
export class IbanController {
  constructor(private readonly ibanService: IbanService) {}

  @Get(':iban')
  validateIban(@Param('iban') iban: string) {
    return this.ibanService.validateIban(iban);
  }
}
