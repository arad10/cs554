import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Chat from './Chat';
import NotFound from './NotFound';
import CantViewDashboard from './CantViewDashboard';
import firebase from "firebase/app"
const status = {
  'backlog': 'Backlog',
  'todo': 'To-Do',
  'inProgress': 'In-Progress',
  'complete': 'Complete'
};

export default function Dashboard(props) {
  const [ userStories, setUserStories ] = useState({});
  const [ dashboardInfo, setDashboardInfo ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const [ redirect, setRedirect ] = useState(false);
  const [ userCanView, setUserCanView ] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try{
        const { data } = await axios.get(`/dashboard/${props.match.params.id}`);

        if(true){
          let uid = firebase.auth().currentUser.uid;
          const { data } = await axios.get(`/user/${uid}`);
          if(!data.dashboards.includes(props.match.params.id)){
            setUserCanView(false);
          }
        }

        setDashboardInfo({
          _id: data._id,
          name: data.name,
          date: data.date,
          creator: data.creator,
          description: data.description,
          chatHistory: data.chatHistory
        });
        let currUserStories = data.userStories;
        let allDetailsOfUserStories = await Promise.all(Object.entries(currUserStories).map(async ([column, userStoryIDs]) => {
          return Promise.all(userStoryIDs.map(async (userStoryID) => {
            const {data} = await axios.get(`/userstory/${userStoryID}`);
            return data;
          }));
        }));
        let userStoriesMap = {};
        userStoriesMap['backlog'] = allDetailsOfUserStories[0];
        userStoriesMap['todo'] = allDetailsOfUserStories[1];
        userStoriesMap['inProgress'] = allDetailsOfUserStories[2];
        userStoriesMap['complete'] = allDetailsOfUserStories[3]
        setUserStories(userStoriesMap);
        setLoading(false);
      }
      catch(e){
        setRedirect(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    const originColumn = columns[source.droppableId]
    const destinationColumn = columns[destination.droppableId];
    const [ movedUserStory ] = originColumn.splice(source.index, 1);
    movedUserStory.status = destination.droppableId;
    destinationColumn.splice(destination.index, 0, movedUserStory);
    const idsOfOriginColumn = originColumn.map((story) => story._id);
    const idsofDestinationColumn = destinationColumn.map((story) => story._id);
    try {
      await axios.patch(`/userstory/${movedUserStory._id}`, movedUserStory);
      await axios.patch(`/dashboard/${dashboardInfo._id}`, {
        origin: source.droppableId,
        originList: idsOfOriginColumn,
        destination: destination.droppableId,
        destinationList: idsofDestinationColumn
      });
    } catch (e) {
      console.log(e);
    }
    setColumns({
      ...columns,
      [source.droppableId]: originColumn,
      [destination.droppableId]: destinationColumn 
    });
  }

  let name;
  if (firebase.auth().currentUser.displayName){
    name = firebase.auth().currentUser.displayName;
  }
  else{
    name = firebase.auth().currentUser.email;
  }

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  } else {
    if (redirect){
      return (<NotFound />)
    } 
    else if(!userCanView){
      return (<CantViewDashboard />)
    }
    else{
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
          <DragDropContext onDragEnd={async (result) => await onDragEnd(result, userStories, setUserStories)}>
            {Object.entries(userStories).map(([column, userStoryDetails]) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <h1>{status[column]}</h1>
                  <Droppable key={column} droppableId={column}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? '#e6ffff' : '#006666',
                            padding: 4,
                            width: 250,
                            minHeight: '50px',
                            margin: 5,
                            flexWrap: 'wrap',
                            border: '2px dotted white'
                          }}
                        >
                          {userStoryDetails.map((userStory, index) => {
                            return (
                              <Draggable key={userStory._id} draggableId={userStory._id} index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <div 
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging ? '#6c7d7a' : '#c6e7e3',
                                        color: snapshot.isDragging ? 'white' : 'black', 
                                        wordWrap: 'break-word',
                                        borderRadius: '25px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <h2>{userStory.storyName}</h2> <br />
                                      <p>{userStory.description}</p> <br />
                                      <div
                                      style={{
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                      }}
                                      >
                                        <div>Created By: {userStory.creator} </div>
                                        <div>Story Points: {userStory.storyPoints}</div>
                                      </div>
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              )
            })}
          </DragDropContext>          
        </div>
        <div className="link-dashboard">
          <Link className="link-button" to={`/dashboards/${dashboardInfo._id}/newuserstory`}>
              <span>Post a New User Story</span>
          </Link>
        </div>
        <div className="link-dashboard">
          <Link className="link-button" to={`/videochat/${dashboardInfo._id}`}>
              <span>Video Chat</span>
          </Link>
        </div>
        <Chat dashID={dashboardInfo._id} username={name} chatHistory={dashboardInfo.chatHistory}></Chat>
      </div>
    )
    }
  }
}