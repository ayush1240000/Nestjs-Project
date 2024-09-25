import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    menuname: string;

    @IsNotEmpty()
    @IsEnum(['Veg', 'Non-Veg'])
    menuCategory: 'Veg' | 'Non-Veg';

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;
}
