import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus/prometheus.service';
import { PrometheusController } from './prometheus/prometheus.controller';

@Module({
  controllers: [PrometheusController],
  providers: [PrometheusService],
})
export class AppModule {}
