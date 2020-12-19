import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function NewUserStoryForm(props) {
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ dashboardID, setDashboardID ] = useState(props.match.params.id);
    const [ userCanPost, setUserCanPost ] = useState(true);

    useEffect(() => {
        async function checkUser(){
            const uid = firebase.auth().currentUser.uid;
            const { data } = await axios.get(`/dashboard/${props.match.params.id}`);
            if (!data.users.includes(uid)){
                setUserCanPost(false);
            }
        }
        checkUser();
    }, [props.match.params.id]);

    if (formSubmitted) {
        return <Redirect to={`/dashboards/${dashboardID}`} />
    } 
    else if(!userCanPost){
        return <h1>You must join the dashboard to post a user story!</h1>
    }
    else {
        let nameOfStory, storyPoints, storyDescription, creator, status;
        return (
            <form className="form" onSubmit={ async (e) => {
                e.preventDefault();
                try {
                    await axios.post('/userstory', {
                        dashboardId: dashboardID,
                        storyName: nameOfStory.value,
                        storyPoints: storyPoints.value,
                        description: storyDescription.value,
                        creator: firebase.auth().currentUser.displayName,
                        status: status.value
                    });
                } catch (error) {
                    console.log(error);
                }
                nameOfStory.value = '';
                storyPoints.value = '';
                storyDescription.value = '';
                status.value = '';
                setFormSubmitted(true);
            }}>
                <div className="form-group">
                    <label for="input1">Story Name</label>
                    <br />
                    <input id="input1" ref={(storyName) => {
                        nameOfStory = storyName
                    }} required autoFocus={true} />
                </div>
                <br />
                <div className="form-group">
                    <label for="input2">Story Points</label>
                    <br />
                    <input id="input2" type="number" ref={(points) => {
                        storyPoints = points
                    }} required autoFocus={true} />
                </div>
                <br />
                <div className="form-group">
                    <label for="input3">Description</label>
                    <br />
                    <input id="input3" ref={(description) => {
                        storyDescription = description
                    }} required autoFocus={true}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Status</label>
                    <br />
                    <select ref = {(userStoryStatus) => status = userStoryStatus}>
                        <option value="backlog">Backlog</option>
                        <option value="todo">To-Do</option>
                        <option value="inProgress">In-Progress</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>
                <br />
                <button className='button add-button' type='submit'>Post</button>
            </form>
        );
    }
}

