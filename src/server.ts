import 'express-async-errors';
import express from 'express';
import { routes } from './routes';

import { errorMiddleware } from './middlewares/errorMiddleware';
import helmet from 'helmet';
import cors from 'cors';

const createApp = () => {
    const app = express();

    app.use(helmet()); 
    app.use(cors());
    app.use(express.json());

    app.use('/api', routes);

    app.use(errorMiddleware);

    return app;
};

const startServer = () => {
    const app = createApp();
    const PORT = 8000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
