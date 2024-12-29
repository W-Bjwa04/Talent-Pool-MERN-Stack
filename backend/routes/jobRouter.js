import express from "express";
import {getAllJobs, postJob, getMyJobs, updateJob, deleteJob, getSingleJob, getJobsFromFile, getCompaniesFromFile, getPostionDetails} from "../controller/jobController.js"
import { isAuthorized } from "../middlewares/auth.js";
import { get } from "http";

const router = express.Router()

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob)    // protected route
router.get("/getmyjobs", isAuthorized, getMyJobs)
router.put("/update/:id", isAuthorized, updateJob)
router.delete("/delete/:id", isAuthorized, deleteJob)
router.get("/:id", isAuthorized, getSingleJob);
router.get("/get/jobsfromfile", isAuthorized,getJobsFromFile)
router.get("/get/companiesfromfile", isAuthorized,getCompaniesFromFile)
router.get("/get/positiondetailsfromfile", isAuthorized,getPostionDetails)


export default router