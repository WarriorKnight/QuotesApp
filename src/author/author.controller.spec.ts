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

  describe('findAll', () => {
    it('should call authorService.findAll and return the result', async () => {
      const expectedResult = [
        { _id: 'mockGeneratedId', name: 'Test Author' },
        { _id: 'mockGeneratedId2', name: 'Test Author 2' },
      ];
      mockAuthorService.findAll.mockResolvedValue(expectedResult);
      const result = await controller.findAll();
      expect(mockAuthorService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
