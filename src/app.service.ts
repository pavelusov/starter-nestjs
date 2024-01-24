import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { data: string } {
    return { data: 'the stock market check' };
  }
}
