import { Router} from 'express'
const router = Router()

import * as authctrl from '../Controllers/authcontr'

router.post('/login', authctrl.login);


export default router;