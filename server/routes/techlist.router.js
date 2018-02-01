import { Router } from 'express';
import * as TechListController from '../controllers/techlist.controller';
const router = new Router();

// Get all Posts
router.route('/techlist').get(TechListController.getPosts);

// Get one post by cuid
router.route('/techlist/:cuid').get(TechListController.getPost);

// Add a new Post
router.route('/techlist').post(TechListController.addPost);

// Delete a post by cuid
router.route('/techlist/:cuid').delete(TechListController.deletePost);

// Edit a post by cuid
router.route('/techlist/:cuid').patch(TechListController.deletePost);

export default router;
