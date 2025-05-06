/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthorService } from './author.service';
import { Model } from 'mongoose';

type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>> & {
  new (dto: any): {
    save: jest.Mock;
  };
};

const mockAuthorModel: MockModel = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: jest.fn().mockResolvedValue({ _id: 'abc123', ...dto }),
}));

mockAuthorModel.find = jest.fn();
mockAuthorModel.findById = jest.fn();
mockAuthorModel.findByIdAndUpdate = jest.fn();
mockAuthorModel.findByIdAndDelete = jest.fn();

describe('AuthorService', () => {
  let service: AuthorService;
  let model: MockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getModelToken('Author'),
          useValue: mockAuthorModel,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    model = module.get(getModelToken('Author'));
  });

  it('create() should create a new author', async () => {
    const createAuthorDto = { name: 'New Author' };
    const mockAuthor = { _id: 'abc123', ...createAuthorDto };

    const saveMock = jest.fn().mockResolvedValue(mockAuthor);
    (mockAuthorModel as jest.Mock).mockImplementation(() => ({
      save: saveMock,
    }));

    const result = await service.create(createAuthorDto);

    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual(mockAuthor);
  });

  it('findOne() should return a single author by id', async () => {
    const id = 'abc123';
    const mockAuthor = { _id: id, name: 'Author 1' };
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: () => Promise.resolve(mockAuthor),
    } as any);

    const result = await service.findOne(id);

    expect(model.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockAuthor);
  });

  it('findAll() should return all quotes', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: () => Promise.resolve([{ name: 'Author 1' }, { name: 'Author 2' }]),
    } as any);

    const result = await service.findAll();

    expect(model.find).toHaveBeenCalled();
    expect(result).toEqual([{ name: 'Author 1' }, { name: 'Author 2' }]);
  });

  it('update() should update a quote by id', async () => {
    const id = 'abc123';
    const updateData = { name: 'Updated Author' };
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
