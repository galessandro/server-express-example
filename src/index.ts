import ServerBootstrap from './bootstrap/server.bootstrap'
import Application from './app'
import { Bootstrap } from './bootstrap/base.bootstrap'
import DatabaseBootstrap from './bootstrap/database.bootstrap'

const serverBootstrap: Bootstrap = new ServerBootstrap(Application)
const databaseBootstrap: Bootstrap = new DatabaseBootstrap()

;(async () => {
   try {
      await databaseBootstrap.initialize()
      await serverBootstrap.initialize()
      console.log('Server started successfully')
   } catch (error) {
      console.log(error)
   }
})()
