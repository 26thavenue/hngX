import express, { Request, Response, Router } from 'express'
const router:Router = express.Router()

router.get('/api', (req: Request, res: Response) => {
    const githubFileURL:string = 'https://github.com/26thavenue/hngX.git'
    const githubRepoUrl:string = 'https://github.com/26thavenue/hngX/blob/main/task_1/index.ts'

    const { slack_name, track } = req.query;

    if (!slack_name || !track) {
     res.json({ error: 'slack_name and track query parameters are required.' });
} 
    const now:Date = new Date();
    const currentDay:string = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentUTC:string = now.toISOString();
    const statusCode = 200
    const response = {
        slack_name,
        track,
        currentDay,
        currentUTC,
        githubFileURL,
        githubRepoUrl,
        statusCode,
};

    res.json(response);
})

export default router