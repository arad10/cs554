const mongoCollections = require("../config/mongoCollections");
const userStories = mongoCollections.userStories;
const dashboards = mongoCollections.dashboards;
const dashboardAPI = require('./dashboard');
const { ObjectId } = require("mongodb");

module.exports = {
    async addUserStory(dashboardId, storyName, storyPoints, description, creator, status){
        if (!dashboardId || typeof dashboardId !== 'string') throw 'Error: dashboardId not supplied or is not a string.';
        if (!storyName || typeof storyName !== 'string') throw 'Error: storyName not supplied or is not a string.';
        if (!storyPoints || typeof storyPoints !== 'number') throw 'Error: storyPoints not supplied or is not a number.';
        if (!description || typeof description !== 'string') throw 'Error: description not supplied or is not a string.';
        if (!creator || typeof creator !== 'string') throw 'Error: creator id not supplied or is not a string.';
        if (!status || typeof status !== 'string') throw 'Error: status not supplied or is not a string.';

        const userStoriesCollection = await userStories();
        const dashboardsCollection = await dashboards();
       
        let userStory = {
            dashboardId: dashboardId,
            storyName: storyName,
            storyPoints: storyPoints,
            description: description,
            creator: creator,
            status: status
        };

        const insertUserStory = await userStoriesCollection.insertOne(userStory);
        if (insertUserStory.insertedCount === 0) throw 'Error: Could not add user story.';

        const id = insertUserStory.insertedId;

        /* Adding to dashboard userStories list */
        const dashboard = await dashboardAPI.getDashboard(dashboardId);
        dashboard.userStories[status].push(id.toString());
        const updatedInfo = await dashboardsCollection.updateOne({_id: dashboard._id}, {$set: dashboard});
        if (updatedInfo.modifiedCount === 0) {
            throw 'Error: could not update dashboard successfully.';
        }

        const insertedUserStory = await this.getUserStory(id);

        return insertedUserStory;
    },

    async getUserStory(id){
        if (!id) throw 'Error: id must be provided.';
        if (typeof id !== 'string' && !ObjectId.isValid(id)) throw 'Error: id must be a string or object id.';
        if (typeof id === 'string') {
            id = ObjectId.createFromHexString(id);
        }

        const userStoriesCollection = await userStories();

        const userStory = await userStoriesCollection.findOne({_id: id })
        if (userStory === null) throw 'Error: No user story has the supplied id.';

        return userStory;
    },

    async updateUserStory(userStoryId, updatedUserStory){
        if (!userStoryId) throw 'Error: userStoryId not supplied.';
        if (!updatedUserStory) throw "Error: updatedUserStory not supplied.";
        if (typeof userStoryId !== 'string' && !ObjectId.isValid(userStoryId)) throw 'Error: userStoryId must be a string or object id.';
        if (typeof userStoryId === 'string') {
            userStoryId = ObjectId.createFromHexString(userStoryId);
        }
        if (Object.prototype.toString.call(updatedUserStory) !== '[object Object]') throw 'Error: updatedUserStory must be an object.';

        const userStoriesCollection = await userStories();

        const currentUserStory = await this.getUserStory(userStoryId);

        if (updatedUserStory.storyName){
            if (typeof updatedUserStory.storyName !== 'string') throw 'Error: user story name must be a string.';
            currentUserStory.storyName = updatedUserStory.storyName;
        }
      
        if (updatedUserStory.storyPoints){
            if (typeof updatedUserStory.storyPoints !== 'number') throw 'Error: user story points must be a number.';
            currentUserStory.storyPoints = updatedUserStory.storyPoints;
        }

        if (updatedUserStory.description){
            if (typeof updatedUserStory.description !== 'string') throw 'Error: user story description must be a string.';
            currentUserStory.description = updatedUserStory.description;
        }

        if (updatedUserStory.status){
            if (typeof updatedUserStory.status !== 'string') throw 'Error: user story status must be a string.';
            currentUserStory.status = updatedUserStory.status;
        }

        const updatedUserStoryInfo = await userStoriesCollection.updateOne({_id: userStoryId}, {$set: currentUserStory});
        if (updatedUserStoryInfo.modifiedCount === 0) {
            throw 'Error: could not update user story successfully.';
        }

        return await this.getUserStory(userStoryId);
    },

    async deleteUserStory(id){
        if (!id) throw 'Error: id must be provided,';
        if (typeof id !== 'string' && !ObjectId.isValid(id)) throw 'Error: id must be a string or object id.';
        if (typeof id === 'string') {
            id = ObjectId.createFromHexString(id);
        }

        const userStoriesCollection = await userStories();
        const dashboardsCollection = await dashboards();
        
        const deletedUserStory = await this.getUserStory(id);

        const deletionInfo = await userStoriesCollection.deleteOne({_id: id});
        if (deletionInfo.deletedCount === 0) {
            throw "Error: could not delete user story.";
        }

        /* Removing it from the dashboard userStories list */
        const dashboard = await dashboardAPI.getDashboard(deletedUserStory.dashboardId);
        let storyList = dashboard.userStories[deletedUserStory.status];
        const index = storyList.indexOf(id.toString());
        storyList.splice(index, 1);
        dashboard.userStories[deletedUserStory.status] = storyList;
        const updatedInfo = await dashboardsCollection.updateOne({_id: dashboard._id}, {$set: dashboard});
        if (updatedInfo.modifiedCount === 0) {
            throw 'Error: could not update dashboard successfully.';
        }

        return deletedUserStory;
    }
}