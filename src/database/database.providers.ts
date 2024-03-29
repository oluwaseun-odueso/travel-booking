import { Sequelize } from 'sequelize-typescript';
require('dotenv').config()
import { User } from 'src/users/entities/user.entity';


const database = process.env.SQ_DATABASE;
const user = process.env.SQ_USERNAME;
const password = process.env.SQ_PASSWORD;
const host = process.env.SQ_HOST;

if (!database || !user || !password) {
  throw new Error(
    "Missing required environment variables for database connection"
  );
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      })
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];