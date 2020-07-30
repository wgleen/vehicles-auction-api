import { Express } from 'express';
import { INestApplication } from '@nestjs/common';
import { appBuild } from './core/builds/app.build';
import { docBuild } from './core/builds/doc.build';
import { RootModule } from './root.module';

export const rootBuild = async (server: Express): Promise<INestApplication> => {
  const app = await appBuild(RootModule, server, {
    globalPrefix: 'api'
  })

  docBuild(app, {
    basePath: 'docs',
    title: 'Vehicles Auction API',
    description: 'An API for auction and sale vehicles',
    isBearerAuth: true
  })

  return app
}
