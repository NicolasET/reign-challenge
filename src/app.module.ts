import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from './news/news.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-news'),
    ScheduleModule.forRoot(),
    NewsModule,
    CommonModule,
  ],
})
export class AppModule {}
