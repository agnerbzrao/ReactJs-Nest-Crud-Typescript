import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transactions } from './entity/transactions.entity';
import { Repository, DataSource } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let transactionsRepository: Repository<Transactions>;
  let dataSource: DataSource;

  const result = {
    transactionsMock: 'transactionsMockResult',
  };
  const mockJson = jest.fn().mockImplementation(() => result),
    mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson })),
    mockResponse = {
      status: mockStatus,
    };

  beforeEach(() => {
    appService = new AppService(transactionsRepository, dataSource);
    appController = new AppController(appService);
  });

  it('should be defined the appService', () => {
    expect(appService).toBeDefined();
  });

  it('should return an mock response of findAll method of appController', async () => {
    const appServiceResponse = jest
      .spyOn(appService, 'findAll')
      .mockImplementation(async () => await Promise.resolve(result));

    expect(await appController.fetchAll(mockResponse)).toBe(result);
    expect(appServiceResponse).toBeCalled();
  });
  it('should return an mock response of getProducerFinalBalance method of appController', async () => {
    const appServiceResponse = jest
      .spyOn(appService, 'getProducerFinalBalance')
      .mockImplementation(async () => await Promise.resolve(result));

    expect(await appController.getProducerFinalBalance(mockResponse)).toBe(
      result,
    );
    expect(appServiceResponse).toBeCalled();
  });

  it('should return an mock response of getAffiliateFinalBalance method of appController', async () => {
    const appServiceResponse = jest
      .spyOn(appService, 'getAffiliateFinalBalance')
      .mockImplementation(async () => await Promise.resolve(result));

    expect(await appController.getAffiliateFinalBalance(mockResponse)).toBe(
      result,
    );
    expect(appServiceResponse).toBeCalled();
  });
});
