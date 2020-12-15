import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styled from "styled-components";
import axios from "axios";
import firebase from "firebase/app"

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: "40%"
  }
};

export default function NewDashboard() {
  var subtitle;
  const [modalIsOpen,setIsOpen] = useState(false);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const currentUser = firebase.auth().currentUser

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#00000';
  }

  function closeModal(){
    setIsOpen(false)
  }
    


function handleSubmit(){
const project = {
      name: name,
      description: description,
      date:date,
      creator: currentUser.uid
    };
  alert(`Creating project: ${name}...`)
  axios.post('/dashboard', project)
        .then(res => console.log(res)).catch(error=>console.log(error))
  console.log(project)
  // axios.patch(`/user/${currentUser.uid}`)
}



  return (
    <>
        <button onClick={openModal}>New Project</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>New Project</h2>
            <form onSubmit = {handleSubmit}>
            <label>Project Name:<input type="text" value={name} onChange ={e=>setName(e.target.value)} name="name" required/></label>
            <br></br>
            <label>Description:<input type="text" value={description} onChange ={e=>setDescription(e.target.value)} name="desc"  required /></label>
            <br></br>
            <label>Date:<input type="text" value={date} onChange ={e=>setDate(e.target.value)} name="date" required/></label>
            <br></br>
              <button className="submit" type="submit">Submit</button>
              </form>
          <button onClick={closeModal} className= "close-button">close</button>

        </Modal>
        </>
  )
}
