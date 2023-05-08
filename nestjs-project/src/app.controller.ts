import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Res() response, @UploadedFile() file: Express.Multer.File) {
    const transactionsCreated = await this.appService.handleFile(file);
    return response.status(HttpStatus.CREATED).json({
      transactionsCreated,
    });
  }
  @Get()
  async fetchAll(@Res() response) {
    const transactions = await this.appService.findAll();
    return response.status(HttpStatus.OK).json({
      transactions,
    });
  }

  @Get('/producer-final-balance')
  async getProducerFinalBalance(@Res() response) {
    const transactions = await this.appService.getProducerFinalBalance();
    return response.status(HttpStatus.OK).json({
      transactions,
    });
  }

  @Get('/affiliate-final-balance')
  async getAffiliateFinalBalance(@Res() response) {
    const transactions = await this.appService.getAffiliateFinalBalance();
    return response.status(HttpStatus.OK).json({
      transactions,
    });
  }
}
