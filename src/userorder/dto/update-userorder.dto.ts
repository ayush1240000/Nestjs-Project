import { PartialType } from '@nestjs/mapped-types';
import { CreateUserorderDto } from './create-userorder.dto';

export class UpdateUserorderDto extends PartialType(CreateUserorderDto) {}
