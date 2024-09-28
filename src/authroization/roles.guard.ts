// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

// @Injectable()
// export class RolesGuard extends JwtAuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext): boolean {
//     // First check if the JWT is valid
//     const isAuthenticated = super.canActivate(context);
//     if (!isAuthenticated) return false;

//     // Get required roles from metadata
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!requiredRoles) return true; // If no roles are defined, allow access

//     // Get user from request object
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     // Check if the user has one of the required roles
//     const hasRole = requiredRoles.some(role => user.roles.includes(role));

//     if (!hasRole) {
//       throw new ForbiddenException('You do not have permission to access this resource');
//     }

//     return true;
//   }
// }

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Roles } from '../authroization/roles.enum';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    // Check if the JWT is valid
    const isAuthenticated = super.canActivate(context);
    if (!isAuthenticated) return false;

    // Get the required roles for this route
    const requiredRoles = this.reflector.get<Roles[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // If no roles are defined, allow access

    // Get the user from the request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has one of the required roles
    const hasRole = requiredRoles.some(role => user.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
