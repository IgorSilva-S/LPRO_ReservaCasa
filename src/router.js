import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import SectionController from './controllers/SectionController'
import HouseController from './controllers/HouseController'
import ReserveController from './controllers/ReserveController'
import DashboardController from './controllers/DashboardController'
import Reserve from './models/Reserve'

const routes = new Router()
const upload = multer(uploadConfig);

routes.post('/sections', SectionController.store)

routes.post('/houses',upload.single('thumbnail'),HouseController.store)
routes.get('/houses', HouseController.index)
//Error
routes.put('/houses/:house_id',upload.single('thumbnail'), HouseController.update)
routes.delete('/houses', HouseController.destroy)

routes.get('/dashboard', DashboardController.show)
//End error

routes.post('/houses/:house_id/reserve', ReserveController.store)
routes.get('/reserves', ReserveController.index)
routes.delete('/reserves/cancel', ReserveController.destroy)

export default routes