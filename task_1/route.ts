import express, { Request, Response, Router } from 'express'
import {response} from './types'
const router:Router = express.Router()

router.get('/api', (req: Request, res: Response) => {
    const github_file_url:string = 'https://github.com/26thavenue/hngX.git'
    const github_repo_url:string = 'https://github.com/26thavenue/hngX/blob/main/task_1/dist/index.js'

    const slack_name = req.query.slack_name;
    const track = req.query.track;

    if (slack_name !== undefined && track !== undefined ) {
    const now:Date = new Date();
    const current_day:string = now.toLocaleDateString('en-US', { weekday: 'long' });
    const utc_time:string = now.toISOString().slice(0, -5) + 'Z';
    const status_code:number = 200
    const data:response = {
        slack_name: slack_name.toString(),
        current_day,
        utc_time,
        track:track.toString(),
        github_file_url,
        github_repo_url,
        status_code,
    }
    return res.json(data);
    
    }else{
         res.json({ error: 'slack_name and track query parameters are required.' });
    }
    
    
})

export default router