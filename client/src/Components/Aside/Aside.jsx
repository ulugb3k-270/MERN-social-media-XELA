import { useState, useEffect } from "react";

// STYLES
import "./aside.scss";

// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

// JWT
import decode from "jwt-decode";

// COMPONENT
import Form from "./Form/Form";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

const Aside = () => {
  const { authData } = useSelector((state) => state.auth);
  const [isSignIn, setIsSignIn] = useState(true);
  const [userInformations, setUserInformations] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const token = userInformations?.token;

    // JWT ...
    if (token) {
      const decodedToken = decode(token);
      dispatch({type: "SET_USER"})

      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
  }, [dispatch]);

  useEffect(() => {
    setUserInformations(JSON.parse(localStorage.getItem("profile")))
    setIsSignIn(true)
  }, [authData])

  const IsUserLoggedIn = () => {
    if (authData?.user) {
      return (
        <div className="aside__profile">
          <div className="aside__profile-img">
            <img src={userInformations?.user.image} alt="profile-img" />
            <div className="aside__profile-round">
              <span></span>
            </div>
          </div>
          <div className="aside__profile-user">
            <h4>{userInformations?.user.fullName}</h4>
            <p>@{userInformations?.user.userName}</p>
          </div>
          <div className="aside__profile-details">
            <div>
              <h4>{userInformations?.user.posts.length}</h4>
              <p>Posts</p>
            </div>
            <div>
              <h4>{userInformations?.user.followers.length}</h4>
              <p>Followers</p>
            </div>
            <div>
              <h4>{userInformations?.user.followings.length}</h4>
              <p>Following</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="aside__login">
          <Form isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        </div>
      );
    }
  };

  return (
    <aside className="aside">
      <IsUserLoggedIn />

      {isSignIn && (
        <>
          <nav className="aside__nav">
            <ul className="aside__nav-list">
              <li className="aside__nav-item">
                <Link to="/">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 1L8.89047 0.544446C8.66578 0.351851 8.33422 0.351851 8.10953 0.544446L8.5 1ZM1.5 7L1.10953 6.54445L0.9 6.72404V7H1.5ZM6.5 15V15.6C6.83137 15.6 7.1 15.3314 7.1 15H6.5ZM10.5 15H9.9C9.9 15.3314 10.1686 15.6 10.5 15.6V15ZM15.5 7H16.1V6.72404L15.8905 6.54445L15.5 7ZM2.5 15.6H6.5V14.4H2.5V15.6ZM15.8905 6.54445L8.89047 0.544446L8.10953 1.45555L15.1095 7.45555L15.8905 6.54445ZM8.10953 0.544446L1.10953 6.54445L1.89047 7.45555L8.89047 1.45555L8.10953 0.544446ZM7.1 15V12H5.9V15H7.1ZM9.9 12V15H11.1V12H9.9ZM10.5 15.6H14.5V14.4H10.5V15.6ZM16.1 14V7H14.9V14H16.1ZM0.9 7V14H2.1V7H0.9ZM8.5 10.6C9.2732 10.6 9.9 11.2268 9.9 12H11.1C11.1 10.5641 9.93594 9.4 8.5 9.4V10.6ZM8.5 9.4C7.06406 9.4 5.9 10.5641 5.9 12H7.1C7.1 11.2268 7.7268 10.6 8.5 10.6V9.4ZM14.5 15.6C15.3837 15.6 16.1 14.8837 16.1 14H14.9C14.9 14.2209 14.7209 14.4 14.5 14.4V15.6ZM2.5 14.4C2.27909 14.4 2.1 14.2209 2.1 14H0.9C0.9 14.8837 1.61634 15.6 2.5 15.6V14.4Z"
                      fill="#4D77FF"
                    />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li className="aside__nav-item">
                <Link to="/">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 1H2.5C1.94772 1 1.5 1.44772 1.5 2V6C1.5 6.55228 1.94772 7 2.5 7H6.5C7.05228 7 7.5 6.55228 7.5 6V2C7.5 1.44772 7.05228 1 6.5 1Z"
                      stroke="#D2D1D4"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M14.5 1H10.5C9.94772 1 9.5 1.44772 9.5 2V6C9.5 6.55228 9.94772 7 10.5 7H14.5C15.0523 7 15.5 6.55228 15.5 6V2C15.5 1.44772 15.0523 1 14.5 1Z"
                      stroke="#D2D1D4"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M14.5 9H10.5C9.94772 9 9.5 9.44772 9.5 10V14C9.5 14.5523 9.94772 15 10.5 15H14.5C15.0523 15 15.5 14.5523 15.5 14V10C15.5 9.44772 15.0523 9 14.5 9Z"
                      stroke="#D2D1D4"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M6.5 9H2.5C1.94772 9 1.5 9.44772 1.5 10V14C1.5 14.5523 1.94772 15 2.5 15H6.5C7.05228 15 7.5 14.5523 7.5 14V10C7.5 9.44772 7.05228 9 6.5 9Z"
                      stroke="#D2D1D4"
                      strokeWidth="1.2"
                    />
                  </svg>
                  Explore
                </Link>
              </li>
              <li className="aside__nav-item">
                <Link to="/">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 1L16.0515 1.23635C16.1481 1.01085 16.0977 0.749219 15.9243 0.575736C15.7508 0.402252 15.4892 0.351868 15.2636 0.448513L15.5 1ZM1.5 7L1.26365 6.44851C1.05655 6.53727 0.916634 6.73457 0.901377 6.95937C0.88612 7.18417 0.998094 7.39857 1.1913 7.5145L1.5 7ZM9.5 15L8.9855 15.3087C9.10143 15.5019 9.31583 15.6139 9.54063 15.5986C9.76543 15.5834 9.96273 15.4435 10.0515 15.2364L9.5 15ZM15.2636 0.448513L1.26365 6.44851L1.73635 7.55149L15.7364 1.55149L15.2636 0.448513ZM1.1913 7.5145L6.1913 10.5145L6.8087 9.4855L1.8087 6.4855L1.1913 7.5145ZM5.9855 10.3087L8.9855 15.3087L10.0145 14.6913L7.0145 9.6913L5.9855 10.3087ZM10.0515 15.2364L16.0515 1.23635L14.9485 0.763648L8.94851 14.7636L10.0515 15.2364ZM15.0757 0.575736L6.07574 9.57574L6.92426 10.4243L15.9243 1.42426L15.0757 0.575736Z"
                      fill="#D2D1D4"
                    />
                  </svg>
                  Direct
                </Link>
              </li>
              <li className="aside__nav-item">
                <Link to="/">
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 15L11.1252 15.4685C11.3053 15.6126 11.552 15.6407 11.7599 15.5408C11.9678 15.4409 12.1 15.2307 12.1 15H11.5ZM11.5 1.00001H12.1V0.400011L11.5 0.400011L11.5 1.00001ZM1.5 1L1.5 0.4L0.9 0.399999V1H1.5ZM1.5 15H0.9C0.9 15.2307 1.03221 15.4409 1.24009 15.5408C1.44797 15.6407 1.69471 15.6126 1.87482 15.4685L1.5 15ZM6.5 11L6.87482 10.5315C6.65569 10.3562 6.34431 10.3562 6.12518 10.5315L6.5 11ZM12.1 15V1.00001H10.9V15H12.1ZM0.9 1V15H2.1V1H0.9ZM1.87482 15.4685L6.87482 11.4685L6.12518 10.5315L1.12518 14.5315L1.87482 15.4685ZM6.12518 11.4685L11.1252 15.4685L11.8748 14.5315L6.87482 10.5315L6.12518 11.4685ZM11.5 0.400011L1.5 0.4L1.5 1.6L11.5 1.60001L11.5 0.400011Z"
                      fill="#D2D1D4"
                    />
                  </svg>
                  Favourite
                </Link>
              </li>
              <li className="aside__nav-item">
                <Link to="/">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.944 1L6.858 1.43671L6.52901 3.03467C6.00301 3.23554 5.526 3.52037 5.095 3.85815L3.487 3.3205L3.05501 3.18658L2.83101 3.57233L1.724 5.4231L1.5 5.8089L1.828 6.0957L3.07201 7.15399C3.02701 7.43081 2.96901 7.70461 2.96901 7.99542C2.96901 8.28623 3.02701 8.5601 3.07201 8.83691L1.828 9.8952L1.5 10.182L1.724 10.5677L2.83101 12.4186L3.05501 12.8053L3.487 12.6704L5.095 12.1328C5.526 12.4705 6.00301 12.7553 6.52901 12.9562L6.858 14.5541L6.944 14.9909H10.055L10.142 14.5541L10.47 12.9562C10.996 12.7553 11.473 12.4705 11.904 12.1328L13.512 12.6704L13.944 12.8053L14.169 12.4186L15.275 10.5677L15.5 10.182L15.171 9.8952L13.927 8.83691C13.973 8.5601 14.03 8.28623 14.03 7.99542C14.03 7.70461 13.973 7.43081 13.927 7.15399L15.171 6.0957L15.5 5.8089L15.275 5.4231L14.169 3.57233L13.944 3.18658L13.512 3.3205L11.904 3.85815C11.473 3.52037 10.996 3.23554 10.47 3.03467L10.142 1.43671L10.055 1H6.944Z"
                      stroke="#D2D1D4"
                      strokeWidth="1.2"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4996 7.99542C10.4996 9.0987 9.60363 9.99414 8.49963 9.99414C7.39563 9.99414 6.49963 9.0987 6.49963 7.99542C6.49963 6.89214 7.39563 5.99677 8.49963 5.99677C9.60363 5.99677 10.4996 6.89214 10.4996 7.99542Z"
                      stroke="#D2D1D4"
                      strokeWidth="1.2"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Settings
                </Link>
              </li>
              {authData?.user && (
                <li className="aside__nav-item">
                  <Link to="/" onClick={logOut}>
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.944 1L6.858 1.43671L6.52901 3.03467C6.00301 3.23554 5.526 3.52037 5.095 3.85815L3.487 3.3205L3.05501 3.18658L2.83101 3.57233L1.724 5.4231L1.5 5.8089L1.828 6.0957L3.07201 7.15399C3.02701 7.43081 2.96901 7.70461 2.96901 7.99542C2.96901 8.28623 3.02701 8.5601 3.07201 8.83691L1.828 9.8952L1.5 10.182L1.724 10.5677L2.83101 12.4186L3.05501 12.8053L3.487 12.6704L5.095 12.1328C5.526 12.4705 6.00301 12.7553 6.52901 12.9562L6.858 14.5541L6.944 14.9909H10.055L10.142 14.5541L10.47 12.9562C10.996 12.7553 11.473 12.4705 11.904 12.1328L13.512 12.6704L13.944 12.8053L14.169 12.4186L15.275 10.5677L15.5 10.182L15.171 9.8952L13.927 8.83691C13.973 8.5601 14.03 8.28623 14.03 7.99542C14.03 7.70461 13.973 7.43081 13.927 7.15399L15.171 6.0957L15.5 5.8089L15.275 5.4231L14.169 3.57233L13.944 3.18658L13.512 3.3205L11.904 3.85815C11.473 3.52037 10.996 3.23554 10.47 3.03467L10.142 1.43671L10.055 1H6.944Z"
                        stroke="#D2D1D4"
                        strokeWidth="1.2"
                        strokeLinecap="square"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.4996 7.99542C10.4996 9.0987 9.60363 9.99414 8.49963 9.99414C7.39563 9.99414 6.49963 9.0987 6.49963 7.99542C6.49963 6.89214 7.39563 5.99677 8.49963 5.99677C9.60363 5.99677 10.4996 6.89214 10.4996 7.99542Z"
                        stroke="#D2D1D4"
                        strokeWidth="1.2"
                        strokeLinecap="square"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Log out
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="aside__contacts">
            <h3>Contacts</h3>
            <ul className="aside__contacts-list">
              <li className="aside__contacts-item">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shorturl-phototourl.appspot.com/o/message%2F9723863815%2Fimage?alt=media&token=400daf36-e36b-48f9-87a6-ec6af7262642"
                  alt=""
                />
                <div>
                  <Link to="/">Julie Mendez</Link>
                  <p>Memphis, TN, US</p>
                </div>
              </li>
              <li className="aside__contacts-item">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shorturl-phototourl.appspot.com/o/message%2F9723863815%2Fimage?alt=media&token=400daf36-e36b-48f9-87a6-ec6af7262642"
                  alt=""
                />
                <div>
                  <Link to="/">Julie Mendez</Link>
                  <p>Memphis, TN, US</p>
                </div>
              </li>
              <li className="aside__contacts-item">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shorturl-phototourl.appspot.com/o/message%2F9723863815%2Fimage?alt=media&token=400daf36-e36b-48f9-87a6-ec6af7262642"
                  alt=""
                />
                <div>
                  <Link to="/">Julie Mendez</Link>
                  <p>Memphis, TN, US</p>
                </div>
              </li>
              <Link to="/">See More</Link>
            </ul>
          </div>
        </>
      )}
    </aside>
  );
};

export default Aside;
