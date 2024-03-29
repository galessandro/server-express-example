import { Router } from 'express'
import UserApplication from '../../application/user.application'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infraestructure/user.infraestructure'
import UserController from './controller'

const infraestructure: UserRepository = new UserInfraestructure()
const application: UserApplication = new UserApplication(infraestructure)
const controller = new UserController(application)

class UserRouter {
   readonly expressRouter: Router

   constructor() {
      this.expressRouter = Router()
      this.mounRoutes()
   }

   mounRoutes() {
      // design pattern: chain of responsability https://refactoring.guru/design-patterns/chain-of-responsibility
      // forma 1
      this.expressRouter.get('/', controller.list)
      this.expressRouter.get('/:guid', controller.listOne)
      this.expressRouter.post('/', controller.insert)
      this.expressRouter.put('/:guid', controller.update)
      // this.expressRouter.delete('/:guid', controller.delete)

      // forma 2
      // this.expressRouter.get('/list', (req, res) => {
      //    controller.list(req, res)
      // })
   }
}

export default new UserRouter().expressRouter
