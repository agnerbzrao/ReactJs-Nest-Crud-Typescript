import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transactions } from './entity/transactions.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    private dataSource: DataSource,
  ) {}
  async handleFile(file: Express.Multer.File): Promise<Transactions[]> {
    if (!file) {
      throw new HttpException(
        'Arquivo com formato invalido',
        HttpStatus.BAD_REQUEST,
      );
    }

    const arrayString = this.getArrayFromBuffer(file);

    const transEntityArray: Array<Transactions> = arrayString.map((arrStrg) => {
      const transactionsObject: Transactions = {
        type_sale: this.stringSlice(arrStrg, 0, 1),
        date_sale: this.stringSlice(arrStrg, 1, 26),
        product: this.stringSlice(arrStrg, 26, 56).replace(/\s/g, ''),
        value_sale: this.stringSlice(arrStrg, 56, 66),
        seller: this.stringSlice(arrStrg, 66, 86),
      };

      return transactionsObject;
    });
    return this.createMany(transEntityArray);
  }

  async findAll(): Promise<Transactions[]> {
    return await this.transactionsRepository.find();
  }

  async getProducerFinalBalance(): Promise<any> {
    return await this.transactionsRepository.query(
      'SELECT' +
        '(SELECT sum(value_sale) FROM transactions where type_sale = 1)' +
        '+' +
        '(SELECT sum(value_sale) FROM transactions where type_sale = 4)' +
        '-' +
        '(SELECT sum(value_sale) FROM transactions where type_sale = 3)' +
        'as sale_productor_sum',
    );
  }

  async getAffiliateFinalBalance(): Promise<any> {
    return await this.transactionsRepository.query(
      'SELECT SUM(value_sale) as sale_affiliate_sum, seller ' +
        'FROM transactions where type_sale = 2 ' +
        'group by seller',
    );
  }

  getArrayFromBuffer(file: Express.Multer.File): Array<string> {
    return file.buffer.toString().split(/\r?\n/);
  }

  async createMany(transEntityArray: Transactions[]): Promise<Transactions[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      transEntityArray.forEach(async (transEntit) => {
        const transactions = new Transactions();

        const returnedTarget = Object.assign(transactions, transEntit);

        await queryRunner.manager.save(returnedTarget);
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return transEntityArray;
  }

  stringSlice(arrStrg: string, initial: number, end: number): string {
    arrStrg = arrStrg.slice(initial, end);

    if (arrStrg === '') {
      throw new HttpException(
        'Arquivo com formato invalido',
        HttpStatus.BAD_REQUEST,
      );
    }
    return arrStrg;
  }
}
