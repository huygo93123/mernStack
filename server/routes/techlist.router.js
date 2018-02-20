import { Router } from 'express';
import * as TechListController from '../controllers/techlist.controller';
const router = new Router();

// Get all Posts
router.route('/techlist').get(TechListController.getTechs);

// Get one post by cuid
router.route('/techlist/:cuid').get(TechListController.getTech);

// Add a new Post
router.route('/techlist').post(TechListController.addTech);

// Delete a post by cuid
router.route('/techlist/:cuid').delete(TechListController.deleteTech);

// Edit a post by cuid
router.route('/techlist').put(TechListController.updateTech);

export default router;
