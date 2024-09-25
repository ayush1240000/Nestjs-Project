// import { CanActivate, Injectable ,ExecutionContext} from "@nestjs/common";
// import { Request } from "express";
// @Injectable()
// export class AuthGuard implements CanActivate{
    
//     public username :string = "ayush";
//     public password :string = "ayush@123";
    
//     canActivate(context: ExecutionContext): boolean{
//             const cxt = context.switchToHttp();
//             const request = cxt.getRequest<Request>();
            
//             if(request.header('username') === undefined || 
//             request.header("password")=== undefined ) return false;
            
//             return request.header("username") === this.username &&
//             request.header("password") === this.password ;

 
// }
// }


import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('profile')
export class AuthGuard {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile() {
    return "Protected route";
  }
}
