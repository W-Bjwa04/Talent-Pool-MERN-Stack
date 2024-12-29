import { log } from "console";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";
import fs from "fs/promises"
import path from "path"


export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});



export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;
  
    if (!title || !description || !category || !country || !city || !location) {
      return next(new ErrorHandler("Please provide full job details.", 400));
    }
  
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      return next(
        new ErrorHandler(
          "Please either provide fixed salary or ranged salary.",
          400
        )
      );
    }
  
    if (salaryFrom && salaryTo && fixedSalary) {
      return next(
        new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
      );
    }
    const postedBy = req.user._id;
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });
    res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      job,
    });
});


// employeer can see the jobs he posted 

export const getMyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});



// update an existing job 

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "Job Updated!",
  });
});



// controller for delete the job 

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne()
  res.status(200).json({
    success: true,
    message: "Job Dele!",
  });
});


// controller for getting single job 

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});



export const getJobsFromFile = catchAsyncError(async (req, res, next) => {
  try {
    // Resolve the path to the jobs.json file in the utils folder
    const filePath = path.resolve('utils', 'jobs.json'); // Make sure the file path is correct

    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf8');

    // Parse the JSON content
    const parsedData = JSON.parse(data);

    // Extract only the jobs array
    const jobs = parsedData.jobs || []; // Ensure there's a fallback if jobs is undefined

    // Send the jobs as a response
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error reading the JSON file:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
});


export const getCompaniesFromFile = catchAsyncError(async (req, res, next) => {
  try {
    // Resolve the path to the jobs.json file in the utils folder
    const filePath = path.resolve('utils', 'jobs.json'); // Adjust the path if needed

    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf8');

    // Parse the JSON content
    const parsedData = JSON.parse(data);

    // Extract only the companies array
    const companies = parsedData.companies || []; // Fallback if companies is undefined

    // Send the companies as a response
    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Error reading the JSON file:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
    });
  }
});


export const getPostionDetails = catchAsyncError(async (req, res, next) => {
  try {
    // Resolve the path to the jobs.json file in the utils folder
    const filePath = path.resolve('utils', 'jobs.json'); // Make sure this path is correct

    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf8');

    // Parse the JSON content
    const parsedData = JSON.parse(data);

    // Extract hero, jobs, and companies data
    const positions = parsedData.positions || [];
    

    // Send the data as a response
    res.status(200).json({
      success: true,
      positions,
    });
  } catch (error) {
    console.error("Error reading the JSON file:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});