import PostModel from '../modules/Task';
import Task from '../modules/Task';
import UserModel from '../modules/User';
import User from '../modules/User';

const validMail = () => {
    return new RegExp(/^[\w-\.\d*]+@[\w\d]+(\.\w{2,4})$/)
};

let token = '2322ffww3332dfwe3234';


class TaskController {
    index(req, res) {
        console.log('data request');
        if (req.query.developer) {
            Task.find().then((tasks, err) => {
                if (tasks) {
                    res.send({
                        status: "ok",
                        message: {
                            tasks: tasks,
                            total_task_count: tasks.length,
                        },
                    });
                }
                res.json(err);
            });
        }else{
            res.send({
                status: `error`,
                message: `invalid request, you may have forgotten the /?developer=name/ parameter`
            })
        }
    }
    create(req, res) {

        const data = req.body;
        if (validMail().test(data.email) && data.username.length >= 3 && data.text) {

            const task = new PostModel({
                username: data.username,
                email: data.email,
                text: data.text,
                status: data.status
            });

            task.save().then(() => {
                res.send({
                    status: `ok`,
                    message: data,
                });
            });
        } else {
            res.send({
                status: `error`,
                message: {
                    "username": "Поле является обязательным для заполнения",
                    "email": "Неверный email",
                    "text": "Поле является обязательным для заполнения"
                }
            });
        }
    }

    createAdmin(req, res) {

        const data = req.body;

        const user = new UserModel({
            username: data.username,
            password: data.password,
        });
        user.save().then(() => {
            res.send({
                status: `ok`,
                message: token,
            });
        });
    }

    login(req, res) {
        const data = req.body;

        User.find().then((users, err) => {
            console.log('logging');
            if (data.username === users[0].username && data.password === users[0].password) {
                setTimeout(() => {
                    token = false;
                }, 8.64e+7);
                res.send({
                    token: token,
                })
            } else {
                res.send({
                    status: `error`,
                    message: {
                        username: "Поле является обязательным для заполнения",
                        password: "Неверный логин или пароль"
                    }
                });
            }

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