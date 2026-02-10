import express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'Health - OK' });
});

export default router;