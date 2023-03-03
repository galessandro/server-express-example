import { Router } from 'express'

class UserRouter {
   readonly expressRouter: Router

   constructor() {
      this.expressRouter = Router()
      this.mounRoutes()
   }

   mounRoutes() {
      this.expressRouter.get('/description', (req, res) => {
         res.send('User: German')
      })

      this.expressRouter.get('/list', (req, res) => {
         res.json([
            { username: 'ggranados', active: true },
            { username: 'mbaldeon', active: true },
         ])
      })

      this.expressRouter.get('/detail', (req, res) => {
         res.json({ username: 'ggranados', active: true })
      })

      this.expressRouter.get('/delete', (req, res) => {
         res.send('User deleted successfully')
      })
   }
}

export default new UserRouter().expressRouter
