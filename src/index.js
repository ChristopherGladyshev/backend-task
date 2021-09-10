import mongoose from 'mongoose';
import express from "express";
const bodyParser = require("body-parser");
import cors from 'cors';

import TaskController from './controllers/TaskController';
const Task = new TaskController();

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/task', {
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

app.get('/api/tasks', Task.index);
app.post('/api/task', Task.create);
app.post('/api/login', Task.login);
app.post('/api/createlogin', Task.createAdmin);
app.get('/api/task/:id', Task.read);
app.delete('/api/task/:id', Task.delete);
app.put('/api/task/:id', Task.update);

app.listen(8000, () => {
    console.log(`SERVER STARTED! port:8000`);
});