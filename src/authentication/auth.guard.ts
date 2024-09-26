

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
