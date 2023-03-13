import { Request, Response } from 'express'
import UserApplication from '../../application/user.application'
import User from '../../domain/user'
import UserFactory from '../../domain/user-factory'
import { EmailVO } from '../../domain/value-objects/email.vo'
import { UserDeleteDTO } from './dto/response/user-delete.dto'
import { UserInsertMapping, UserInsertOneDTO } from './dto/response/user-insert.dto'
import { UserListOneDTO, UserListOneMapping } from './dto/response/user-list-one.dto'
import { UserListDTO, UserListMapping } from './dto/response/user-list.dto'

export default class {
   constructor(private userApplication: UserApplication) {
      // design patt ern: links of methods
      //forma 1
      this.list = this.list.bind(this)
      this.listOne = this.listOne.bind(this)
      this.insert = this.insert.bind(this)
      this.update = this.update.bind(this)
      this.delete = this.delete.bind(this)
   }

   list(req: Request, res: Response) {
      const list = this.userApplication.list()
      const result: UserListDTO = new UserListMapping().execute(list)
      res.json(result)
   }

   listOne(req: Request, res: Response) {
      const { guid } = req.params
      const user = this.userApplication.listOne(guid)
      const result: UserListOneDTO = new UserListOneMapping().execute(user.properties())
      res.json(result)
   }

   async insert(req: Request, res: Response) {
      const { name, lastname, email, password } = req.body
      const user: User = await new UserFactory().create(name, lastname, EmailVO.create(email), password)

      const userInserted = this.userApplication.insert(user)
      const result: UserInsertOneDTO = new UserInsertMapping().execute(userInserted)
      res.json(result)
   }

   update(req: Request, res: Response) {
      const { guid } = req.params
      const { name, lastname, email, password } = req.body
      const user = this.userApplication.listOne(guid)
      user.update({ name, lastname, email: EmailVO.create(email), password })
      const userUpdated = this.userApplication.update(user)
      res.json(userUpdated)
   }

   delete(req: Request, res: Response) {
      const { guid } = req.params
      const user = this.userApplication.listOne(guid)
      user.delete()
      const userDeleted = this.userApplication.update(user)
      const result = new UserDeleteDTO().execute(userDeleted)
      res.json(result)
   }
}
