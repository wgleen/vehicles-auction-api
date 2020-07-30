import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import {
  INestApplication,
  NestModule
} from '@nestjs/common';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import { AppBuildOptions } from './interfaces/app-options.interface';

export const appBuild = async (
  module: NestModule | any,
  server: Express,
  appBuildOptions?: AppBuildOptions
): Promise<INestApplication>  => {
  const {
    globalPrefix
  } = appBuildOptions

  const appFactory = new NestFactoryStatic();
  const app = await appFactory
    .create(
      module,
      new ExpressAdapter(server)
    );

  app.setGlobalPrefix(globalPrefix);

  return app;
}
