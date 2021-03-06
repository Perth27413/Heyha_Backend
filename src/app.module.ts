import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthcheckModule } from './module/healthcheck.module';
import { UserModule } from './module/user.module';
import { CategoryModule } from './module/category.module';
import {ProductModule} from "./module/product.module";
import {CartModule} from "./module/cart.module";
import {PaymentModule} from "./module/payment.module";
import {OrderModule} from "./module/order.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    HealthcheckModule,
    UserModule,
    CategoryModule,
    ProductModule,
    CartModule,
    PaymentModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
