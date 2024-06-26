import React from "react";

const NavigationDots = ({ active }) => {
  return (
    <div className="app__navigation">
      {["home", "about", "work", "skills", "testimonial", "contact"].map(
        (item, index) => (
          <a
            className="app__navigation-dot "
            key={item + index}
            href={`#${item}`}
            style={active === item ? { background: '#313B3A' } : {}}
          />
        )
      )}
    </div>
  );
};

export default NavigationDots;

