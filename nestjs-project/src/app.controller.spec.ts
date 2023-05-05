import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transactions } from './entity/transactions.entity';
import { Repository, DataSource } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let transactionsRepository: Repository<Transactions>;
  let dataSource: DataSource;

  const responseObject = {
    status: 200,
    message: 'Hello World!',
  };
  const response = {
    status: jest.fn().mockImplementation().mockReturnValue(200),
    json: jest.fn().mockImplementation().mockReturnValue(responseObject),
  };

  beforeEach(() => {
    appService = new AppService(transactionsRepository, dataSource);
    appController = new AppController(appService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });
  it('should return an array of cats', async () => {
    const result = {
      a: 'a',
    };
    jest
      .spyOn(appService, 'findAll')
      .mockImplementation(async () => await Promise.resolve(result));

    const teste = await appController.fetchAll(response);
  });
});
