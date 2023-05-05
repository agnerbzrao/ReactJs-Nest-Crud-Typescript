import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type_sale: string;

  @Column()
  date_sale: string;

  @Column()
  product: string;

  @Column()
  value_sale: string;

  @Column()
  seller: string;
}
