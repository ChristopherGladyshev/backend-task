import mongoose from 'mongoose';
import express from "express";
import bodyParser from 'body-parser';

import TaskController from './controllers/TaskController';
const Task = new TaskController();

const app = express();
mongoose.connect('mongodb://localhost:27017/todo-list');

app.use(bodyParser.urlencoded({
    extended: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}));
app.use(bodyParser.json());

app.get('/tasks', Post.index);
app.post('/tasks', Post.create);
app.get('/tasks/:id', Post.read);
app.delete('/tasks/:id', Post.delete);
app.put('/tasks/:id', Post.update);

app.listen(3000, () => {
    console.log(`server started !`)
});