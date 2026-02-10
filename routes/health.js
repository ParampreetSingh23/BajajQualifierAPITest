import express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ "is_success": true,
"official_email": "parampreet1088.be23@chitkara.edu.in"});
});

export default router;