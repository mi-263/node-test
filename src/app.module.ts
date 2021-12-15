import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {configService} from "./config/config.service";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {FileUploadController} from "./fileupload.controller";
import {FileUploadService} from "./fileupload.service";

// @ts-ignore
// @ts-ignore
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'testdb',

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: false,
    }),
  ],
  controllers: [AppController, UserController, FileUploadController ],
  providers: [AppService, UserService, FileUploadService],
})
// @ts-ignore
export class AppModule {
}
