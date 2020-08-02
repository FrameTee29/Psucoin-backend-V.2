import { Table, Column, Model, PrimaryKey,AutoIncrement, HasOne } from 'sequelize-typescript';
import { Profile } from 'src/profile/entity/profile.entity';

@Table({})
export class User extends Model<User> {

  @HasOne(() => Profile)
  profile: Profile;

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
  
}