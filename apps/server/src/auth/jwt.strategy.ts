import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'gXph6Ov0FRqv1crPoxaSwAujkVOe4JuhlW1Dn9sIHu8=',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
