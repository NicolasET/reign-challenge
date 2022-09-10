import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { NewsModule } from '../news/news.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [NewsModule],
})
export class SeedModule {}
