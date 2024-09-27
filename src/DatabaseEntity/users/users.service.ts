

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, EntityManager } from 'typeorm';
import { user } from './entities/user.entity'; 
import { TransactionService } from 'src/Transaction/Transaction.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class usersService {
  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
    private readonly transactionService: TransactionService, // Inject TransactionService
  ) {}

  async create(createUserDto: DeepPartial<user>): Promise<user> {
    return await this.transactionService.executeTransaction(async (manager: EntityManager) => {
      const userRepository = manager.getRepository(user);
      const entity = userRepository.create(createUserDto);
      entity.password = bcrypt.hashSync(entity.password, 5); // Hash password before saving
      return await userRepository.save(entity);
    });
  }

  async findAll(page: number , limit: number): Promise<{ data: user[], total: number, page: number, limit: number }> {
    const [result, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      total,
      page,
      limit,
    };
  }


  async findOne(id: number): Promise<user> {
    const entity = await this.userRepository.findOne({ where: { userId: id } });
    if (!entity) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateUserDto: DeepPartial<user>): Promise<user> {
    return await this.transactionService.executeTransaction(async (manager: EntityManager) => {
      const userRepository = manager.getRepository(user);
      const entity = await userRepository.preload({ userId: id, ...updateUserDto });
      if (!entity) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return await userRepository.save(entity);
    });
  }

  async remove(id: number): Promise<void> {
    await this.transactionService.executeTransaction(async (manager: EntityManager) => {
      const userRepository = manager.getRepository(user);
      const result = await userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    });
  }

  async findOneByEmail(email: string): Promise<user | undefined> {
    return await this.userRepository.findOne({ where: { email } }); // No transaction needed for read-only operation
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const entity = await this.findOneByEmail(email);
    if (entity && bcrypt.compareSync(pass, entity.password)) {
      const { password, ...result } = entity;
      return result;
    // }
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
