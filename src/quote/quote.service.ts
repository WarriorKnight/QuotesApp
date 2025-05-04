import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './../schemas/quote.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel('Quote') private readonly quoteModel: Model<Quote>,
  ) {}

  async create(CreateQuoteDto: CreateQuoteDto) {
    const author = new this.quoteModel(CreateQuoteDto);
    return await author.save();
  }

  findAll() {
    return this.quoteModel.find().exec();
  }

  findOne(id: string) {
    return this.quoteModel.findById(id).exec();
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    const updatedQuote = await this.quoteModel
      .findByIdAndUpdate(id, updateQuoteDto, { new: true })
      .exec();
    return updatedQuote;
  }

  remove(id: string) {
    return this.quoteModel.findByIdAndDelete(id).exec();
  }
}
