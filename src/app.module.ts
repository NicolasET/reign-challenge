import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from './news/news.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-news'),
    ScheduleModule.forRoot(),
    NewsModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
