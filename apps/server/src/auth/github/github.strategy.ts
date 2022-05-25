import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from '../jwt/jwt.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private jwtAuthService: JwtAuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_ID'),
      clientSecret: configService.get<string>('GITHUB_SECRET'),
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
    const user = await this.jwtAuthService.validateUser(
      emails[0].value,
      displayName,
    );
    done(null, user);
  }
}
