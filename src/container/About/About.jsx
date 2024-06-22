import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppWrapper from "../../Wrapper/AppWrapper";
import MotionWrapp from "../../Wrapper/MotionWrapp";
import client, { urlFor } from "../../client";
import "./About.scss";

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const query = '*[_type == "about"]';
        const data = await client.fetch(query);
        setAbouts(data);
        console.log(abouts, "jhjhg");
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAbouts();
  }, []);

  return (
    <>
      <h2 className="head-text">
        I know That <span>Good Design</span> means <br />
        <span>Good Business</span>
      </h2>
      <div className="app__profiles">
        {abouts.map((about) => (
          <motion.div
            key={about._id}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: "20px" }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: "10px" }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrapper(
  MotionWrapp(About, "app__about"),
  "about",
  "app__whitebg"
);
