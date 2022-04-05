import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import videoGameRoutes from './routes/videogame';
import userRoutes from './routes/storeuser';
import orderRoutes from './routes/order';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

videoGameRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
