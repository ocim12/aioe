import React, { Component, useRef, useState } from 'react'
import { Link, Redirect, useLocation } from "react-router-dom";
import Modal from 'react-modal';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useHistory } from "react-router-dom";
import AuthService from "./services/AuthService";


const ModalLogin = ({ isOpen, requestClose, setIsOpenLog, setisLogged}) => {

  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserInDB, setIsUserInDB] = useState(false);
  const [validationFalse, setValidationFalse] = useState(false);
  const [welcome, setWelcome] = useState(false);


  function resetWindow() {
    setLoading(false);
    setIsOpenLog(false);
    setUsername("");
    setPassword("")
    return(<Link to={"/brgGame"}></Link>)
  }

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setIsUserInDB(false);
    setLoading(true);
    setValidationFalse(false);
    setWelcome(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then((response) => {
        if (response.status == 200) {
          response.json().then(
            (result) => {
              localStorage.setItem('token', result.token)
              localStorage.setItem('user', JSON.stringify(result.user))
              setTimeout(() => resetWindow(), 3000);
              setWelcome(true);
              setisLogged(true);
              history.push({pathname: "/brgGame"})
            }
          )
        }
        if (response.status == 302) {
          setIsUserInDB(true);
          setLoading(false);
        }
        if (response.status == 303) {
          setValidationFalse(true);
          setLoading(false);
        }
      })

    } else {
      setLoading(false);
    }
  };

  const customStylesLog = {
    content: {
      background: '#18181F',
      height: '500px',
      width: '400px',
      padding: '30px',
      display: 'flex',
      display: 'grid',
      gridColumn: 'auto',
      borderRadius: '12px',
      animation: 'true',
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };



  return (
    <>
      <Modal
        isOpen={isOpen}
        style={customStylesLog}
        onRequestClose={() => requestClose(false)}
        contentLabel="Example Modal"
        ariaHideApp={false}>



        {welcome ?
          <div>Welcome {username}
          </div>
          :
          <div id="title"><span id="title">Come in!</span></div>
        }
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">

            <Input
              type="text"
              className="form-control"
              placeholder="Login"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <Input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button id="loginButton" className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {isUserInDB ?
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                There is no such user!
              </div>
            </div>
            :
            <div></div>
          }

          {validationFalse ?
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                There are errors with validation
              </div>
            </div>
            :
            <div></div>
          }
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </Modal>
    </>
  )
}

export default ModalLogin