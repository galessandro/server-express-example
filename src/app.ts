import express, { Application } from 'express'
import routerHealth from './helpers/health'
import routerUsers from './modules/user/interfaces/http/router'
import HandlerErrors from './helpers/errors'

class App {
   readonly expressApp: Application

   constructor() {
      this.expressApp = express()
      this.mounthHealthCheck()
      this.mountMiddlewares()
      this.mountRoutes()
      this.mountErrors()
   }

   mounthHealthCheck() {
      this.expressApp.use('/', routerHealth)
   }

   //no ocupren bodyParser = deprecated
   mountMiddlewares() {
      this.expressApp.use(express.json())
      this.expressApp.use(express.urlencoded({ extended: true }))
   }

   mountRoutes() {
      this.expressApp.use('/user', routerUsers)
   }

   mountErrors(): void {
      this.expressApp.use(HandlerErrors.notFound)
   }
}

export default new App().expressApp
