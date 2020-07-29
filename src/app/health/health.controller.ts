import {
  HealthCheckService,
  DNSHealthIndicator,
  HealthCheck,
  HealthIndicatorResult,
  HealthCheckResult,
  TypeOrmHealthIndicator
} from "@nestjs/terminus";
import { ConfigService } from "@nestjs/config";
import {
  Controller,
  Get
} from "@nestjs/common";

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
  @HealthCheck()
  databaseCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> => this.typeORMIndicator.pingCheck('database')
    ])
  }
}
