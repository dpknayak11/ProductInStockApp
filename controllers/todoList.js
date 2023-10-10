// Import the User model
const TodoList = require('../model/todoList')
const SaveData = require('../model/save-data');
const sequelize = require("../conections/database");

exports.getTodoList = async (req, res, next) => {
    try {
        const todoLists = await TodoList.findAll();
        const saveDatas = await SaveData.findAll();
        res.render('todoList', {
            todoLists: todoLists,
            saveDatas: saveDatas,
            pageTitle: 'All todoList List',
            path: '/',
            isEdit: '',
        });
    } catch (err) { console.log(err) }
};

exports.postTodoList = async (req, res, next) => {
    const bodyData = req.body;
    const { name, description } = bodyData;
    try {
        await TodoList.create({ name: name, description: description })
        await res.redirect('/');
    } catch (err) { console.log(err) }
};

exports.editTodoList =async (req, res, next) => {
    try{const isEditMode = req.query.isEditing;
    const todoListId = req.params.todoListId;
    const saveDatas = await SaveData.findAll();
    TodoList.findAll({ where: { id: todoListId } })
        .then(todoListData => {
            const todoList = todoListData[0];
            res.render('edit-todoList', {
                pageTitle: 'Editing todoList',
                path: '',
                isEdit: isEditMode,
                todoLists: todoList,
                saveDatas:saveDatas,
            })
        })
    }catch(err){console.log(err)}
}

exports.updateTodoList = (req, res, next) => {
    const bodyData = req.body
    const { todoListId, name, description } = bodyData;
    TodoList.findByPk(todoListId)
        .then(todoList => {
            todoList.name = name;
            todoList.description = description;
            return todoList.save();
        }).then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.deleteTodoList = (req, res, next) => {
    const todoListId = req.body.todoListId;
    TodoList.findByPk(todoListId)
        .then(todoList => {
            return todoList.destroy();
        }).then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err))
}

exports.saveData = async (req, res, next) => {
    const todoListId = req.body.todoListId;
 console.log(todoListId)
    try {
        const sourceTable = await TodoList.findOne({ where: { id: todoListId } })
        await SaveData.create({ name: sourceTable.name, description: sourceTable.description });
        await TodoList.destroy({ where: { id: todoListId } })
        res.redirect('/')
    } catch (err) { console.log(err) }
}
exports.deleteSaveData = async (req, res, next) => {
    try {
        await SaveData.drop();
        await sequelize.sync().catch((err) => console.log(err));
        await res.redirect("/");
    } catch (err) { console.log(err) }
}