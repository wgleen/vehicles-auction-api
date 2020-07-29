import { ConfigService } from "@nestjs/config";
import {
  Controller,
  Get
} from "@nestjs/common";

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {
  }

  @Get()
  root(): string {
    const { title } = this.configService.get('site');

    return `Welcome to ${title}`
  }
}
