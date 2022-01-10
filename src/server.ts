import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {apiDocumentation} from './docs/api.docs.js';
import * as dotenv from 'dotenv';
import { CustomersRoute } from './routes/routes.customers.js';

dotenv.config();
const app = express();
// configure all middelwares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// getting ip purpouse
app.set('trust proxy', true);
app.set('PORT', process.env.PORT || 3000);
// setting documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// setting routes
CustomersRoute(app);

// * Export modules
export const App = app;