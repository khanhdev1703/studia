import express from "express";

const maintenanceApp = express();

maintenanceApp.use(express.json());

maintenanceApp.get("/", (req, res) => {
    return res.status(503).json({
        success: false,
        status: "MAINTENANCE",
        message: "Server đang bảo trì. Vui lòng thử lại sau.",
    });
});

export default maintenanceApp;