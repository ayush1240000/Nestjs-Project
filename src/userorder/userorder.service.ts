import { Injectable } from '@nestjs/common';
import { CreateUserorderDto } from './dto/create-userorder.dto';
import { UpdateUserorderDto } from './dto/update-userorder.dto';

@Injectable()
export class UserorderService {
  create(createUserorderDto: CreateUserorderDto) {
    return 'This action adds a new userorder';
  }

  findAll() {
    return `This action returns all userorder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userorder`;
  }

  update(id: number, updateUserorderDto: UpdateUserorderDto) {
    return `This action updates a #${id} userorder`;
  }

  remove(id: number) {
    return `This action removes a #${id} userorder`;
  }
}
