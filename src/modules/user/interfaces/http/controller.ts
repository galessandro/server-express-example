import { Request, Response } from 'express'
import UserApplication from '../../application/user.application'
import User, { UserProperties } from '../../domain/user'

export default class {
   constructor(private userApplication: UserApplication) {
      // design patt ern: links of methods
      //forma 1
      // this.list = this.list.bind(this);
   }

   list(req: Request, res: Response) {
      const list = this.userApplication.list()
      res.json(list)
   }

   listOne(req: Request, res: Response) {
      const user = this.userApplication.listOne(1)
      res.json(user)
   }

   insert(req: Request, res: Response) {
      const properties: UserProperties = {
         id: 1,
         name: 'John Doe',
         lastname: 'Doe',
         email: 'kenaa@example.com',
         password: '123456',
         refreshToken: 'jricio1234df',
      }
      const user = new User(properties)
      const userInserted = this.userApplication.insert(user)
      res.json(userInserted)
   }

   update(req: Request, res: Response) {
      const properties: UserProperties = {
         id: 1,
         name: 'John Doe',
         lastname: 'Doe',
         email: 'kenaa@example.com',
         password: '123456',
         refreshToken: 'jricio1234df',
      }
      const user = new User(properties)
      const userUpdated = this.userApplication.update(user)
      res.json(userUpdated)
   }

   delete(req: Request, res: Response) {
      const properties: UserProperties = {
         id: 1,
         name: 'John Doe',
         lastname: 'Doe',
         email: 'kenaa@example.com',
         password: '123456',
         refreshToken: 'jricio1234df',
      }
      const user = new User(properties)
      const userDeleted = this.userApplication.delete(user)
      res.json(userDeleted)
   }
}