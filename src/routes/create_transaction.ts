import express from 'express';
import { Client } from '../entities/Client';
import { Transaction, TransactionTypes } from '../entities/Transaction';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
  console.log('hello');
  const { clientId } = req.params;

  const { type, amount } = req.body;

  const client = await Client.findOne({ where: { id: parseInt(clientId) } });

  if (!client) {
    return res.json({
      msg: 'client not found',
    });
  }

  const transaction = Transaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.deposit) {
    client.balance = Number(client.balance) + amount;
  } else if (type === TransactionTypes.withdraw) {
    client.balance = Number(client.balance) - amount;
  }

  await client.save();

  return res.json({
    msg: 'transaction added',
  });
});

export { router as createTransactionRouter };
