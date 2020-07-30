import { Module } from '@nestjs/common';
import { HealthModule } from '../core/health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    UsersModule,
    VehiclesModule
  ]
})
export class V1Module {
}
