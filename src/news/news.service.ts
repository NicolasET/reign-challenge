import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { AlgoliaResponse } from '../common/interfaces/algolia-response.interface';
import axios from 'axios';
import { FilterDto } from 'src/common/dto/filter.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    try {
      const news = await this.newsModel.create(createNewsDto);
      return news;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(filterDto: FilterDto) {
    const { limit = 5 } = filterDto; //Pagination with 5 items as default
    return await this.newsModel
      .find({
        ...(filterDto.title ? { title: filterDto.title } : {}),
        ...(filterDto.author ? { author: filterDto.author } : {}),
        ...(filterDto._tags
          ? { _tags: { $in: filterDto._tags.split(',') } }
          : {}),
      })
      .limit(limit);
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
      const newNews = await this.newsModel.find({ objectID: news.objectID });
      if (!newNews) await this.create(news); //If news don't exist create
    });
  }

  //Function to handle when an item is not found
  private newsDoesntExist() {
    throw new NotFoundException(`This news doesnt exist`);
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `This news already exists in the db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create News - Check server logs`,
    );
  }
}
