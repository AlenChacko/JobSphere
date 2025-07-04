import express from 'express'

import { upload } from '../middleware/multer.js'
import { protectRecruiter } from '../middleware/authMiddleware.js';

export const recruiterRouter = express.Router()


