import {Router} from 'express'
import {
    createUser,
    readUser,
    updateUser,
    deleteUser
} from '../controller/controller'

const router:Router = Router()

router.post('/',createUser)
router.get('/:id',readUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)


export default router