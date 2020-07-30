import {
  SwaggerModule,
  DocumentBuilder
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { DocBuildOptions } from './interfaces/doc-options.interface';

export const docBuild = (
    app: INestApplication,
    docBuildOptions: DocBuildOptions
  ): void => {
  const {
    basePath,
    title,
    description,
    version,
    isBearerAuth
  } = docBuildOptions

  const documentBuilder = new DocumentBuilder()

  if (title) documentBuilder.setTitle(title)
  if (description) documentBuilder.setDescription(description)
  if (version) documentBuilder.setVersion(version)
  if (isBearerAuth) documentBuilder.addBearerAuth()

  const documentBuild = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, documentBuild);

  SwaggerModule.setup(basePath, app, document);
}
