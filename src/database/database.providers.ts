import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/entity/users.entity';
import { Profile } from 'src/profile/entity/profile.entity';
import { Transfer } from 'src/tranfer/entity/transfer.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'psucoin',
      });
      sequelize.addModels([User,Profile,Transfer]);
      await sequelize.sync();
      return sequelize;
    },
  },
];