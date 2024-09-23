import { Injectable } from '@nestjs/common';
import { CreateDinnertableDto } from './dto/create-dinnertable.dto';
import { UpdateDinnertableDto } from './dto/update-dinnertable.dto';

@Injectable()
export class DinnertablesService {
  create(createDinnertableDto: CreateDinnertableDto) {
    return 'This action adds a new dinnertable';
  }

  findAll() {
    return `This action returns all dinnertables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dinnertable`;
  }

  update(id: number, updateDinnertableDto: UpdateDinnertableDto) {
    return `This action updates a #${id} dinnertable`;
  }

  remove(id: number) {
    return `This action removes a #${id} dinnertable`;
  }
}
