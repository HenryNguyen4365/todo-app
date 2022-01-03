import React, { useEffect, useState } from "react";
import "./styles.css";
import { db } from "../../firebase-config";
import { collection, getDocs } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Home = ({ isAuth }) => {
  const activityCollection = collection(db, "activityList");
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const { currentUser, signout } = useAuth();
  const handleLogout = async () => {
    await signout();
    localStorage.setItem("isAuth", false);
    navigate("/login");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(activityCollection);
        setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div className="home-template">
      {currentUser ? (
        <div className="user">
          <h3>User:{currentUser?.email}</h3>
          <button
            style={{
              border: "none",
              height: "30px",
              cursor: "pointer",
              marginLeft: "20px",
            }}
            onClick={() => handleLogout()}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="auth">
          <button className="login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="register" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      )}
      {currentUser && (
        <button className="add" onClick={() => navigate("/add")}>
          Add new activity
        </button>
      )}
      <div className="home-detail">
        {activities.map((activity, key) => (
          <div className="home-container" key={key}>
            {isAuth && currentUser?.uid === activity?.author?.id && (
              <div className="home-action">
                <i
                  className="fa fa-edit"
                  style={{
                    cursor: "pointer",
                    paddingLeft: "20px",
                    paddingTop: "1px",
                    color: "blue",
                  }}
                  onClick={() => navigate(`/edit/${activity.id}`)}
                ></i>
              </div>
            )}
            <p style={{ fontSize: "12px"}}>User: {activity.author.email}</p>
            <h3>{activity.title}</h3>
            <p>{activity.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
