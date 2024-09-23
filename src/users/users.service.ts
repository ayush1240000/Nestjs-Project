
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { user } from './entities/user.entity'; 
// import { CreateuserDto } from './dto/create-user.dto';
// import { UpdateuserDto } from './dto/update-user.dto';
// import * as bcrypt from 'bcryptjs';


// @Injectable()
// export class usersService {
//   constructor(
//     @InjectRepository(user)
//     private readonly userRepository: Repository<user>,
//   ) {}

//   async create(createuserDto: CreateuserDto): Promise<user> {
//     const user = this.userRepository.create(createuserDto); 
//     return await this.userRepository.save(user); 
//   }

//   async findAll(): Promise<user[]> {
//     return await this.userRepository.find(); 
//   }

//   async findOne(id: string): Promise<user> {
//     const user = await this.userRepository.findOne({ where: { userId: id } }); 
//     if (!user) {
//       throw new NotFoundException(`user with ID ${id} not found`);
//     }
//     return user;
//   }

//   async update(id: string, updateuserDto: UpdateuserDto): Promise<user> {
//     const user = await this.userRepository.preload({ 
//       userId: id,
//       ...updateuserDto,
//     });

//     if (!user) {
//       throw new NotFoundException(`user with ID ${id} not found`); 
//     }

//     return await this.userRepository.save(user); 
//   }

//   async remove(id: string): Promise<void> {
//     const result = await this.userRepository.delete(id); 

//     if (result.affected === 0) {
//       throw new NotFoundException(`user with ID ${id} not found`); 
//     }
//   }


//   // async validateuser(username: string, pass: string): Promise<any> {
//   //   const user = await this.findOne(username);
//   //   if (user && bcrypt.compareSync(pass, user.password)) {
//   //     const { password, ...result } = user;
//   //     return result;
//   //   }
//   //   return null;
//   // }

// }


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { user } from './entities/user.entity'; 
// import { CreateuserDto } from './dto/create-user.dto';
// import { UpdateuserDto } from './dto/update-user.dto';
// import * as bcrypt from 'bcryptjs';

// @Injectable()
// export class usersService {
//   constructor(
//     @InjectRepository(user)
//     private readonly userRepository: Repository<user>,
//   ) {}

//   async create(createuserDto: CreateuserDto): Promise<user> {
//     const user = this.userRepository.create(createuserDto); 
//     return await this.userRepository.save(user); 
//   }

//   async findAll(): Promise<user[]> {
//     return await this.userRepository.find(); 
//   }

//   async findOne(id: number): Promise<user> {
//     const user = await this.userRepository.findOne({ where: { userId: +id } }); 
//     if (!user) {
//       throw new NotFoundException(`user with ID ${id} not found`);
//     }
//     return user;
//   }

//   async update(id: number, updateuserDto: UpdateuserDto): Promise<user> {
//     const user = await this.userRepository.preload({ 
//       userId: +id,
//       ...updateuserDto,
//     });

//     if (!user) {
//       throw new NotFoundException(`user with ID ${+id} not found`); 
//     }

//     return await this.userRepository.save(user); 
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.userRepository.delete(+id); 

//     if (result.affected === 0) {
//       throw new NotFoundException(`user with ID ${+id} not found`); 
//     }
//   }

//   async findOne(username: string): Promise<userser | undefined> {
//     return this.user.find(user => user.username === username);
//   }
//   async validateuser(username: string, pass: string): Promise<any> {
//     const user = await this.userRepository.findOne({ where: { email } });
//     if (user && bcrypt.compareSync(pass, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

// }


// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { user } from './entities/user.entity'; 
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import * as bcrypt from 'bcryptjs';

// @Injectable()
// export class usersService {
//   constructor(
//     @InjectRepository(user)
//     private readonly userRepository: Repository<user>,
//   ) {}

//   async create(createuserDto: CreateUserDto): Promise<user> {
//     const user = this.userRepository.create(createuserDto); 
//     user.password = bcrypt.hashSync(user.password, 10); // Hash password before saving
//     return await this.userRepository.save(user); 
//   }

//   async findAll(): Promise<user[]> {
//     return await this.userRepository.find(); 
//   }

//   async findOne(id: number): Promise<user> {
//     const user = await this.userRepository.findOne({ where: { userId: id } }); 
//     if (!user) {
//       throw new NotFoundException(`user with ID ${id} not found`);
//     }
//     return user;
//   }

//   async update(id: number, updateuserDto: UpdateUserDto): Promise<user> {
//     const user = await this.userRepository.preload({ 
//       userId: id,
//       ...updateuserDto,
//     });

//     if (!user) {
//       throw new NotFoundException(`user with ID ${id} not found`); 
//     }

//     return await this.userRepository.save(user); 
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.userRepository.delete(id); 

//     if (result.affected === 0) {
//       throw new NotFoundException(`user with ID ${id} not found`); 
//     }
//   }

//   async findOneByEmail(email: string): Promise<user | undefined> {
//     return await this.userRepository.findOne({ where: { email } });
//   }

//   async validateuser(email: string, pass: string): Promise<any> {
//     const user = await this.findOneByEmail(email);
//     if (user && bcrypt.compareSync(pass, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     throw new UnauthorizedException('Invalid credentials');
//   }
  
// }


import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { user } from './entities/user.entity'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class usersService {
  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}

  async create(createUserDto: DeepPartial<user>): Promise<user> {
    const entity = this.userRepository.create(createUserDto);
    entity.password = bcrypt.hashSync(entity.password, 10); // Hash password before saving
    return await this.userRepository.save(entity);
  }

  async findAll(): Promise<user[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<user> {
    const entity = await this.userRepository.findOne({ where: { userId: id } });
    if (!entity) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateUserDto: DeepPartial<user>): Promise<user> {
    const entity = await this.userRepository.preload({ userId: id, ...updateUserDto });
    if (!entity) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findOneByEmail(email: string): Promise<user | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const entity = await this.findOneByEmail(email);
    if (entity && bcrypt.compareSync(pass, entity.password)) {
      const { password, ...result } = entity;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
