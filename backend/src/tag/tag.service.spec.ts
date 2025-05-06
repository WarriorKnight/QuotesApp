/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TagService } from './tag.service';
import { Model } from 'mongoose';

type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>> & {
  new (dto: any): {
    save: jest.Mock;
  };
};

const mockTagModel: MockModel = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: jest.fn().mockResolvedValue({ _id: 'abc123', ...dto }),
}));

mockTagModel.find = jest.fn();
mockTagModel.findById = jest.fn();
mockTagModel.findByIdAndUpdate = jest.fn();
mockTagModel.findByIdAndDelete = jest.fn();

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getModelToken('Tag'),
          useValue: mockTagModel,
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should create a new tag', async () => {
    const createTagDto = { name: 'New Tag' };
    const mockTag = { _id: 'abc123', ...createTagDto };
    const saveMock = jest.fn().mockResolvedValue(mockTag);
    (mockTagModel as jest.Mock).mockImplementation(() => ({
      save: saveMock,
    }));
    const result = await service.create(createTagDto);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual(mockTag);
  });

  it('findOne() should return tag based on id', async () => {
    const id = 'abc123';
    const mockTag = { _id: id, name: 'Test tag' };
    jest.spyOn(mockTagModel, 'findById').mockReturnValue({
      exec: () => Promise.resolve(mockTag),
    } as any);
    const result = await service.findOne(id);
    expect(result).toEqual(mockTag);
  });

  it('findAll() should return all tags', async () => {
    const mockTags = [
      { _id: 'abc123', name: 'Tag 1' },
      { _id: 'def456', name: 'Tag 2' },
    ];
    jest.spyOn(mockTagModel, 'find').mockReturnValue({
      exec: () => Promise.resolve(mockTags),
    } as any);
    const result = await service.findAll();
    expect(result).toEqual(mockTags);
  });

  it('update() should update a tag', async () => {
    const id = 'abc123';
    const updateTagDto = { name: 'Updated Tag' };
    const mockTag = { _id: id, ...updateTagDto };
    jest.spyOn(mockTagModel, 'findByIdAndUpdate').mockReturnValue({
      exec: () => Promise.resolve(mockTag),
    } as any);
    const result = await service.update(id, updateTagDto);
    expect(result).toEqual(mockTag);
  });
  it('remove() should delete a tag', async () => {
    const id = 'abc123';
    const mockTag = { _id: id, name: 'Test tag' };
    jest.spyOn(mockTagModel, 'findByIdAndDelete').mockReturnValue({
      exec: () => Promise.resolve(mockTag),
    } as any);
    const result = await service.remove(id);
    expect(result).toEqual(mockTag);
  });
});
