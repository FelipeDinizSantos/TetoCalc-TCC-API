import 'express-async-errors';
import express from 'express';
import { routes } from './routes';

import { errorMiddleware } from './middlewares/errorMiddleware';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

const createApp = () => {
    const app = express();

    app.use(helmet()); 
    app.use(express.json());

    app.use('/api', routes);

    app.use(errorMiddleware);

    return app;
};

const startServer = () => {
    const app = createApp();
    const PORT = process.env.PORT | 8000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
