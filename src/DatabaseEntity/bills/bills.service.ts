// src/DatabaseEntity/bills/bills.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';

import { Menu } from '../menus/entities/menu.entity';
import { UserOrder } from '../userorder/entities/userorder.entity';
import { OrderMenu } from '../ordermenu/entities/ordermenu.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
    
    @InjectRepository(UserOrder)
    private userOrderRepository: Repository<UserOrder>,
    
    @InjectRepository(OrderMenu)
    private orderMenuRepository: Repository<OrderMenu>,
    
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async createBill(createBillDto: CreateBillDto): Promise<Bill> {
    const { customerId } = createBillDto;

    // Fetch orders for the customer
    const userOrders = await this.userOrderRepository.find({ where: { customerId } });
    
    let totalAmount = 0;

    for (const order of userOrders) {
      // Fetch order menu details for each orderId
      const orderMenus = await this.orderMenuRepository.find({ where: { orderid: order.orderid } });

      for (const orderMenu of orderMenus) {
        const menu = await this.menuRepository.findOne({ where: { menuid: orderMenu.menuid } });
        if (menu) {
          // Calculate total amount
          totalAmount += menu.price * orderMenu.quantity;
        }
      }
    }

    // Create the new bill
    const newBill = this.billsRepository.create({
      customer: { customerId }, // Assuming Customer entity has a customerId field
      amount: totalAmount,
      payment: 'cash', // Default payment method or adjust as needed
    });

    return this.billsRepository.save(newBill);
  }
}
