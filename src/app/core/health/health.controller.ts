import {
  HealthCheckService,
  DNSHealthIndicator,
  HealthCheck,
  HealthIndicatorResult,
  HealthCheckResult,
  TypeOrmHealthIndicator
} from "@nestjs/terminus";
import {
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ConfigService } from "@nestjs/config";
import {
  Controller,
  Get
} from "@nestjs/common";

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dnsIndicator: DNSHealthIndicator,
    private typeORMIndicator: TypeOrmHealthIndicator,
    private configService: ConfigService
  ) {
  }

  @Get('dns')
  @ApiOperation({ summary: 'Check DNS health' })
  @HealthCheck()
  dnsCheck(): Promise<HealthCheckResult> {
    const {
      title,
      url
    } = this.configService.get('site');

    return this.health.check([
      (): Promise<HealthIndicatorResult> => this.dnsIndicator.pingCheck(title, url),
    ])
  }

  @Get('database')
  @ApiOperation({ summary: 'Check Database health' })
  @HealthCheck()
  databaseCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> => this.typeORMIndicator.pingCheck('database')
    ])
  }
}
