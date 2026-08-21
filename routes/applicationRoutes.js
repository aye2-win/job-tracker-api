import express from "express";

import auth from "../middleware/auth.js";

import {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// protected routes
router.use(auth);

router.get("/", getApplications);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;