// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateOrdermenuDto } from './dto/create-ordermenu.dto';
// import { UpdateOrdermenuDto } from './dto/update-ordermenu.dto';
// import { OrderMenu } from './entities/ordermenu.entity';

// @Injectable()
// export class OrdermenuService {
//   constructor(
//     @InjectRepository(OrderMenu)
//     private readonly orderMenuRepository: Repository<OrderMenu>,
//   ) {}

//   async create(createOrdermenuDto: CreateOrdermenuDto) {
//     const newOrderMenu = this.orderMenuRepository.create(createOrdermenuDto);
//     await this.orderMenuRepository.save(newOrderMenu);
//     return newOrderMenu;
//   }

//   async findAll() {
//     return await this.orderMenuRepository.find();
//   }

//   async findOne(id: number) {
//     const orderMenu = await this.orderMenuRepository.findOne({ where: { id: id } });
//     if (!orderMenu) {
//       throw new Error(`Order menu with id #${id} not found`);
//     }
//     return orderMenu;
//   }

//   async update(id: number, updateOrdermenuDto: UpdateOrdermenuDto) {
//     await this.orderMenuRepository.update(id, updateOrdermenuDto);
//     const updatedOrderMenu = await this.orderMenuRepository.findOne({ where: { id: id } });
//     if (!updatedOrderMenu) {
//       throw new Error(`Order menu with id #${id} not found`);
//     }
//     return updatedOrderMenu;
//   }

//   async remove(id: number) {
//     const orderMenu = await this.orderMenuRepository.findOne(+id);
//     if (!orderMenu) {
//       throw new Error(`Order menu with id #${id} not found`);
//     }
//     await this.orderMenuRepository.remove(orderMenu);
//     return { message: `Order menu with id #${id} removed successfully` };
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdermenuDto } from './dto/create-ordermenu.dto';
import { UpdateOrdermenuDto } from './dto/update-ordermenu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMenu } from './entities/ordermenu.entity';
import { Repository } from 'typeorm';
import { UserOrder } from '../userorder/entities/userorder.entity';

@Injectable()
export class OrdermenuService {
  constructor(
    @InjectRepository(OrderMenu)
    private readonly orderMenuRepository: Repository<OrderMenu>,
    @InjectRepository(UserOrder)
    private readonly userOrderRepository: Repository<UserOrder>,
  ) {}

  // Create a new OrderMenu
  async create(createOrdermenuDto: CreateOrdermenuDto): Promise<OrderMenu> {
    const orderMenu = this.orderMenuRepository.create(createOrdermenuDto);
    return await this.orderMenuRepository.save(orderMenu);
  }

  async findMenuForUserOrder(orderid: number): Promise<OrderMenu[]> {
    // Assuming that menu orders have a relation to user orders
    return this.orderMenuRepository.find({  where: { orderid } }); 
  }

  async findMenuOrdersByCustomer(customerId: number): Promise<OrderMenu[]> {
    const userOrders = await this.userOrderRepository.find({
      where: { customer: { customerId: customerId } }, // Fetch orders by customer ID
      relations: ['orderMenus', 'orderMenus.menu'], // Load related orderMenus and menu
    })

    // Extract and return the order menus from the user orders
    return userOrders.flatMap(order => order.orderMenus);
  }
  // Find all OrderMenus
  async findAll(): Promise<OrderMenu[]> {
    return await this.orderMenuRepository.find();
  }

  // Find a single OrderMenu by ID
  async findOne(id: number): Promise<OrderMenu> {
    const orderMenu = await this.orderMenuRepository.findOne({ where: { id :id} });
    if (!orderMenu) {
      throw new NotFoundException(`OrderMenu with ID ${id} not found`);
    }
    return orderMenu;
  }

  // Update an existing OrderMenu
  async update(id: number, updateOrdermenuDto: UpdateOrdermenuDto): Promise<OrderMenu> {
    await this.findOne(id); // Ensure the OrderMenu exists
    await this.orderMenuRepository.update(id, updateOrdermenuDto);
    return this.findOne(id); // Return the updated OrderMenu
  }

  // Remove (delete) an OrderMenu by ID
  async remove(id: number): Promise<void> {
    const orderMenu = await this.findOne(id); // Ensure the OrderMenu exists
    await this.orderMenuRepository.remove(orderMenu);
  }


}
