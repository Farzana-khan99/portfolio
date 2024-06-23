import React, { useState } from "react";
import client, { urlFor } from "../../client";

import { images } from "../../constants";
import AppWrapper from "../../Wrapper/AppWrapper";

import "./Footer.scss";
import MotionWrapp from "../../Wrapper/MotionWrapp";
const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormsubmited, setFormsubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const { email, name, message } = formData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handlesubmit = () => {
    setLoading(true);
    const contact = {
      _type: "contact",
      name: "name",
      email: email,
      message: message,
    };
    client.create(contact).then(() => {
      setLoading(false);
      setFormsubmited(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Let's Grab Coffee & Chat </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a className="p-text" href="mailto:id.farzanakhan@gmail.com">
            id.farzanakhan@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="email" />
          <a className="p-text" href="tel:03442467405">
          03442467405
          </a>
        </div>
      </div>
      {!isFormsubmited ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              name="message"
              value={message}
              placeholder="Your Message"
              onChange={handleChangeInput}
            ></textarea>
            <button className="p-text" onClick={handlesubmit}>
              {!loading ? "Sending " : "Sending message..."}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrapper(
  MotionWrapp(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
