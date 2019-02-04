import express from 'express';

import * as userContoller from '../controllers/user';

const router = express.Router();

router.post('/', userContoller.initUser);

export default router;
