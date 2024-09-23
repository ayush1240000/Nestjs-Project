// import { NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';

// export class BaseService<T> {
//   constructor(
//     private readonly repository: Repository<T>,
//   ) {}

//   async create(data: any): Promise<T> {
//     const entity = this.repository.create(data);
//     return await this.repository.save(entity);
//   }

//   async findAll(): Promise<T[]> {
//     return await this.repository.find();
//   }

//   async findOne(id: number): Promise<T> {
//     const entity = await this.repository.findOne({ where: { id } });
//     if (!entity) {
//       throw new NotFoundException(`Entity with ID ${id} not found`);
//     }
//     return entity;
//   }

//   async update(id: number, data: any): Promise<T> {
//     const entity = await this.repository.preload({ id, ...data });
//     if (!entity) {
//       throw new NotFoundException(`Entity with ID ${id} not found`);
//     }
//     return await this.repository.save(entity);
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.repository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Entity with ID ${id} not found`);
//     }
//   }
// }


// import { NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';

// export class BaseService<T> {
//   constructor(
//     private readonly repository: Repository<T>,
//   ) {}

//   async create(data: Partial<T>): Promise<T> { // Use Partial<T> for create data
//     const entity = this.repository.create(data);

//     return await this.repository.save(entity);
//   }

//   async findAll(): Promise<T[]> {
//     return await this.repository.find();
//   }

//   async findOne(id: number): Promise<T> {
//     const entity = await this.repository.findOne({ where: { id } });
//     if (!entity) {
//       throw new NotFoundException(`Entity with ID ${id} not found`);
//     }
//     return entity;
//   }

//   async update(id: number, data: Partial<T>): Promise<T> { // Use Partial<T> for update data
//     const entity = await this.repository.preload({ id, ...data });
//     if (!entity) {
//       throw new NotFoundException(`Entity with ID ${id} not found`);
//     }
//     return await this.repository.save(entity);
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.repository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Entity with ID ${id} not found`);
//     }
//   }
// }

import { NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';

export class BaseService<T extends { id: number }> {  
  constructor(
    private readonly repository: Repository<T>,
  ) {}

  async create(data: DeepPartial<T>): Promise<T> { 
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });  
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> { 
    const entity = await this.repository.preload({ id, ...data });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return await this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
  }
}
