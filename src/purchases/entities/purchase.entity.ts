import { PurchaseDetail } from "src/purchases/entities/purchase_detail.entity";
import { PurchasePayment } from "src/purchases/entities/purchase_payment.entity";
import { Supplier } from "src/suppliers/entities/supplier.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum PurchaseStatus {
    PENDING = 'pendiente',
    COMPLETED = 'completada',
    CANCELLED = 'cancelada',
}

@Entity('purchases')
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: true, nullable: false })
    user: User;

    @ManyToOne(() => Supplier, { eager: true })
    supplier: Supplier;

    @OneToMany(() => PurchaseDetail, detail => detail.purchase, { cascade: true })
    details: PurchaseDetail[];

    @OneToMany(() => PurchasePayment, payment => payment.purchase, { cascade: true })
    payments: PurchasePayment[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.PENDING })
    status: PurchaseStatus;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}