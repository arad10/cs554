import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styled from "styled-components";

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
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#00000';
  }

  function closeModal(){
    setIsOpen(false)
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
            <form>
            <label>Project Name:<input type="text" name="name" required/></label>
            <br></br>
            <label>Description:<input type="text" name="name" required /></label>
            <br></br>
            <label>Date name:<input type="text" name="name" required/></label>
            <br></br>
              <button className="submit" type="submit">Submit</button>
              </form>
          <button onClick={closeModal} className= "close-button">close</button>

        </Modal>
        </>
  )
}
