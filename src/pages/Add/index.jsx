import React, { useEffect, useState } from "react";
import "./styles.css";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Add = () => {
  const activityCollection = collection(db, "activityList");
  const [data, setData] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuth();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(activityCollection);
        setData(data.docs.filter((doc) => doc.id === id)[0].data());
      } catch (error) {
        console.log(error);
      }
    };
    if (id) getData();
  }, [id]);

  const updateActivity = async (id, data) => {
    const activityDoc = doc(db, "activityList", id);
    const { title, body } = data;
    await updateDoc(activityDoc, {
      title: title,
      body: body,
      author: { email: currentUser.email, id: currentUser.uid },
    });
    navigate("/");
  };
  const deleteActivity = async (id) => {
    const activityDoc = doc(db, "activityList", id);
    await deleteDoc(activityDoc);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const createActivity = async () => {
    await addDoc(activityCollection, {
      title: data.title,
      body: data.body,
      author: { email: currentUser.email, id: currentUser.uid },
    });
    navigate("/");
  };
  const { title, body } = data;
  return (
    <div className="container">
      <div className="trash">
        {id && (
          <i
            className="fa fa-trash-o"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              deleteActivity(id);
              navigate("/");
            }}
          ></i>
        )}
      </div>
      <div className="heading">
        {id ? <h1>Edit activity</h1> : <h1>Add some activities</h1>}
      </div>
      <div className="detail">
        <div className="topic">
          <label>Topic</label>
          <input
            name="title"
            value={title}
            type="text"
            placeholder="Your topic"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="description">
          <label>Description</label>
          <input
            name="body"
            value={body}
            type="text"
            placeholder="Your description"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      {id ? (
        <button className="btn" onClick={() => updateActivity(id, data)}>
          Update activity
        </button>
      ) : (
        <button className="btn" onClick={createActivity}>
          Add activity
        </button>
      )}
    </div>
  );
};

export default Add;
