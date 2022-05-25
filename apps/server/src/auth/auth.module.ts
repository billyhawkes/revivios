import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { JwtAuthModule } from './jwt/jwt.module';

@Module({
  imports: [JwtAuthModule, GithubModule],
  exports: [JwtAuthModule, GithubModule],
})
export class AuthModule {}
