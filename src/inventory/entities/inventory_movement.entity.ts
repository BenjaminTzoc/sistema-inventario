import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum MovementType {
    IN = "entrada",
    OUT = "salida",
}

export enum DocumentType {
    PURCHASE = "compra",
    SALE = "venta",
    ADJUSTMENT = "ajuste"
}

@Entity("inventory_movements")
export class InventoryMovement {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id, { nullable: true, onDelete: "SET NULL", eager: true })
    user: User;

    @ManyToOne(() => Product, (product) => product.id, { onDelete: "CASCADE", eager: true })
    product: Product;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    movement_date: Date;

    @Column({ type: "enum", enum: MovementType })
    movement_type: MovementType;

    @Column({ type: "int", nullable: true })
    document_id: number | null;

    @Column({ type: "enum", enum: DocumentType, nullable: true })
    document_type: DocumentType | null;

    @Column({ type: "numeric", precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: "text", nullable: true })
    description: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
}