import { Table, Column, Model } from 'sequelize-typescript';

@Table({})
export class User extends Model<User> {
  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  sid: string;

  @Column
  cardid: string;

  @Column
  email: string;
}