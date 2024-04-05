
import './Landing.css'

import React, { useState } from 'react';
import axios from 'axios';
import { UserCredentials } from '../../types/UserCredentials';
import { errorAlert } from '../../heplers/ErrorHandler';
import { errorMessages } from '../../heplers/ErrorMessage';
import { useNavigate } from 'react-router-dom';


interface LandingProps {
  onUserIdSet: (userId: string) => void;
}

export default function Landing(props: LandingProps) {
  const [userCredentials, setUserCredentials] = useState<UserCredentials | null>(null);

  const navigate = useNavigate();

  const isValidCredentials = () => {
    return userCredentials?.email && userCredentials?.password;
  }


  const handleChange = (element: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log("Element: ", element);

    const newCredentials: UserCredentials = {
      ...userCredentials,
      [element.target.name]: element.target.value
    } as UserCredentials;

    setUserCredentials(newCredentials);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidCredentials()) {
      axios
        .post('https://fintrackbackend.onrender.com/user/login', {
          email: userCredentials?.email,
          password: userCredentials?.password,
        }, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response =>  {

          if (response.data && response.data.userId) {
            const userId = response.data.userId;
            props.onUserIdSet(userId);
            navigate("/daily");
            
          } else {
            console.log("UserId not found in the response");
          }
        })
        .catch((err) => errorAlert(errorMessages.userNotFound, 'User not found', err));
    } else {
      console.log("Wrong credentials!");
    }
  }

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  name="email"
                  className="login__input"
                  placeholder="User name / Email"
                  value={userCredentials?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  className="login__input"
                  placeholder="Password"
                  value={userCredentials?.password}
                  onChange={handleChange}
                />
              </div>
              <button className="button login__submit" type="submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <button className="button signup__submit">
                <span className="button__text">Sign Up Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}
