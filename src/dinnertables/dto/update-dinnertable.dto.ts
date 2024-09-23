import { PartialType } from '@nestjs/mapped-types';
import { CreateDinnertableDto } from './create-dinnertable.dto';

export class UpdateDinnertableDto extends PartialType(CreateDinnertableDto) {}
