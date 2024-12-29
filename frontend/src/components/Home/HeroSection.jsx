import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making API requests

const HeroSection = () => {
  const [details, setDetails] = useState([]); // State to store fetched details

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:4000/api/v1/job/get/positiondetailsfromfile", {
        withCredentials: true, // Include cookies for protected route
      })
      .then((response) => {
        // Set the positions data in the state
        setDetails(response.data.positions);
      })
      .catch((error) => {
        console.error("Error fetching position details:", error);
      });
  }, []); // Empty dependency array to fetch data on component mount

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h1>your interests and skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
            facere mollitia!
          </p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="details">
        {details.map((element) => {
          return (
            <div className="card" key={element.title}>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
