import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { DiscountCodesModule } from './discount-codes/discount-codes.module';
import { InventoryModule } from './inventory/inventory.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { ProductsModule } from './products/products.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SalesModule } from './sales/sales.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { ProductCategory } from './products/entities/product-category.entity';
import { UnitMeasure } from './products/entities/unit_measure.entity';
import { Product } from './products/entities/product.entity';
import { PurchaseDetail } from './purchases/entities/purchase_detail.entity';
import { Purchase } from './purchases/entities/purchase.entity';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { Supplier } from './suppliers/entities/supplier.entity';
import { PurchasePayment } from './purchases/entities/purchase_payment.entity';
import { PaymentMethod } from './payment-methods/entities/payment_method.entity';
import { InventoryMovement } from './inventory/entities/inventory_movement.entity';
import { Sale } from './sales/entities/sale.entity';
import { SaleDetail } from './sales/entities/sale_detail.entity';
import { SalePayment } from './sales/entities/sale_payment.entity';
import { Customer } from './customers/entities/customer.entity';
import { CustomerCategory } from './customers/entities/customer_category.entity';
import { Benefit } from './customers/entities/benefit.entity';
import { DiscountCode } from './discount-codes/entities/discount_code.entity';
import { DiscountUsage } from './discount-codes/entities/discount_usage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'sistema-inventario',
      entities: [
        UnitMeasure,
        ProductCategory,
        Product,
        PurchaseDetail,
        Purchase,
        User,
        Role,
        Supplier,
        PurchasePayment,
        PaymentMethod,
        InventoryMovement,
        Sale,
        SaleDetail,
        SalePayment,
        Customer,
        CustomerCategory,
        Benefit,
        DiscountCode,
        DiscountUsage,
      ],
      synchronize: true,
    }),
    CustomersModule,
    DiscountCodesModule,
    InventoryModule,
    PaymentMethodsModule,
    ProductsModule,
    PurchasesModule,
    SalesModule,
    SuppliersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
