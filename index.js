// SETUP LOW-DB
const dbPath = './data.json'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(dbPath);
const db = low(adapter);

// this just sets defaults if the file has no contents
// it will NOT overwrite 
db.defaults({ students: [] }).write(); 

let students = "students"
let users = db.get(students)
const [ action = "read", userName, userNameNew ] = process.argv.slice(2)

switch(action) {
    case "read":
        let usersAll = db.get(students)
            .sortBy(["name"])
            .value()
        console.log(usersAll)
        break;
    case "create":
        if(!userName) {
            console.log("Error: Please provide a name to create")
            return
        }
        let userNew = users
            .push({ name: userName})
            .write()
        break;
    case "delete":
        if(!userName) {
            console.log("Error: Please provide a name to delete")
            return
        }
        users
            .remove({name: userName})
            .write()
        break;
    case "update":
        if(!userName || !userNameNew) {
            console.log("Error: Please provide a name and a new name")
        }
        users
            .find({name: userName})
            .assign({name: userNameNew})
            .write()
        break;
    case "search":
        let usersFiltered = users.filter({name: userName}).value()
        console.log(usersFiltered)
        break;
    }
