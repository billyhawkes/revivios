import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GithubGuard } from './github.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('github'))
  @Get('auth/github/callback')
  githubAuthRedirect(@Req() req) {
    Logger.log(req.user);
    return this.authService.login(req.user);
  }
}
