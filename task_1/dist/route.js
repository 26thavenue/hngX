"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/api', (req, res) => {
    const githubFileURL = 'https://github.com/26thavenue/hngX.git';
    const githubRepoUrl = 'https://github.com/26thavenue/hngX/blob/main/task_1/server.ts';
    const { slackName, track } = req.query;
    if (!slackName || !track) {
        res.json({ error: 'slack_name and track query parameters are required.' });
    }
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentUTC = now.toISOString();
    const statusCode = 200;
    const response = {
        slackName,
        track,
        currentDay,
        currentUTC,
        githubFileURL,
        githubRepoUrl,
        statusCode,
    };
    res.json(response);
});
exports.default = router;
