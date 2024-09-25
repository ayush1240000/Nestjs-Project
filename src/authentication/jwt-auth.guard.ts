import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Call the base class's canActivate method
    const canActivate = super.canActivate(context) as boolean;
    
    // If the guard returned true, the request is allowed to proceed
    if (!canActivate) {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }
    
    return canActivate;
  }
}
