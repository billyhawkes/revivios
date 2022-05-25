import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      database: this.configService.get<string>('database.database'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      entities: ['**/*.entity.js'],
      synchronize: true,
      logging: true,
      subscribers: [],
      migrations: [],
    };
  }
}
