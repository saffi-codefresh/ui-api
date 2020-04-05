const {getDb, dbFind, dbStore, dbRemove} = require('./db');
const _ = require('lodash');

const members = [
    {
        id: 1,
        name : 'one',
        email: 'one@o.io',
        status: 'happy'
    },
    {
        id: 2,
        name : 'two',
        email: 'two@o.io',
        status: 'sad'
    },{
        id: 3,
        name : 'three',
        email: 'three@o.io',
        status: 'happy'
    },
];
while (members.length){ members.pop();}
const getMembers = async () => await dbFind('members', {} )
const getMember = async (id) => await dbFind('members', {_id:id} )
const removeMember = async (id) => await dbRemove('members', {_id:id} )
const setMembers = async (members)=> {
    let alreadyIn = await dbFind('members', {});
    let saved = await dbStore('members', members);
    let ids = _.map(alreadyIn, it=>it.id);
    // remove all missing
    return saved;
};

getMembers().then( found => {
    members.push(...found);
    console.log(`loaded members ${members}`)
})

module.exports = { setMembers:setMembers, getMembers:getMembers, getMember:getMember, removeMember:removeMember};
