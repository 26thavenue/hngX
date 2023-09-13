import {Router} from 'express'
import {
    createUser,
    readUser,
    updateUser,
    deleteUser
} from '../controller/controller'

const router:Router = Router()

router
.get('/',createUser)
.get('/user_id',readUser)
.put('/user_id',updateUser)
.delete('/user_id',deleteUser)


export default router