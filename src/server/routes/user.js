import express from 'express';

import * as userContoller from '../controllers/user';

const router = express.Router();

router.post('/', userContoller.initUser);
router.patch('/:id', userContoller.updateUser);

export default router;
