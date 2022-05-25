import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/models/users.model';
import { JwtAuthService } from '../jwt/jwt.service';
import { GithubOauthGuard } from './github.guard';

@Controller('auth/github')
export class GithubController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  @Redirect()
  async githubAuthCallback(@Req() req: Request) {
    const user = req.user as User;

    const { access_token } = await this.jwtAuthService.login(user);

    // TODO: ADD ENV FOR URL
    return {
      url: `http://localhost:4000/auth?token=${access_token}&email=${user.email}&id=${user.id}`,
    };
  }
}
