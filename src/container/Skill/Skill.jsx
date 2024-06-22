import React, { useEffect, useState } from "react";
import client, { urlFor } from "../../client";
import { motion } from "framer-motion";
import AppWrapper from "../../Wrapper/AppWrapper";
import MotionWrapp from "../../Wrapper/MotionWrapp";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./Skill.scss";


const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const querySkill = '*[_type == "skill"]';
        const queryExperience = '*[_type == "experiences"]';
        // Fetch experiences
        const dataExperiences = await client.fetch(queryExperience);
        setExperiences(dataExperiences);
        console.log(dataExperiences, "experiences");

        // Fetch skills
        const dataSkills = await client.fetch(querySkill);
        setSkills(dataSkills);
        console.log(dataSkills, "skills");
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkill();
  }, []);

  return (
    <div>
      <h2 className="head-text">skill and experiance</h2>
      <div className="app__skills-container">
        <motion.div className="app__skill-list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skill-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="app__skill-exp">
          {experiences.map((experiance) => (
            <motion.div className="app__skill-exp-item" key={experiance.year}>
              <div className="app__skill-exp-year">
                <p className="bold-text">{experiance.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {console.log(experiance, "experiance hmmm")}
                {experiance?.work?.map((works) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skill-exp-work app__flex"
                      data-tip
                      data-for={works.name}
                      key={works.name}
                    >
                      <h4 className="bold-text">{works.name}</h4>
                      <p className="p-text">{works.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={works.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {works.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AppWrapper(
  MotionWrapp(Skill, "app__skills"),
  "skills",
  "app__whitebg"
);
