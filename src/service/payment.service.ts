import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentEntity} from "../entities/payment.entity";
import {Repository} from "typeorm";
import PaymentModel from "../model/payment/PaymentModel";
import DataNotFoundException from "../Exception/DataNotFoundException";

@Injectable()
export class PaymentService {
   constructor(
       @InjectRepository(PaymentEntity) private paymentRepo: Repository<PaymentEntity>
   ) {}
   
   public async getPaymentMethod(): Promise<Array<PaymentModel>> {
      let paymentMethod = this.paymentRepo.find()
      if (!paymentMethod) throw new DataNotFoundException
      return paymentMethod
   }
}