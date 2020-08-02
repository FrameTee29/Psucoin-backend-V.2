import { Injectable,Inject } from '@nestjs/common';
import { User } from './entity/users.entity';

// export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {
    // this.users = [
    //   {
    //     userId: 1,
    //     username: 'john',
    //     password: 'changeme',
    //   },
    //   {
    //     userId: 2,
    //     username: 'chris',
    //     password: 'secret',
    //   },
    //   {
    //     userId: 3,
    //     username: 'maria',
    //     password: 'guess',
    //   },
    // ];
  }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username); // หาข้อมูล  username ว่ามีรึป่วา
  // }
  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }
}