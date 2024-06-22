
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppWrapper from "../../Wrapper/AppWrapper";
import { FaGithub } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import client, { urlFor } from "../../client";
import "./Work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animatedCard, setAnimatedCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);

  useEffect(() => {
    const query = '*[_type == "work"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWorks(data);
      console.log(works, "workssssssssss");
    });
  },[]);

  const handleClickFilter = (item) => {
    setActiveFilter(item);
    setAnimatedCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimatedCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWorks(works);
      } else {
        setFilterWorks(works.filter((work) => work.tags.includes(item)));
       
      }
    }, 500);
  };


  return (
    <>
      <h2 className="head-text">
      Good design<span> equals good  <br /></span> business
       
      </h2>
      <div className="app__work-filter">
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleClickFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animatedCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWorks.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img">
              <img src={urlFor(work.imgUrl).url()} alt={work.title} />
              <motion.div
               whileHover={{ opacity: [0, 1] }}
               transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <FaGithub />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                     whileInView={{ scale: [0, 1] }}
                     whileHover={{ scale: [1, 0.90] }}
                     transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <MdRemoveRedEye />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrapper(Work, "work" , 'app__works');
