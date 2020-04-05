const express = require('express');
const router = express.Router();
const tasks = require('../../Tasks');
const uuid = require('uuid');

// Get all members
router.get('/', (req, res) => res.json(tasks));
// get single task
router.get('/:id', (req, res) => {//console.log(req)
    const foundLst = tasks.filter(m => m.id ===req.params.id);
    console.log(`${foundLst.toString()}`)
    if (foundLst.length) {
        res.json(foundLst[0]);
    } else {
        res.status = 400;
        res.json({ error: true, msg: `Not found - requested ${JSON.stringify(req.params)}` })
    }
});


// New Task
router.post('/', (req, res) => {
    console.log(`got ${JSON.stringify(req.body)}`);
    const taskParam = req.body;

    const newtask = {
        id: uuid.v4(),
        name: taskParam.name,
        desc: taskParam.desc,
        done: taskParam.done,
    }
    if (!newtask.name) {
        return res.status(400).json({ error: true, msg: `empty field name or email ${taskParam}` })
    }
    tasks.push(newtask);
    res.json(newtask);
    //res.redirect("/")
} 
);

// Update Task
router.put('/:id', (req, res) => {
    const updatedTask = req.body;
    const foundLst = tasks.filter(m => m.id === req.params.id);
    console.log(`${foundLst.toString()}`)
    if (!foundLst.length) {
        res.status = 400;
        return res.json({ error: true, msg: `Not found - reqested ${req.params.id}` })
    }
    let found = foundLst[0];

    found.name = updatedTask.name ? updatedTask.name : found.name;
    found.desc = updatedTask.desc ? updatedTask.desc : found.desc;
    found.done = typeof (updatedTask.done)=='boolean' ? updatedTask.done : found.done || flase;
    res.json({ found: found });

});

// delete Task
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const found = task.filter(m => m.id === id);
    if (!found.length) {
        res.status = 400;
        return res.json({ error: true, msg: `Not found - reqested ${id}` })
    }
    updatedTask = tasks.filter(m => '' + m.id !== id)

    res.json({
        msg: 'task delete',
        tasks: updatedTask
    });

});

module.exports = router