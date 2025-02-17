import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { JwtAuthGuard } from 'libs/common/guard/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('user.profile')
  getUser(payload: any) {
    console.log('it is here 4');
    if (!payload.user) {
      throw new RpcException('Unauthorized');
    }

    return {
      userId: payload.user.sub,
      email: payload.user.email,
    };
  }
}
