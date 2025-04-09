import './config.js'
import express from 'express'
import "reflect-metadata";
import dataSource from './db/dataSource.js';
import userRouter from './routes/user.js'
import permissionRouter from './routes/permission.js'
import roleRouter from './routes/role.js'
import eventRouter from './routes/event.js';
import authRouter from './routes/auth.js';
import { authenticate } from './middlewares/auth/authenticate.js';
import cors from 'cors';
import { responseFormatter } from './middlewares/responseFormatter.js';

const app = express()
const PORT = 3000;
app.use(express.json());
app.use(cors());

app.use(responseFormatter);

app.get('/', (req, res) => {
    res.send('Server UP!');
});

app.use('/user', userRouter);
app.use('/permission',authenticate, permissionRouter);
app.use('/role', authenticate,roleRouter);
app.use('/events', eventRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
    res.status(404).send("You requested something I don't have :(");
});

app.listen(PORT, async () => {
    try {
        console.log(`App is running and Listening on port ${PORT}`);
        await dataSource.initialize(); // Inicializa o banco de dados antes de aceitar conexões
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
        process.exit(1); // Encerra o processo em caso de erro
    }
});

process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await dataSource.destroy();
    console.log('Database connection closed.');
    process.exit(0);
});

console.log(new Date())
export default app;

