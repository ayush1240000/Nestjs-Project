import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    itemname: string;

    @IsNotEmpty()
    @IsEnum(['Veg', 'Non-Veg'])
    itemCategory: 'Veg' | 'Non-Veg';

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;
}
