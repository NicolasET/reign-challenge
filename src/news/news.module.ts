import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './entities/news.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: News.name,
        schema: NewsSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService, MongooseModule],
})
export class NewsModule {}
