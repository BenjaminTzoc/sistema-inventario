import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DiscountCode } from "./discount_code.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Sale } from "src/sales/entities/sale.entity";

@Entity('discount_usage')
export class DiscountUsage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, { eager: true })
    customer: Customer;

    @ManyToOne(() => DiscountCode, { eager: true })
    discount_code: DiscountCode;

    @ManyToOne(() => Sale, { eager: true, nullable: true })
    sale: Sale;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    usage_date: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}