import React, { useEffect, useState } from "react";
import client, { urlFor } from "../../client";
import { motion } from "framer-motion";
import AppWrapper from "../../Wrapper/AppWrapper";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import "./Testimonial.scss";
import MotionWrapp from "../../Wrapper/MotionWrapp";

const Testimonial = () => {
  const [brand, setBrands] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const query = '*[_type == "testimonial"]';
        const brandsquery = '*[_type == "brands"]';
        const bquery = await client.fetch(brandsquery);
        setBrands(bquery);
        console.log(bquery, "bquery here");
        // =====
        const testiquery = await client.fetch(query);
        setTestimonial(testiquery);
        console.log(testiquery, "testimonial");
      } catch (error) {
        console.log(error);
      }
    };
    fetchTestimonial();
  }, []);

  const test = testimonial[currentIndex];
  const handleClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <>
      {testimonial.length > 0 && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(test.imageUrl)} alt="img" />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <h5 className="p-text">{test.company}</h5>
              </div>
            </div>
          </div>
          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0 ? testimonial.length - 1 : currentIndex - 1
                )
              }
            >
              <FaChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonial.length - 1 ? 0 : currentIndex + 1
                )
              }
            >
              <FaChevronRight />
            </div>
          </div>
        </>
      )}
      <div className="app__testimonials-brands app__flex">
        {brand.map((brand, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={urlFor(brand?.imgUrl)} alt={brand?.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrapper(
  MotionWrapp(Testimonial, "app__testimonial"),
  "testimonial",
  'app__primarybg'
);
