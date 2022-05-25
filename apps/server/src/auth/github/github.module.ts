import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { JwtAuthModule } from '../jwt/jwt.module';
import { GithubController } from './github.controller';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [JwtAuthModule, UsersModule],
  controllers: [GithubController],
  providers: [GithubStrategy],
})
export class GithubModule {}
