// src/DatabaseEntity/bills/bills.controller.ts
import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';
import { get } from 'http';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  async create(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.billsService.createBill(createBillDto);
  }

  @Patch()
  async updateBill(@Body()  updateBillDto: UpdateBillDto): Promise<Bill> {
    return this.billsService.updateBill(updateBillDto);
  }


  @Get()
  findAll() {
    return this.billsService.findAll();
  }

  
  @Post()
  async recreate(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.billsService.createBill(createBillDto);
  }
  // @Get('total')
  // totalpurchaseofday() {
  //   return this.billsService.totalpurchaseofday();
  // }
}
