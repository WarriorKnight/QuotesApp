/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { QuoteService } from './quote.service';
import { Model } from 'mongoose';

type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>> & {
  new (dto: any): {
    save: jest.Mock;
  };
};

const mockQuoteModel: MockModel = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: jest.fn().mockResolvedValue({ _id: 'abc123', ...dto }),
}));

mockQuoteModel.find = jest.fn();
mockQuoteModel.findById = jest.fn();
mockQuoteModel.findByIdAndUpdate = jest.fn();
mockQuoteModel.findByIdAndDelete = jest.fn();

describe('QuoteService', () => {
  let service: QuoteService;
  let model: typeof mockQuoteModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: getModelToken('Quote'),
          useValue: mockQuoteModel,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    model = module.get(getModelToken('Quote'));
  });

  it('create() should create a new quote', async () => {
    const createQuoteDto = { text: 'New Quote', author: 'Author ID' };
    const mockQuote = { _id: 'abc123', ...createQuoteDto };
    const saveMock = jest.fn().mockResolvedValue(mockQuote);
    (mockQuoteModel as jest.Mock).mockImplementation(() => ({
      save: saveMock,
    }));
    const result = await service.create(createQuoteDto);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual(mockQuote);
  });

  it('findOne() should return quote based on id', async () => {
    const id = 'abc123';
    const mockQuote = { _id: id, text: 'Test quote' };
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: () => Promise.resolve(mockQuote),
    } as any);
    const result = await service.findOne(id);
    expect(model.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockQuote);
  });

  it('findAll() should return all quotes', async () => {
    const mockQuotes = [
      { _id: 'abc123', text: 'Quote 1' },
      { _id: 'def456', text: 'Quote 2' },
    ];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: () => Promise.resolve(mockQuotes),
    } as any);
    const result = await service.findAll();
    expect(model.find).toHaveBeenCalled();
    expect(result).toEqual(mockQuotes);
  });

  it('update() should update a quote by id', async () => {
    const id = 'abc123';
    const updateData = { text: 'Updated quote' };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: () => Promise.resolve({ ...updateData, _id: id }),
    } as any);

    const result = await service.update(id, updateData);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toEqual({ ...updateData, _id: id });
  });

  it('remove() should delete a quote by id', async () => {
    const id = 'abc123';
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: () => Promise.resolve({ deletedCount: 1 }),
    } as any);

    const result = await service.remove(id);

    expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual({ deletedCount: 1 });
  });
});
