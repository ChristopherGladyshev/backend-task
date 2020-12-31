import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema(
    {
    username: String,
    email: String,
    text: String,
    status: String,
    },
    {
        timestamps: true,
    },  
);

const Task = mongoose.model('task', TaskSchema);

export default Task;