import { Router } from "express";
import auth from "../middlewares/auth.js";
import authRole from "../middlewares/role.js";
import Roles from "../helpers/roles.js";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";
import { createReview, getReviews } from "../controllers/review.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = Router()

router.get('/posts', getPosts);
router.get('/posts/:id', auth, authRole([Roles.admin, Roles.writer, Roles.editor]), getPost);
router.post('/posts', auth, authRole([Roles.admin, Roles.writer]), createPost);
router.put('/posts/:id', auth, authRole([Roles.admin, Roles.editor]), updatePost);
router.delete('/posts/:id', auth, authRole([Roles.admin, Roles.writer]), deletePost);

router.get('/posts/:id/reviews', getReviews);
router.post('/posts/:id/reviews', isAuth, createReview);


export default router;