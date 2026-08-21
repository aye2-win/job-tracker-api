import Application from "../models/Application.js";

// create a new application
export const createApplication = async (req, res) => {
    try {
        const application = await Application.create({
            ...req.body,
            user: req.user,
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// get all applications for the logged-in user
export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user,
        }).sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// update an application
export const updateApplication = async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            user: req.user,
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        Object.assign(application, req.body);

        await application.save();

        res.json(application);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// delete an application
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            user: req.user,
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        await application.deleteOne();

        res.json({
            message: "Application deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};