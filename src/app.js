import express from 'express'
import usersRouter from './routes/users.routes.js';
import postsRouter from './routes/posts.routes.js';
import authRouter from './routes/auth.routes.js';
import router from './routes/routes.js';

const app = express();

app.use(express.json());

app.use(router);
app.use(authRouter);
app.use(usersRouter);
app.use(postsRouter);

export default app;