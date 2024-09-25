// src/DatabaseEntity/bills/bills.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  async create(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.billsService.createBill(createBillDto);
  }
}
