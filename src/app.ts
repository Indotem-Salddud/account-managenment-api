import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {apiDocumentation} from './docs/api.docs.js';
import * as dotenv from 'dotenv';
import { AccountsRoute } from './routes/routes.accounts.js';
import { Debugger } from './http/common/Debug/Debugger.js';

dotenv.config();
const app = express();
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
AccountsRoute(app);

app.listen(app.get('PORT'), () => {
  Debugger.shared._printLog(Environment, DebuggerTypes.debug, `Starting app at: ${app.get('PORT')}`);
});
