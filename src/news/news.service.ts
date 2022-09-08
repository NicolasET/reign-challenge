import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { AlgoliaResponse } from './interfaces/algolia-response.interface';
import axios from 'axios';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const news = await this.newsModel.create(createNewsDto);
    return news;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5 } = paginationDto; //Pagination with 5 items as default
    return await this.newsModel.find().limit(limit);
  }

  async findOne(id: string) {
    const news = await this.newsModel.findById(id);
    if (!news) this.newsDoesntExist();
    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const newsUpdated = await this.newsModel.findByIdAndUpdate(
      id,
      updateNewsDto,
      { new: true },
    );
    if (!newsUpdated) this.newsDoesntExist();
    return newsUpdated;
  }

  async remove(id: string) {
    const deletedNew = await this.newsModel.findByIdAndDelete(id);
    if (!deletedNew) this.newsDoesntExist();
    return 'News deleted';
  }

  @Cron(CronExpression.EVERY_HOUR)
  async scheduleRequest() {
    const { data } = await axios.get<AlgoliaResponse>(
      'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
    );
    data.hits.forEach(async (news) => {
      await this.create(news as CreateNewsDto);
    });
  }

  //Function to handle when an item is not found
  private newsDoesntExist() {
    throw new NotFoundException(`This news doesnt exist`);
  }
}
