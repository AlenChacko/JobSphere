import express from 'express'

import { upload } from '../middleware/multer.js'
import { protectRecruiter } from '../middleware/authMiddleware.js';
import {getRecruiterProfile} from '../controllers/recruiterController.js'


export const recruiterRouter = express.Router()

recruiterRouter.get("/profile", protectRecruiter, getRecruiterProfile);


