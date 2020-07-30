import { Module } from '@nestjs/common';
import { HealthModule } from '../core/health/health.module';
import { AuthModuleV1 } from './auth/auth.module';
import { UsersModuleV1 } from './users/users.module';
import { VehiclesModuleV1 } from './vehicles/vehicles.module';

@Module({
  imports: [
    HealthModule,
    AuthModuleV1,
    UsersModuleV1,
    VehiclesModuleV1
  ]
})
export class V1Module {
}
