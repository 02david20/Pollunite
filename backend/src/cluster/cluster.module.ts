import { Module } from '@nestjs/common';
import { ClusterService } from './cluster.service';

@Module({
  providers: [ClusterService]
})
export class ClusterModule {}
