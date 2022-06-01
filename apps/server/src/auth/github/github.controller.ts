import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'src/users/models/users.model';
import { JwtAuthService } from '../jwt/jwt.service';
import { GithubOauthGuard } from './github.guard';

@Controller('auth/github')
export class GithubController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  @Redirect()
  async githubAuthCallback(@Req() req: Request) {
    const user = req.user as User;

    const { access_token } = await this.jwtAuthService.login(user);

    return {
      url: `${this.configService.get<string>(
        'auth.github.redirectURL',
      )}?token=${access_token}`,
    };
  }
}
