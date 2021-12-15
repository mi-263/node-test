import { Injectable } from '@nestjs/common';

// @ts-ignore
@Injectable()
// @ts-ignore
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
