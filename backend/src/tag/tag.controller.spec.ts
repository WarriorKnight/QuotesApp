import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

const mockTagService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('TagController', () => {
  let controller: TagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call tagService.create and return the new tag', async () => {
      const dto: CreateTagDto = { name: 'Test Tag' };
      const expected = { _id: 'mockId1', ...dto };
      mockTagService.create.mockResolvedValue(expected);

      const result = await controller.create(dto);

      expect(mockTagService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should call tagService.findAll and return an array of tags', async () => {
      const expected = [
        { _id: 'mockId1', name: 'Tag1' },
        { _id: 'mockId2', name: 'Tag2' },
      ];
      mockTagService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(mockTagService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should call tagService.findOne with the correct id and return the tag', async () => {
      const id = 'mockId1';
      const expected = { _id: id, name: 'Tag1' };
      mockTagService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne(id);

      expect(mockTagService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('should call tagService.update with the correct id and DTO and return the updated tag', async () => {
      const id = 'mockId1';
      const dto: UpdateTagDto = { name: 'Updated Tag' };
      const expected = { _id: id, ...dto };
      mockTagService.update.mockResolvedValue(expected);

      const result = await controller.update(id, dto);

      expect(mockTagService.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should call tagService.remove with the correct id and return the delete result', async () => {
      const id = 'mockId1';
      const expected = { deletedCount: 1 };
      mockTagService.remove.mockResolvedValue(expected);

      const result = await controller.remove(id);

      expect(mockTagService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(expected);
    });
  });
});
