const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const dashboards = mongoCollections.dashboards;
const dashboardAPI = require('./dashboard');
const { ObjectId } = require("mongodb");

module.exports = {
    /* Will eventually need an id parameter that is supplied by Firebase */
    async addUser(name){
        if (!name) throw 'Error: name not supplied.';
        if (typeof name !== 'string') throw 'Error: name must be a string.';

        const usersCollection = await users();
       
        let user = {
            name: name,
            dashboards: []
        };

        const insertUser = await usersCollection.insertOne(user);
        if (insertUser.insertedCount === 0) throw 'Error: Could not add user.';

        const id = insertUser.insertedId;
        const insertedUser = await this.getUser(id);

        return insertedUser;
    },

    async getUser(id){
        if (!id) throw 'Error: id must be provided.';
        if (typeof id !== 'string' && !ObjectId.isValid(id)) throw 'Error: id must be a string or object id.';
        if (typeof id === 'string') {
            id = ObjectId.createFromHexString(id);
        }

        const usersCollection = await users();

        const user = await usersCollection.findOne({_id: id })
        if (user === null) throw 'Error: No user has the supplied id.';

        return user;
    },

    async updateUser(userId, updatedUser){
        if (!userId) throw 'Error: userId not supplied.';
        if (!updatedUser) throw "Error: updatedUser not supplied.";
        if (typeof userId !== 'string' && !ObjectId.isValid(userId)) throw 'Error: userId must be a string or object id.';
        if (typeof userId === 'string') {
            userId = ObjectId.createFromHexString(userId);
        }
        if (Object.prototype.toString.call(updatedUser) !== '[object Object]') throw 'Error: updatedUser must be an object.';

        const usersCollection = await users();
        const dashboardsCollection = await dashboards();

        const currentUser = await this.getUser(userId);

        if (updatedUser.name){
            if (typeof updatedUser.name !== 'string') throw 'Error: name must be a string.';
            currentUser.name = updatedUser.name;
        }
      
        /* Adds a single dashboard, can take either an array with the dashboard id or just the id itself */
        if (updatedUser.dashboards){
            if (!Array.isArray(updatedUser.dashboards) && typeof updatedUser.dashboards !== 'string'){
                throw "Error: dashboards must be an array or a string";
            }

            let dashboard;

            if (Array.isArray(updatedUser.dashboards)){
                if (typeof updatedUser.dashboards[0] !== 'string'){
                    throw "Error: dashboard id must be a string";
                }
                dashboard = await dashboardAPI.getDashboard(updatedUser.dashboards[0]); 
            }
            else{
                dashboard = await dashboardAPI.getDashboard(updatedUser.dashboards);
            }

            /* Check if this user is already a part of the dashboard */
            if (dashboard.users.includes(userId.toString())){
                throw "Error: user is already a part of the dashboard!";
            }

            currentUser.dashboards.push(dashboard._id.toString());
           
            /* Adds this user to the users array in the dashboard collection */
            const updatedDashboardInfo = await dashboardsCollection.updateOne({_id: dashboard._id}, {$push: {'users': userId.toString()}});
            if (updatedDashboardInfo.modifiedCount === 0) {
                throw 'Error: could not update dashboard successfully.';
            }
        }

        const updatedUserInfo = await usersCollection.updateOne({_id: userId}, {$set: currentUser});
        if (updatedUserInfo.modifiedCount === 0) {
            throw 'Error: could not update user successfully.';
        }

        return await this.getUser(userId);
    }
}