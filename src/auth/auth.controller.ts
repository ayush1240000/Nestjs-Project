// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { error, log } from 'console';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(@Body() loginDto: { username: string, password: string }) {
//     const user = await this.authService.validateUser(loginDto.username, loginDto.password);
//     if (!user) {
//       console.log(error);
//       throw new error('user not found');
//     }
//     return this.authService.login(user);
//   }
// }


import { Controller, Post, Body ,HttpException,HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { error } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
   
    try{
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      console.log(error);
    }
    return this.authService.login(user);
    }
    catch(error){
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      console.log(error);
    }
  }
}
