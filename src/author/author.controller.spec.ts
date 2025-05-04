import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

const mockAuthorService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('AuthorController', () => {
  let controller: AuthorController;
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call authorService.create with the correct DTO and return the result', async () => {
      const createDto: CreateAuthorDto = {
        name: 'Test Author Name',
        bio: 'Test Author Bio',
      };
      const expectedResult = { _id: 'mockGeneratedId', ...createDto };
      mockAuthorService.create.mockResolvedValue(expectedResult);
      const result = await controller.create(createDto);
      expect(mockAuthorService.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call authorService.findOne with the correct id and return the result', async () => {
      const id = 'mockId';
      const expectedResult = { _id: id, name: 'Test Author' };
      mockAuthorService.findOne.mockResolvedValue(expectedResult);
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const result = await controller.findOne(id);
      expect(mockAuthorService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call authorService.update with the correct id and return the result', async () => {
      const id = 'mockId';
      const updateDto = { name: 'Updated Author' };
      const expectedResult = { _id: id, ...updateDto };
      mockAuthorService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateDto);

      expect(mockAuthorService.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call authorService.remove with the correct id and return the result', async () => {
      const id = 'mockId';
      const expectedResult = { deletedCount: 0 };
      mockAuthorService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(mockAuthorService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
