"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/api', (req, res) => {
    const github_file_url = 'https://github.com/26thavenue/hngX.git';
    const github_repo_url = 'https://github.com/26thavenue/hngX/blob/main/task_1/index.ts';
    const slack_name = req.query.slack_name;
    const track = req.query.track;
    if (slack_name !== undefined && track !== undefined) {
        const now = new Date();
        const current_day = now.toLocaleDateString('en-US', { weekday: 'long' });
        const utc_time = now.toISOString();
        const status_code = 200;
        const data = {
            slack_name: slack_name.toString(),
            current_day,
            utc_time,
            track: track.toString(),
            github_file_url,
            github_repo_url,
            status_code,
        };
        return res.json(data);
    }
    else {
        res.json({ error: 'slack_name and track query parameters are required.' });
    }
});
exports.default = router;
