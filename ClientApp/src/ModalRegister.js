import React, { Component, useRef, useState } from 'react'
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
import AuthServices from './services/AuthService'
import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../src/components/RegistrationWindow.css'

import { isEmail } from "validator";


const ModalRegister = ({ isOpen, requestClose, setIsOpenReg }) => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);
  const [nameBusy, setNameBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useRef();
  const checkBtn = useRef();
  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const vpassword = (value) => {

    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  const vPassConfirm = (value, props, components) => {

    if (value !== components['password'][0].value) {
      return (
        <div className="alert alert-danger" role="alert">
          The password does not match!
        </div>
      )
    }
  };


  function resetWindow() {
    setIsOpenReg(false);
    setUsername("");
    setPassword("");
    setPassConfirm("");
    setEmail("");
  }


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    setNameBusy(false);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmailBusy(false);
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePassConfirm = (e) => {
    const passConfirm = e.target.value;
    setPassConfirm(passConfirm);
  };

  const customStylesReg = {
    content: {
      background: '#18181F',
      height: '680px',
      width: '500px',
      padding: '30px',
      display: 'flex',
      display: 'grid',
      gridColumn: 'auto',
      borderRadius: '12px',
      animation: 'true',
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)',
      zindex: '500'
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setEmailBusy(false);
    setNameBusy(false);
    setSuccess(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthServices.register(username, password, email).then((response) => {
        if (response.status == 300) {
          setNameBusy(true);
        }
        if (response.status == 301) {
          setEmailBusy(true);
        }
        if (response.status == 200) {
          requestClose(true);
          setTimeout(() => resetWindow(), 3000);
          setSuccess(true);
        }
      })
    }
  };


  return (

    <Modal
      isOpen={isOpen}
      style={customStylesReg}
      onRequestClose={() => requestClose(false)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {success ?
        <div>
          Thats it {username}! Be welcomed in our community!
        </div>
        :
        <div id="title"><span id="title">We are glad, you are here</span></div>
      }

      <Form onSubmit={handleRegister} ref={form}>
        <div className="inputs-group">
          <div className="form-group">
            <label htmlFor="username"></label>
            <Input
              type="text"
              placeholder="Login"
              className="windowInput"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required, vusername]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email"></label>
            <Input
              type="text"
              className="windowInput"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}

            />
          </div>

          <div className="form-group">
            <label htmlFor="password"></label>
            <Input
              type="password"
              className="windowInput"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required, vpassword]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passConfirm"></label>
            <Input
              type="password"
              placeholder="Confirm password"
              className="windowInput"
              name="passConfirm"
              value={passConfirm}
              onChange={onChangePassConfirm}
              validations={[required, vPassConfirm]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" id="registerButton">Register</button>
          </div>
        </div>


        {nameBusy ?
          <div className="form-group">
            <div
              className={"alert alert-danger"}
              role="alert"
            > User with given name already exist!
              </div>
          </div>
          :
          <div></div>
        }

        {emailBusy ?
          <div className="form-group">
            <div
              className={"alert alert-danger"}
              role="alert"
            > Sorry! We already have an user with that e-mail.
              </div>
          </div>
          :
          <div></div>
        }
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </Modal>)
}

export default ModalRegister