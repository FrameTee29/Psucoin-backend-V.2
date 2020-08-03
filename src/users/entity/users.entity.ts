import { Table, Column, Model, PrimaryKey,AutoIncrement, HasOne } from 'sequelize-typescript';


@Table({})
export class User extends Model<User> {


  @PrimaryKey
  @Column
  sid: string;

  @Column
  password:string;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  cid: string;

  @Column
  email: string;
  
}