var dashboard = require('../data/dashboard');
var user = require('../data/user')
const dbConnection = require("../config/mongoConnection");

const main = async () =>{
  console.log("-------START SEED SCRIPT-------")
  const db = await dbConnection(); 
  await db.dropDatabase(); 

  console.log(":::Adding User:::\n");
  
  var name = "JohnDoe"
  var userAdded = await user.addUser(name)
  console.log(userAdded)

  console.log(":::Adding Projects:::\n");

  var name = "Front End Team Dashboard" 
  var description = "Front End task will be displayed here"
  var date = "12/12/2020"
  var creatorID = "1"
  
  var projectAdded = await dashboard.addDashboard(name, description, date, creatorID)
  console.log(projectAdded)

  var name = "Back End Team Dashboard" 
  var description = "Back End task will be displayed here"
  var date = "12/12/2020"
  var creatorID = "2"
  
  var projectAdded = await dashboard.addDashboard(name, description, date, creatorID)
  console.log(projectAdded)

  var name = "UX Design Team Dashboard" 
  var description = "UX task will be displayed here"
  var date = "12/12/2020"
  var creatorID = "3"
  
  var projectAdded = await dashboard.addDashboard(name, description, date, creatorID)
  console.log(projectAdded)

    var name = "QA Team Dashboard" 
  var description = "QA task will be displayed here"
  var date = "12/12/2020"
  var creatorID = "4"
  
  var projectAdded = await dashboard.addDashboard(name, description, date, creatorID)
  console.log(projectAdded)

  console.log("-------END SEED SCRIPT-------\n")
}
main().catch((err) => { 
    console.log(err); 
})