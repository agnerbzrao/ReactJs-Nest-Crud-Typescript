import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transactions } from './entity/transactions.entity';
import { Repository, DataSource, Transaction } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let transactionsRepository: Repository<Transactions>;
  let dataSource: DataSource;

  const result = { transactionsMock: 'transactionsMockResult' },
    mockTransactionsEntity: Transactions[] = [
      {
        type_sale: '1',
        date_sale: '2022-01-15T19:20:30-03:00',
        product: 'DOMINANDOINVESTIMENTOS',
        value_sale: '0000012750',
        seller: 'MARIA CANDIDA',
      },
    ];

  const mockJson = jest.fn().mockImplementation(() => result),
    mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson })),
    mockResponse = {
      status: mockStatus,
    },
    expressMuterFile = {
      fieldname: 'file',
      originalname: 'TradeHistory.csv',
      encoding: '7bit',
      mimetype: 'text/csv',
      buffer: Buffer.from(__dirname + '/../../TradeHistory.csv', 'utf8'),
      size: 51828,
    } as Express.Multer.File;

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
      .mockImplementation(
        async () => await Promise.resolve(mockTransactionsEntity),
      );

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

  it('should return an mock response of uploadFile method of appController', async () => {
    const appServiceResponse = jest
      .spyOn(appService, 'handleFile')
      .mockImplementation(
        async () => await Promise.resolve(mockTransactionsEntity),
      );

    expect(await appController.uploadFile(mockResponse, expressMuterFile)).toBe(
      result,
    );
    expect(appServiceResponse).toHaveBeenCalledWith(expressMuterFile);
  });
});
