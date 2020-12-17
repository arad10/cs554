const mongoCollections = require("../config/mongoCollections");
const dashboards = mongoCollections.dashboards;
const { ObjectId } = require("mongodb");
const { dashboard } = require(".");

async function getAllDashboards() {
    const dashboardCollection = await dashboards();
    const dashboardAll = await dashboardCollection.find({}).toArray();
    return dashboardAll;
    
}
async function getDashboard(id) {
    console.log(id);
    if (!id || typeof id !== "string") throw "ERROR: Dashboard ID not provided or is not of type string";
    if (!ObjectId.isValid(id))
        throw "ERROR: Dashboard ID is not valid. Please pass in a single string of 12 bytes or 24 hex characters";
    const dashboardCollection = await dashboards();
    const dashboardObjectId = ObjectId.createFromHexString(id);
    const dashboard = await dashboardCollection.findOne({ _id: dashboardObjectId });
    if (dashboard === null) throw "ERROR: Could not find dashboard with that ID";
    return dashboard;
}

async function addDashboard(name, description, date, creatorID) {
    if (!name || typeof name !== "string")
        throw "ERROR: Dashboard Name does not exist or is not of type string";
    if (!description || typeof description !== "string")
        throw "ERROR: Dashboard Description does not exist or is not of type string";
    if (!date || typeof date !== "string")
        throw "ERROR: Dashboard Date does not exist or is not of type string";
    if (!creatorID || typeof creatorID !== "string")
        throw "ERROR: Creator ID does not exist or is not of type string";
    const dashboardCollection = await dashboards();
    const newDashboard = {
        name: name,
        description: description,
        postedDate: date,
        creator: creatorID,
        users: [creatorID],
        userStories: {
            backlog: [],
            todo: [],
            inProgress: [],
            complete: []
        },
        chatHistory: []
    };
    const insertDashboard = await dashboardCollection.insertOne(newDashboard);
    if (insertDashboard.insertedCount === 0)
        throw "ERROR: Could not create the dashboard.";
    const newDashboardID = insertDashboard.insertedId;
     //add new dashboard id to user dashboard array
    const users = mongoCollections.users;
    const userAPI = require('./user');
    const usersCollection = await users();
    const updateUserInfo = await usersCollection.updateOne({_id: creatorID}, {$push: {'dashboards':newDashboardID}});
    if(updateUserInfo.modifiedCount===0) throw 'Error: could not update user sucessfully'
    return await getDashboard(newDashboardID.toString());
}

async function updateDashboard(dashboardID, origin, originList, destination, destinationList) {
    if (!dashboardID || typeof dashboardID !== "string")
        throw "ERROR: Dashboard ID does not exist or is not of type string";
    if (!origin || typeof origin !== "string")
        throw "ERROR: Origin does not exist or is not of type string";
    if (!originList || !Array.isArray(originList))
        throw "ERROR: Origin List does not exist or is not of type array";
    if (!destination || typeof destination !== "string")
        throw "ERROR: Destination does not exist or is not of type string";
    if (!destinationList || !Array.isArray(destinationList))
        throw "ERROR: Destination List does not exist or is not of type string";
    const dashboardCollection = await dashboards();
    const dashboard = await getDashboard(dashboardID);
    dashboard.userStories[origin] = originList;
    dashboard.userStories[destination] = destinationList;
    const updateDashboardInfo = await dashboardCollection.updateOne( 
        { _id: dashboard._id },
        { $set: dashboard } 
    );
    if (updateDashboardInfo.modifiedCount === 0)
        throw "ERROR: Could not update dashboard";
    return await getDashboard(dashboardID);
}

async function addChatMessage(dashboardID, message){
    console.log(message);
    if(!dashboardID || typeof dashboardID !== "string"){
        throw "ERROR: Dashboard ID does not exist or is not of type string";
    }
    else if(!message || typeof message !== "object"){
        throw "ERROR: Message does not exist or is not of type object";;
    }
    else if(!message.username || typeof message.username !== "string"){
        throw "ERROR: Message doesn't contain a username or is not of type string";
    }
    else if(message.msg === undefined || message.msg === null || typeof message.msg !== "string"){
        throw "ERROR: Message doesn't contain the message or is not of type string";
    }
    const dashboardCollection = await dashboards();
    let dashboard = await getDashboard(dashboardID);
    let messages = dashboard.chatHistory;
    messages.push(message);
    dashboard.chatHistory = messages;
    const addedChatInfo = await dashboardCollection.updateOne({_id: dashboard._id}, {$set: dashboard});
    if(addedChatInfo.modifiedCount === 0){
        throw "ERROR: Could not add chat message to history";
    }
    return message; //dont really need the return
}

module.exports = {
    getDashboard,
    addDashboard,
    updateDashboard,
    addChatMessage,
    getAllDashboards
};