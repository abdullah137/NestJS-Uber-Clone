import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'apps/auth/src/auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToRpc().getData();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token) return false;

    try {
      const payload = await this.authService.validateToken(token);
      request.user = payload;
    } catch {
      return false;
    }
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    const [type, token] = headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
