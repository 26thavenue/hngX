import {Router} from 'express'
import {
    getPersons,
    createPerson,
    getPerson,
    updatePerson,
    deletePerson
} from '../controller/controller'

const router:Router = Router()

router
.get('/',getPersons)
.get('/id',getPerson)
.post('/',createPerson)
.put('/id',updatePerson)
.delete('/id',deletePerson)


export default router