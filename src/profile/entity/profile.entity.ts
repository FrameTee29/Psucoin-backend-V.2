import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/entity/users.entity';


@Table({})
export class Profile extends Model<Profile> {

    @BelongsTo(() => User)
    user: User;
    
    @ForeignKey(() => User)
    @Column
    sid: string;

    @Column
    publickey: string;

    @Column
    privatekey: string;

    @Column
    coin: number;



}