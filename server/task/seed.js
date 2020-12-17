var dashboard = require('../data/dashboard');
var user = require('../data/user')
var userStory = require('../data/userStory')

const dbConnection = require("../config/mongoConnection");

const main = async () =>{
  console.log("-------START SEED SCRIPT-------")
  const db = await dbConnection(); 
  await db.dropDatabase(); 
  console.log(":::Adding User:::\n");
  var id = "1"
  var name = "JohnDoe123"
  
  var userAdded = await user.addUser(id, name)
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
  var creatorID = "1"
  
  var projectAdded = await dashboard.addDashboard(name, description, date, creatorID)
  console.log(projectAdded)

  var name = "UX Design Team Dashboard" 
  var description = "UX task will be displayed here"
  var date = "12/12/2020"
  var creatorID = "1"
  
  var projectAdded = await dashboard.addDashboard(name, description, date, creatorID)
  console.log(projectAdded)

  var name = "QA Team Dashboard" 
  var description = "QA task will be displayed here"
  var date = "12/12/2020"
  var creatorID = "1"
  
  var projectAdded = await dashboard.addDashboard(name, description, date, creatorID)
  console.log(projectAdded)

  console.log(":::Adding Stories:::\n");
  var dashboards = await dashboard.getAllDashboards()
  var dashboardId = dashboards[0]._id.toString()
  var storyName = "Modal Component"
  var storyPoints = 2
  var storyDescription = "Create a modal component that opens and closes"
  var creator = "John Doe"
  var status = "backlog"

  var storyAdded = await userStory.addUserStory(dashboardId, storyName, storyPoints, storyDescription, creator, status)
  console.log(storyAdded)


  console.log("-------END SEED SCRIPT-------\n")
}
main().catch((err) => { 
    console.log(err); 
})