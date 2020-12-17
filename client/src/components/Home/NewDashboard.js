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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

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
  try{
const project = {
      name: name,
      description: description,
      date:today,
      creator: currentUser.uid
    };
  alert(`Creating project: ${name}...`)
  axios.post('/dashboard', project)
        .then(res => console.log(res)).catch(error=>console.log(error))
  } catch(e){
    console.log(e)
    alert("Oops something went wrong. Could not create project.")

  }
}



  return (
    <>
        <button className="projects" onClick={openModal}>New Project</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <button onClick={closeModal} className= "close-button">x</button>
          <h2 ref={_subtitle => (subtitle = _subtitle)}>New Project</h2>
            <form onSubmit = {handleSubmit}>
            <label>Project Name:<br></br><input type="text" value={name} onChange ={e=>setName(e.target.value)} name="name" required/></label>
            <br></br>
            <label>Description:<textarea type="text"  rows="4" cols="30" value={description} onChange ={e=>setDescription(e.target.value)} name="desc"  required /> </label>
            <button className="submit" type="submit">Submit</button>
            </form>

        </Modal>
        </>
  )
}
