import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories

  // Fetch job data from backend on component mount
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/job/get/jobsfromfile", {
      withCredentials: true, // Ensures cookies are sent with the request
    })
    .then((response) => {
      const jobData = response.data.jobs.map((job) => ({
        title: job.title,
        subTitle: `${job.positionsAvailable} Open Positions`, // Format subtitle with positions
      }));
      setCategories(jobData); // Set the categories data
    })
    .catch((error) => {
      console.error("Error fetching job categories:", error);
    });
  }, []); // Empty dependency array to fetch only once when the component mounts

  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((category, index) => {
          return (
            <div className="card" key={index}>
              <div className="text">
                <p>{category.title}</p>
                <p>{category.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
