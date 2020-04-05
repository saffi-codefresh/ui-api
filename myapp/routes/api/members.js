const express = require('express');
const router = express.Router();
const Members = require('../../Members');
const uuid = require('uuid');

// Get all members
router.get('/', (req, res) =>
     Members.getMembers().then(m=> res.json(m)));
// get single member
router.get('/:id', (req, res) =>
    Members.getMember(req.params.id)
        .then(found => {
    console.log(`${found.toString()}`);
    if (found.length) {
        res.json(found[0]);
    } else {
        res.status = 400;
        res.json({error: true, msg: `Not found - requested ${JSON.stringify(req.params)}`})
    }
}));


// New Member
router.post('/', (req, res) => {
        //console.log(`got ${JSON.stringify(req.body)}`);
        const userData = req.body;

        const newmember = {
            id: uuid.v4(),
            name: userData.name,
            email: userData.email,
            status: 'happy' //userData.status
        };
        if (!newmember.name || !newmember.status) {
            return res.status(400).json({error: true, msg: `empty field name or email ${userData}`})
        }

        Promise.all(Members.setMembers([newmember]),
            Members.getMembers().then((m)=> res.json(m)));
        //res.redirect("/")
    }
);

// Update Member
router.put('/:id', (req, res) => {
    const updateData = req.body;
    Members.getMember(req.params.id)
        .then(found => {
            console.log(`${found.toString()}`)
            if (!found.length) {
                res.status = 400;
                return res.json({error: true, msg: `Not found - reqested ${req.params.id}`})
            }


            found.name = updateData.name ? updateData.name : found.name;
            found.email = updateData.email ? updateData.email : found.email;
            res.json({updatedMember: found[0]});
            Members.setMember(found).then(x=>{});
        });

});

// delete Member
router.delete('/:id', (req, res) => {
    const updateData = res.body;
    const id = req.params.id;
    const found = members.filter(m => m.id === parseInt(id));
    if (!found.length) {
        res.status = 400;
        return res.json({error: true, msg: `Not found - reqested ${id}`})
    }
    updatedMembers = members.filter(m => '' + m.id !== id)

    res.json({
        msg: 'member delete',
        members: updatedMembers
    });

});

module.exports = router
