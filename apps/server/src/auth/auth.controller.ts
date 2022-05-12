import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('github'))
  @Get('auth/github/callback')
  @Redirect()
  async githubAuthRedirect(@Req() req) {
    const { access_token } = await this.authService.login(req.user);
    return {
      url: `http://localhost:4000/auth?token=${access_token}&email=${req.user.email}&id=${req.user.id}`,
    };
  }
}
