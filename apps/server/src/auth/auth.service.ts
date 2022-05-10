import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, name: string): Promise<any> {
    Logger.log('Validating user: ' + email + ', ' + name);
    const user = await this.usersService.findOneByEmail(email);
    if (user) return await user;
    return await this.usersService.create({ email, name });
  }

  async login(user: any) {
    Logger.log('Logging In: ' + user);
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
