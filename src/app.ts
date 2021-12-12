import express from 'express';
require('dotenv').config();

const app = express();

app.get('/', (req, res: express.Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(process.env.PORT, () => {
  console.log(`Starting app at: ${process.env.PORT}`)
});