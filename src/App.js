// import "./App.css";
import { Navbar } from "./component";
import {Header ,About ,Skill , Testimonial , Work, Footer}  from "./container"
import './App.scss'

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Header />
      <About />
      <Work />
      <Skill />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;
