db = db.getSiblingDB('myappdb')
db.dummycollection.insert({"dummy":(new Date()).toISOString()});

db.createUser(
    {
        user:"mongo",
        pwd:"mongo",
        roles:[
            { role:"readWrite",
                db:"myappdb"
            }
        ]
    });

db.createUser(
    {
        user:"a",
        pwd:"a",
        roles:[
            { role:"readWrite",
                db:"myappdb"
            }
        ]
    });

db.createCollection('members');


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


db.createCollection('members');
db.members.insert(members);


const tasks = [

    {"id":"983e3017-e309-47c7-8165-c6cfbc50e611","name":"abc","desc":"qqq", "done":"false"}

];


db.createCollection('tasks');
db.tasks.insert(tasks);
