// // import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// // import { BillsService } from './bills.service';
// // import { CreateBillDto } from './dto/create-bill.dto';
// // import { UpdateBillDto } from './dto/update-bill.dto';

// // @Controller('bills')
// // export class BillsController {
// //   constructor(private readonly billsService: BillsService) {}

// //   @Post()
// //   create(@Body() createBillDto: CreateBillDto) {
// //     return this.billsService.create(createBillDto);
// //   }

// //   @Get()
// //   findAll() {
// //     return this.billsService.findAll();
// //   }

// //   @Get(':id')
// //   findOne(@Param('id') id: string) {
// //     return this.billsService.findOne(+id);
// //   }

// //   @Patch(':id')
// //   update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
// //     return this.billsService.update(+id, updateBillDto);
// //   }

// //   @Delete(':id')
// //   remove(@Param('id') id: string) {
// //     return this.billsService.remove(+id);
// //   }
// // }

// import { Controller, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
// import { BillService } from '../bills/bills.service';
// import { CreateBillDto } from './dto/create-bill.dto';
// import { UpdateBillDto } from './dto/update-bill.dto';
// import { Bill } from '../bills/entities/bill.entity';

// @Controller('bill')
// export class BillController {
//   constructor(private readonly billService: BillService) {}

//   // Endpoint to create a bill
//   @Post()
//   createBill(@Body() createBillDto: CreateBillDto): Promise<Bill> {
//     return this.billService.createBill(createBillDto);
//   }


// }

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { BillService } from '../bills/bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillResponseDto } from '../bills/dto/Response.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  async createBill(@Body() createBillDto: CreateBillDto): Promise<BillResponseDto> {
    try {
      const bill = await this.billService.generateBill(createBillDto.customerId);
      return {
        billid: bill.billid,
        // customerId: bill.customer.customerId,
        // employeeId: bill.employee ? bill.employee.employeeId : null,
        // tableno: bill.table ? bill.table.tableNo : null,
        amount: bill.amount,
        payment: bill.payment,
        createdAt: bill.createdAt,
        updatedAt: bill.updatedAt,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
