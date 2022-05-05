import { Get, Injectable, Logger, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RegisterInput } from 'src/users/dto/register.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(id: number, email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register({ name, email, password }: RegisterInput) {
    const newUser = await this.usersService.create({
      name,
      email,
      password,
    });

    return {
      access_token: this.jwtService.sign({
        name: newUser.name,
        sub: newUser.id,
      }),
    };
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }

  async githubLogin(req) {
    Logger.log('Logging in!');
    if (!req.user) {
      return 'No user';
    }
    return req.user;
  }
}
