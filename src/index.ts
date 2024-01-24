import { DataSource } from 'typeorm';
import express from 'express';
import dotenv from 'dotenv';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';
import { createClientRouter } from './routes/create_client';
import { Client } from './entities/Client';
import { createBankerRouter } from './routes/create_banker';
import { createTransactionRouter } from './routes/create_transaction';
import { connectBankerToClient } from './routes/connect_banker_to_client';
import { deleteClientRouter } from './routes/delete_client';

const app = express();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'mariapallares',
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_DATABASE || 'typeorm',
  entities: [Client, Banker, Transaction],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClient);
    app.use(deleteClientRouter);
    app.listen(300, () => console.log('Server running on port 300'));
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
