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
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AppController } from './app.controller';

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
    AuthModule,
    UsersModule,
    VehiclesModule
  ],
  controllers: [AppController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(compression());
    consumer.apply(helmet());
  }
}
