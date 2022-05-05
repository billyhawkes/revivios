import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: '46879a4bc1ebc8a8d7fd',
      clientSecret: 'e9ae4164352f5190e41375681569990a2fcfc2ee',
      callbackURL: '/auth/github/callback',
      scope: ['read:user', 'user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    Logger.log('Access token: ' + accessToken);
    Logger.log('Refresh token: ' + refreshToken);
    Logger.log(profile);
  }
}
