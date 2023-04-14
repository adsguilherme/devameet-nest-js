import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // O que é esse super ?
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // O que está dentro de super tem na doc do Nest.
      ignoreExpiration: true,
      secretOrKey: process.env.USER_JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
