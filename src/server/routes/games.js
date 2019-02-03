import express from 'express';

import * as gamesContoller from '../controllers/games';

const router = express.Router();

router.get('/', gamesContoller.getGames);
router.post('/', gamesContoller.createGame);
router.get('/:id', gamesContoller.getGame);
router.patch('/:id', gamesContoller.updateGame);
router.delete('/:id', gamesContoller.deleteGame);

export default router;
