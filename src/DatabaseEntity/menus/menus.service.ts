import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
    ) {}

    // Create a new menu item
    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        const menuItem = this.menuRepository.create(createMenuDto);
        return await this.menuRepository.save(menuItem);
    }

    // Find all menu items
    async findAll(): Promise<Menu[]> {
        return await this.menuRepository.find();
    }

    // Find a single menu item by ID
    async findOne(id: number): Promise<Menu> {
        const menuItem = await this.menuRepository.findOne({ where: { menuid: id } });
        if (!menuItem) {
            throw new NotFoundException(`Menu item with ID ${id} not found`);
        }
        return menuItem;
    }

    // Update an existing menu item
    async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        const menuItem = await this.findOne(id); // Ensure the menu item exists
        await this.menuRepository.update(id, updateMenuDto);
        return { ...menuItem, ...updateMenuDto }; // Return the updated menu item
    }

    // Remove (delete) a menu item by ID
    async remove(id: number): Promise<void> {
        const menuItem = await this.findOne(id); // Ensure the menu item exists
        await this.menuRepository.remove(menuItem);
    }
}
