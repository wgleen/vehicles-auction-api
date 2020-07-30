import * as compression from 'compression';
import * as helmet from 'helmet';
import {
  Module,
  MiddlewareConsumer
} from '@nestjs/common';
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from 'src/config/jwt.config';
import databaseConfig from '../config/database.config';
import siteConfig from '../config/site.config';
import { HealthModule } from './core/health/health.module';
import { RootController } from './root.controller';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        jwtConfig,
        siteConfig
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (
        configService.get('database')
      ),
      inject: [ConfigService]
    }),
    HealthModule,
    V1Module
  ],
  controllers: [RootController]
})
export class RootModule {
  protected configure(consumer: MiddlewareConsumer): void {
    consumer.apply(compression());
    consumer.apply(helmet());
  }
}
