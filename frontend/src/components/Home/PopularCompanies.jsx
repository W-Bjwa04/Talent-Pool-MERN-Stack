import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularCompanies = () => {
  const [companies, setCompanies] = useState([]); // State to store fetched companies

  useEffect(() => {
    // Fetch company data from the backend
    axios
      .get("http://localhost:4000/api/v1/job/get/companiesfromfile", {
        withCredentials: true, // Send cookies for the protected route
      })
      .then((response) => {
        // Set the companies data into state
        setCompanies(response.data.companies);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, []); // Empty dependency array to fetch only once when the component mounts

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((company, index) => {
            return (
              <div className="card" key={index}>
                <div className="content">
                  <div className="text">
                    <p>{company.title}</p>
                    <p>{company.location}</p>
                  </div>
                </div>
                <button>Open Positions {company.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
