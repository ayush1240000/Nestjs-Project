// src/DatabaseEntity/bills/bills.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';
import { get } from 'http';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  async create(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.billsService.createBill(createBillDto);
  }

  @Get()
  findAll() {
    return this.billsService.findAll();
  }
}
