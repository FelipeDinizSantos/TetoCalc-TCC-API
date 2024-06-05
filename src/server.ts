import 'express-async-errors';
import express from 'express';
import { routes } from './routes';

import { errorMiddleware } from './middlewares/errorMiddleware';
import helmet from 'helmet';
import cors from 'cors';
import { server } from './configs/server';

const createApp = () => {
    const app = express();

    app.use(helmet()); 
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (server.allowedDomains.indexOf(origin) !== -1) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS!'));
            }
          }
    }))
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