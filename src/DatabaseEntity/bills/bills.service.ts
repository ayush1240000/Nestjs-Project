import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity'; // Assuming you have a Bill entity
import { UserOrder } from '../userorder/entities/userorder.entity'; // Assuming you have a UserOrder entity
import { OrderMenu } from '../ordermenu/entities/ordermenu.entity'; // Assuming you have an OrderMenu entity
import { Menu } from '../menus/entities/menu.entity'; // Assuming you have a Menu entity

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private billRepository: Repository<Bill>,
    @InjectRepository(UserOrder) private userOrderRepository: Repository<UserOrder>,
    @InjectRepository(OrderMenu) private orderMenuRepository: Repository<OrderMenu>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  async generateBill(customerId: number) {
    // Step 1: Get all orders for the customer
    const userOrders = await this.userOrderRepository.find({ where: { customerId } });

    if (!userOrders.length) {
      throw new Error('No orders found for the customer.');
    }

    let totalAmount = 0;

    // Step 2: Loop through each order and fetch the corresponding menu items
    for (const order of userOrders) {
      const orderMenus = await this.orderMenuRepository.find({ where: { orderid: order.orderid } });

      for (const orderMenu of orderMenus) {
        // Step 3: Fetch menu details (price) for each menuId
        const menu = await this.menuRepository.findOne({ where: { menuid: orderMenu.menuid } });

        if (menu) {
          // Calculate total for this menu item (price * quantity)
          totalAmount += menu.price * orderMenu.quantity;
        }
      }
    }

    // Step 4: Create and save the bill
    const newBill = this.billRepository.create({
      customerId,
      amount: totalAmount,
      payment: 'Cash', // assuming payment method is cash for now, this can be dynamic
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.billRepository.save(newBill);
  }
}
