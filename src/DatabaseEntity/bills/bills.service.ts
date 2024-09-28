
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bill } from "./entities/bill.entity";
import { Order } from "../order/entities/order.entity";
import { orderitem } from "../orderitem/entities/orderitem.entity";
import { Menu } from "../menus/entities/menu.entity";
import { CreateBillDto } from "./dto/create-bill.dto";


@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(orderitem)
    private orderitemRepository: Repository<orderitem>,

    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async createBill(createBillDto: CreateBillDto): Promise<any> {
    const { orderId } = createBillDto;

    // Fetch order items for the provided orderId
    const userOrderItems = await this.orderitemRepository.find({
      where: { orderId },
    });

    if (userOrderItems.length === 0) {
      throw new Error('No items found for this order.');
    }

    let totalAmount = 0;
    const eatenMenus = [];

    // Loop through the order items and calculate total amount
    for (const item of userOrderItems) {
      const menu = await this.menuRepository.findOne({
        where: { itemId: item.itemId },
      });

      if (menu) {
        // Calculate total amount based on price and quantity
        const itemTotal = menu.price * item.quantity;
        totalAmount += itemTotal;

        // Store the menu item details
        eatenMenus.push({
          menuName: menu.itemname,
          menuCategory: menu.itemcategory,
          price: menu.price,
          quantity: item.quantity,
          totalPrice: itemTotal,
        });
      }
    }

    // Create the new bill
    const newBill = this.billsRepository.create({
      order: { orderId }, // Assuming Order entity has an orderId field
      amount: totalAmount,

      payment: 'cash', // Default payment method or adjust as needed
    });

    // Save the bill in the database
    const savedBill = await this.billsRepository.save(newBill);

    // Return the custom object with bill details and the calculated amount
    return {
      bill: savedBill,
      eatenMenus,
      totalAmount,
    };
  }
}
