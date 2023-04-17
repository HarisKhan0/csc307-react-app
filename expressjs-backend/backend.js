const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

const users = 
{ 
users_list :
    [
        { 
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123', 
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222', 
            name: 'Mac',
            job: 'Professor',
        }, 
        {
            id: 'yat999', 
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555', 
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
} 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}


app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
    users['users_list'].push(userToAdd);
    res.status(201).send(userToAdd).end();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
        res.status(204).end();
    }
})

app.get('/users/:name/:job', (req, res) => {
    const name = req.params.name;
    const job = req.params.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameNJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByNameNJob = (name, job) => { 
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job); 
}