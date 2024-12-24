import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';
@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly httpRequestCounter: client.Counter<string>;

  constructor() {
    this.register = new client.Registry();
    this.register.setDefaultLabels({ app: 'nestjs-prometheus' });
    client.collectDefaultMetrics({ register: this.register });

    this.httpRequestCounter = new client.Counter({
      name: 'http_requests_total',
      help: 'Número total de requisições HTTP',
      labelNames: ['method', 'route', 'status'],
      registers: [this.register],
    });
  }

  incrementHttpRequest(method: string, route: string, status: string) {
    this.httpRequestCounter.inc({ method, route, status });
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
