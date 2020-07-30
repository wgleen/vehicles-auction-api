import { ConfigService } from "@nestjs/config";
import {
  Controller,
  Get
} from "@nestjs/common";
import {
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class RootController {
  constructor(private configService: ConfigService) {
  }

  @Get()
  @ApiOperation({ summary: 'Welcome API' })
  root(): string {
    const { title } = this.configService.get('site');

    return `Welcome to ${title}`
  }
}
