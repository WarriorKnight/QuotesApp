import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './../schemas/tag.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async create(createTagDto: CreateTagDto) {
    const tag = new this.tagModel(createTagDto);
    return await tag.save();
  }

  findAll() {
    return this.tagModel.find().exec();
  }

  findOne(id: string) {
    return this.tagModel.findById(id).exec();
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.tagModel
      .findByIdAndUpdate(id, updateTagDto, {
        new: true,
      })
      .exec();
    return tag;
  }

  remove(id: string) {
    return this.tagModel.findByIdAndDelete(id).exec();
  }
}
