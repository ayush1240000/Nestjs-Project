import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserorderDto } from './dto/create-userorder.dto';
import { UpdateUserorderDto } from './dto/update-userorder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrder } from './entities/userorder.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserOrderService {
  constructor(
    @InjectRepository(UserOrder)
    private readonly userOrderRepository: Repository<UserOrder>,
  ) {}

  // Create a new UserOrder
  async create(createUserorderDto: CreateUserorderDto): Promise<UserOrder> {
    const userOrder = this.userOrderRepository.create(createUserorderDto);
    return await this.userOrderRepository.save(userOrder);
  }

  // Find all UserOrders
  async findAll(): Promise<UserOrder[]> {
    return await this.userOrderRepository.find();
  }

  // async getuserorder(): Promise<UserOrder[]> {
  //   return await this.userOrderRepository.find({
  //     relations: ['Customer'],
  //   });
  // }
  async findOrdersByCustomer(customerId: number): Promise<UserOrder[]> {
    return this.userOrderRepository.find({ where: { customerId } }); // Query orders by customerId
  }

  // Find a single UserOrder by ID
  async findOne(id: number): Promise<UserOrder> {
    const userOrder = await this.userOrderRepository.findOne({ where: { orderid: id } });
    if (!userOrder) {
      throw new NotFoundException(`UserOrder with ID ${id} not found`);
    }
    return userOrder;
  }

  // Update an existing UserOrder
  async update(id: number, updateUserorderDto: UpdateUserorderDto): Promise<UserOrder> {
    await this.findOne(id); // Ensure the UserOrder exists
    await this.userOrderRepository.update(id, updateUserorderDto);
    return this.findOne(id); // Return the updated UserOrder
  }

  // Remove (delete) a UserOrder by ID
  async remove(id: number): Promise<void> {
    const userOrder = await this.findOne(id); // Ensure the UserOrder exists
    await this.userOrderRepository.remove(userOrder);
  }
}
