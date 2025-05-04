import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './../schemas/author.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel('Author') private readonly authorModel: Model<Author>,
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const author = new this.authorModel(createAuthorDto);
    return await author.save();
  }

  findAll() {
    return this.authorModel.find().exec();
  }

  findOne(id: string) {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, {
        new: true,
      })
      .exec();
    return author;
  }

  remove(id: string) {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
