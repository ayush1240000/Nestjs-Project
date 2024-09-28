

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { orderitem } from './entities/orderitem.entity';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderitemService {
  constructor(
    @InjectRepository(orderitem)
    private readonly orderItemRepository: Repository<orderitem>,
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
  ) {}

  // Create a new OrderMenu
  async create(CreateOrderitemDto: CreateOrderitemDto): Promise<orderitem> {
    const orderMenu = this.orderItemRepository.create(CreateOrderitemDto);
    return await this.orderItemRepository.save(orderMenu);
  }

  async findUserOrderforOrderid(id: number): Promise<orderitem[]> {
    // Assuming that menu orders have a relation to user orders
    return this.orderItemRepository.find({  where: { id : id } }); 
  }

  async findMenuOrdersByCustomer(customerId: number): Promise<orderitem[]> {
    const userOrders = await this.OrderRepository.find({
      where: { customer: { customerId: customerId } }, // Fetch orders by customer ID
      relations: ['orderitem', 'orderitem.menu'], // Load related orderMenus and menu
    })

    // Extract and return the order menus from the user orders
    return userOrders.flatMap(order => order.orderitem);
  }

  // Find all OrderMenus
  async findAll(): Promise<orderitem[]> {
    return await this.orderItemRepository.find();
  }

  // Find a single OrderMenu by ID
  async findOne(id: number): Promise<orderitem> {
    const orderMenu = await this.orderItemRepository.findOne({ where: { id :id} });
    if (!orderMenu) {
      throw new NotFoundException(`OrderMenu with ID ${id} not found`);
    }
    return orderMenu;
  }

  // Update an existing OrderMenu
  async update(id: number, UpdateOrderitemDto: UpdateOrderitemDto): Promise<orderitem> {
    await this.findOne(id); // Ensure the OrderMenu exists
    await this.orderItemRepository.update(id, UpdateOrderitemDto);
    return this.findOne(id); // Return the updated OrderMenu
  }

  // Remove (delete) an OrderMenu by ID
  async remove(id: number): Promise<void> {
    const orderMenu = await this.findOne(id); // Ensure the OrderMenu exists
    await this.orderItemRepository.remove(orderMenu);
  }


}
