import express from 'express';

import * as gameContoller from '../controllers/game';

const router = express.Router();

router.get('/board', gameContoller.getBoard);
router.put('/board', gameContoller.updateBoard);

export default router;
