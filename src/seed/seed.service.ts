import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AlgoliaResponse } from 'src/common/interfaces/algolia-response.interface';
import { NewsService } from '../news/news.service';
import { Model } from 'mongoose';
import { News } from 'src/news/entities/news.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  constructor(
    private readonly newsService: NewsService,
    @InjectModel(News.name)
    private readonly newsModel: Model<News>,
  ) {}
  async executeSeed() {
    await this.newsModel.deleteMany({}); //Clear entire db, so please execute just one time (first time)
    const { data } = await axios.get<AlgoliaResponse>(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    data.hits.forEach(async (news) => {
      await this.newsService.create(news);
    });
    return 'Database populated';
  }
}
