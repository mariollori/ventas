import { Router} from 'express'
const router = Router()

import * as ventasctr from '../Controllers/contrventa'
import {checkToken} from '../auth/token_validation'
import {isadmin} from '../Controllers/authcontr'

router.get('/venta',checkToken, ventasctr.listarventas);
router.get('/venta/:id',checkToken, ventasctr.listarunaventa);
router.post('/venta',checkToken,ventasctr.crearventa);
router.delete('/venta/:id',checkToken,ventasctr.eliminarventa);
router.put('/venta/:id', checkToken,ventasctr.modificarventa);


export default router;