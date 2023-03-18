import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
class Clusters implements OnModuleInit {
  private static clusters: any;
  onModuleInit() {
    Clusters.clusters = {};
  }
}
