import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { Product } from "src/products/entities/product.entity";

@Entity('sale_details')
export class SaleDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Sale, sale => sale.details, { onDelete: 'CASCADE' })
    sale: Sale;

    @ManyToOne(() => Product, product => product.purchaseDetails, { eager: true })
    product: Product;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    unit_price: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    subtotal: number;
}