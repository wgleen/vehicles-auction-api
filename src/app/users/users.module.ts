import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryV1 } from './v1/user.repository';
import { UsersCreateServiceV1 } from './v1/users-create.service';
import { UsersFindByEmailServiceV1 } from './v1/users-find-by-email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepositoryV1])
  ],
  controllers: [],
  providers: [
    UsersCreateServiceV1,
    UsersFindByEmailServiceV1
  ],
  exports: [
    UsersFindByEmailServiceV1,
    UsersCreateServiceV1,
    TypeOrmModule
  ]
})
export class UsersModule {
}
