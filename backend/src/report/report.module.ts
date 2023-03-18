import { Module } from '@nestjs/common';
import { ReportService } from './report.service';

@Module({
  providers: [ReportService]
})
export class ReportModule {}
