import React, { useState } from 'react';
import axios from 'axios';

export default function NewUserStoryForm(props) {
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ dashboardID, setDashboardID ] = useState(props.match.params.id)
    if (formSubmitted) {
        return <h1>Your user story has been posted!</h1>
    } else {
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
                        creator: creator.value,
                        status: status.value
                    });
                } catch (error) {
                    console.log(error);
                }
                nameOfStory.value = '';
                storyPoints.value = '';
                storyDescription.value = '';
                creator.value = '';
                status.value = '';
                setFormSubmitted(true);
            }}>
                <div className="form-group">
                    <label>Poster Name</label>
                    <br />
                    <input ref={(posterName) => {
                        creator = posterName
                    }} required autoFocus={true}
                    />
                    <br />
                </div>
                <br />
                <div className="form-group">
                    <label>Story Name</label>
                    <br />
                    <input ref={(storyName) => {
                        nameOfStory = storyName
                    }} required autoFocus={true} />
                </div>
                <br />
                <div className="form-group">
                    <label>Story Points</label>
                    <br />
                    <input type="number" ref={(points) => {
                        storyPoints = points
                    }} required autoFocus={true} />
                </div>
                <br />
                <div className="form-group">
                    <label>Description</label>
                    <br />
                    <input ref={(description) => {
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

