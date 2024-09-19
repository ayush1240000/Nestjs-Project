
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './entities/user.entity'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<user> {
    const user = this.userRepository.create(createUserDto); 
    return await this.userRepository.save(user); 
  }

  async findAll(): Promise<user[]> {
    return await this.userRepository.find(); 
  }

  async findOne(id: string): Promise<user> {
    const user = await this.userRepository.findOne({ where: { userId: id } }); 
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<user> {
    const user = await this.userRepository.preload({ 
      userId: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); 
    }

    return await this.userRepository.save(user); 
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id); 

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`); 
    }
  }
}
