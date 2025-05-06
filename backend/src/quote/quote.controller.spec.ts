import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

const mockQuoteService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('QuoteController', () => {
  let controller: QuoteController;
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: mockQuoteService,
        },
      ],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call quoteService.create with the correct DTO and return the result', async () => {
      const createDto: CreateQuoteDto = {
        text: 'Test Quote Text',
        author: 'Test Author ID',
      };
      const expectedResult = { _id: 'mockGeneratedId', ...createDto };
      mockQuoteService.create.mockResolvedValue(expectedResult);
      const result = await controller.create(createDto);
      expect(mockQuoteService.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call quoteService.findAll and return the result', async () => {
      const expectedResult = [
        { _id: 'mockId1', text: 'Quote 1', author: 'Author 1' },
        { _id: 'mockId2', text: 'Quote 2', author: 'Author 2' },
      ];
      mockQuoteService.findAll.mockResolvedValue(expectedResult);
      const result = await controller.findAll();
      expect(mockQuoteService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call quoteService.findOne with the correct id and return the result', async () => {
      const id = 'mockId';
      const expectedResult = { _id: id, text: 'Quote Text', author: 'Author' };
      mockQuoteService.findOne.mockResolvedValue(expectedResult);
      const result = await controller.findOne(id);
      expect(mockQuoteService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call quoteService.update with the correct id and DTO and return the result', async () => {
      const id = 'mockId';
      const updateDto = { text: 'Updated Quote Text' };
      const expectedResult = { _id: id, ...updateDto };
      mockQuoteService.update.mockResolvedValue(expectedResult);
      const result = await controller.update(id, updateDto);
      expect(mockQuoteService.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call quoteService.remove with the correct id and return the removed result', async () => {
      const id = 'mockId';
      const expectedResult = { deletedCount: 1 };
      mockQuoteService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(mockQuoteService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
