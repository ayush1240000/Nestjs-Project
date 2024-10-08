
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { Bill } from "./entities/bill.entity";
import { Order } from "../order/entities/order.entity";
import { orderitem } from "../orderitem/entities/orderitem.entity";
import { Menu } from "../menus/entities/menu.entity";
import { CreateBillDto } from "./dto/create-bill.dto";
import { UpdateBillDto } from "./dto/update-bill.dto";
import { DinnerTable } from "../dinnertables/entities/dinnertable.entity";
import { DinnertablesService } from "../dinnertables/dinnertables.service";

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(orderitem)
    private orderitemRepository: Repository<orderitem>,

    @InjectRepository(DinnerTable)
    private dinnerTableRepository: Repository<DinnerTable>,

    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,

    private readonly dinnertablesService: DinnertablesService
  ) {}


  async updateBill(updateBillDto : UpdateBillDto): Promise<any> {
    // Fetch the bill corresponding to the orderId
    const { orderId } = updateBillDto;
    const bill = await this.billsRepository.findOne({
      where: { order: { orderId } },
    });

    // Ensure that the bill exists
    if (!bill) {
      throw new Error('Bill not found for the given order.');
    }

    // Fetch the remaining order items for the orderId
    const remainingOrderItems = await this.orderitemRepository.find({
      where: { orderId },
    });

    if (remainingOrderItems.length === 0) {
      throw new Error('No remaining items found for this order.');
    }

    let totalAmount = 0;

    // Loop through the remaining items and recalculate the total amount
    for (const item of remainingOrderItems) {
      const menu = await this.menuRepository.findOne({
        where: { itemId: item.itemId },
      });

      if (menu) {
        // Calculate total amount based on price and quantity
        const itemTotal = menu.price * item.quantity;
        totalAmount += itemTotal;
      }
    }

    // Update the total amount in the bill
    bill.amount = totalAmount;

    // Save the updated bill in the database
    const updatedBill = await this.billsRepository.save(bill);

    // Return the updated bill details
    return {
      bill: updatedBill,
      
      totalAmount,
     
    };
  }

  async createBill(createBillDto: CreateBillDto): Promise<any> {
    const { orderId } = createBillDto;
  
    // Fetch the order with the given orderId
    const order = await this.orderRepository.findOne({
      where: { orderId },
    });
  
    // Ensure that the order exists
    if (!order) {
      throw new Error('Order not found.');
    }
  
    // Extract the customerId from the order
    const customerId = order.customerId; // Assuming order has a customerId field
  
    //extracting the employeeid and dinnertableno from the customerid
    const {employeeId, tableNo} = await this.dinnertablesService.findDinnerTableByCustomerid(customerId);
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
  
    // Create a DeepPartial<Bill> object
    const newBill: DeepPartial<Bill> = {
      order: { orderId }, // Assuming Order entity has an orderId field
      amount: totalAmount,
      payment: 'cash', // Default payment method or adjust as needed
      customerId, 
      employeeId,
      tableNo
      // Now correctly assigning the customerId as a number
    };
  
    // Save the bill in the database
    const savedBill = await this.billsRepository.save(newBill);
  
    // Return the custom object with bill details and the calculated amount
    return {
      bill: savedBill,
      eatenMenus,
      totalAmount,
      customerId,
    };
  }


  async findAll(): Promise<Bill[]> {
    return await this.billsRepository.find({} );
  }




}
  