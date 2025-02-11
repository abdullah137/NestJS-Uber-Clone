import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userLogic: AuthLogic) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string) {
    return this.userLogic.signToken(email, password, 'USER');
  }
}
