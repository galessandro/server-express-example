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
      // this.expressRouter.get('/list', controller.list)

      // forma 2
      this.expressRouter.get('/list', (req, res) => {
         controller.list(req, res)
      })

      this.expressRouter.get('/list/:id', (req, res) => {
         controller.listOne(req, res)
      })

      this.expressRouter.get('/insert', (req, res) => {
         controller.insert(req, res)
      })

      this.expressRouter.get('/update', (req, res) => {
         controller.update(req, res)
      })

      this.expressRouter.get('/delete', (req, res) => {
         controller.delete(req, res)
      })

      // this.expressRouter.get('/description', (req, res) => {
      //    res.send('User: German')
      // })

      // this.expressRouter.get('/list', (req, res) => {
      //    res.json([
      //       { username: 'ggranados', active: true },
      //       { username: 'mbaldeon', active: true },
      //    ])
      // })

      // this.expressRouter.get('/detail', (req, res) => {
      //    res.json({ username: 'ggranados', active: true })
      // })

      // this.expressRouter.get('/delete', (req, res) => {
      //    res.send('User deleted successfully')
      // })
   }
}

export default new UserRouter().expressRouter
