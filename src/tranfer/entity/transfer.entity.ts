import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/entity/users.entity';


@Table({})
export class Transfer extends Model<Transfer> {

    @Column
    from: string;

    @Column
    to: string;

    @Column
    amount: number;

    @Column
    txHash: string;



}