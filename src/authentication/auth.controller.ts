
import { Controller, Post, Body ,HttpException,HttpStatus, UseGuards, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { error } from 'console';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from 'src/authroization/roles.guard';
// import { Roles  } from 'src/authroization/roles.decorator';
import { Roles as RolesEnum } from '../authroization/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
   
  
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      console.log(error);
    }
    return this.authService.login(user);
    }
  
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(RolesEnum.Customer) // Only admin can access this route
    // @Get('admin')
    // getAdminProfile() {
    //   return "Admin Protected Route";
    // }
  
     
    }
  

