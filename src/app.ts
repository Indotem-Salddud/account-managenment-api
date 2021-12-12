import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// getting ip purpouse
app.set("trust proxy", true); 
app.set("PORT", process.env.PORT || 3000);

app.listen(app.get("PORT"), () => {
console.log(`Starting app at: ${app.get("PORT")}`)
});