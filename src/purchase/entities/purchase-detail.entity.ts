import { Product } from "src/product/entities/product.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchase_details')
export class PurchaseDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, purchase => purchase.details, { onDelete: 'CASCADE' })
    purchase: Purchase;

    @ManyToOne(() => Product, product => product.purchaseDetails, { eager: true })
    product: Product;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    unit_price: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    subtotal: number;
}