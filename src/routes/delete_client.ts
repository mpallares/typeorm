import express from 'express';
import { Client } from '../entities/Client';

const router = express.Router();

router.delete('/api/client/:clientId', async (req, res) => {
  const { clientId } = req.params;

  console.log(clientId);

  const response = await Client.delete(clientId);

  console.log('response', response);

  return response;
});

export { router as deleteClientRouter };
