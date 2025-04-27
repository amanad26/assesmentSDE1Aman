import express from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, restrictTo('admin'), createPost);

router.route('/:id')
  .put(protect, restrictTo('admin'), updatePost)
  .delete(protect, restrictTo('admin'), deletePost);

export default router;