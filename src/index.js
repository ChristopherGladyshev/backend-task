import mongoose from 'mongoose';
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

import TaskController from './controllers/TaskController';
const Task = new TaskController();

const app = express();
mongoose.connect('mongodb://localhost:27017/task', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use( bodyParser.urlencoded({
    extended: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}));
app.use(bodyParser.json());

app.use(cors());
app.use('/todo', express.static(__dirname + '/build'));

app.get('/', Task.static);
app.get('/tasks', Task.index);
app.post('/task', Task.create);
app.post('/login', Task.login);
app.post('/createlogin', Task.createAdmin);
app.get('/task/:id', Task.read);
app.delete('/task/:id', Task.delete);
app.put('/task/:id', Task.update);

app.listen(80, () => {
    console.log(`SERVER STARTED! port:80`);
});