import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
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
    done: VerifyCallback,
  ) {
    const { displayName, emails } = profile;
    const user = await this.authService.validateUser(
      emails[0].value,
      displayName,
    );
    done(null, user);
  }
}
