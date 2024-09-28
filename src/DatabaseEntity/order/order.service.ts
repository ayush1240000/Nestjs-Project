import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateUserorderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
  ) {}

  // Create a new UserOrder
  async create(CreateOrderDto: CreateOrderDto): Promise<Order> {
    const userOrder = this.OrderRepository.create(CreateOrderDto);
    return await this.OrderRepository.save(userOrder);
  }

  // Find all UserOrders
  async findAll(): Promise<Order[]> {
    return await this.OrderRepository.find();
  }

  // async getuserorder(): Promise<UserOrder[]> {
  //   return await this.userOrderRepository.find({
  //     relations: ['Customer'],
  //   });
  // }
  async findOrdersByCustomer(customerId: number): Promise<Order[]> {
    return this.OrderRepository.find({ where: { customerId } }); // Query orders by customerId
  }

  // Find a single UserOrder by ID
  async findOne(id: number): Promise<Order> {
    const userOrder = await this.OrderRepository.findOne({ where: { orderId: id } });
    if (!userOrder) {
      throw new NotFoundException(`UserOrder with ID ${id} not found`);
    }
    return userOrder;
  }

  // Update an existing UserOrder
  async update(id: number, updateUserorderDto: UpdateUserorderDto): Promise<Order> {
    await this.findOne(id); // Ensure the UserOrder exists
    await this.OrderRepository.update(id, updateUserorderDto);
    return this.findOne(id); // Return the updated UserOrder
  }

  // Remove (delete) a UserOrder by ID
  async remove(id: number): Promise<void> {
    const userOrder = await this.findOne(id); // Ensure the UserOrder exists
    await this.OrderRepository.remove(userOrder);
  }
}
