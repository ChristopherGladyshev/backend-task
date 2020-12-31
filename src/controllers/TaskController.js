import PostModel from '../modules/Task';
import Task from '../modules/Task';


class TaskController {
    index(req, res) {
        Task.find().then((err, tasks) => {
            if (err) {
                res.send(err);
            }

            res.json(tasks);
        });
    }
    create(req, res) {

        const data = req.body;

        const task = new PostModel({
            username: data.username,
            email: data.email,
            text: data.text,
            status: data.status
        });

        task.save().then(() => {
            res.send({
                status: `ok`
            });
        });
    }
    read(req, res) {
        PostModel.findOne({
            _id: req.params.id
        }).then(task => {
            if (!task) {
                res.send({
                    error: `not found`
                });
            } else {
                res.json(task);
            }
        })
    }
    update(req, res) {

        PostModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({
                status: `updated`
            });
        });
    }
    delete(req, res) {
        PostModel.deleteOne({
            _id: req.params.id
        }).then((task) => {
            if (task) {
                res.json({
                    status: `delete`
                });
            } else {
                res.json({
                    status: `error`
                });
            }
        });
    }
}

export default TaskController;