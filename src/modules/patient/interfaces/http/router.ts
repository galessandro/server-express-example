import { Router } from 'express'
import PatientApplication from '../../application/patient.application'
import { PatientRepository } from '../../domain/patient.repository'
import PatientInfraestructure from '../../infraestructure/patient.infraestructure'
import PatientController from './controller'


const infraestructure: PatientRepository = new PatientInfraestructure()
const application: PatientApplication = new PatientApplication(infraestructure)
const controller = new PatientController(application)

class PatientRouter {
   readonly expressRouter: Router

   constructor() {
      this.expressRouter = Router()
      this.mounRoutes()
   }

   mounRoutes() {
      this.expressRouter.get('/', controller.list)
      this.expressRouter.get('/:guid', controller.listOne)
      this.expressRouter.post('/', controller.insert)
      this.expressRouter.put('/:guid', controller.update)
      this.expressRouter.delete('/:guid', controller.delete)
   }
}

export default new PatientRouter().expressRouter
