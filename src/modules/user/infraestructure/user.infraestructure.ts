import { err, ok, Result } from 'neverthrow'
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'
import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception'
import User, { UserUpdate } from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { EmailVO } from '../domain/value-objects/email.vo'
import { UserEntity } from './user.entity'

export default class UserInfraestructure implements UserRepository {
   async list(): Promise<User[]> {
      const users = await DatabaseBootstrap.dataSource.getRepository(UserEntity).find({ where: { active: true } })
      return users.map(user => {
         const emailResult = EmailVO.create(user.email)
         if (emailResult.isErr()) {
            throw new UserEmailInvalidException()
         }

         return new User({
            guid: user.guid,
            name: user.name,
            lastname: user.lastname,
            email: emailResult.value,
            password: user.password,
            refreshToken: user.refreshToken,
            active: user.active,
         })
      })
   }

   async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
      const user = await DatabaseBootstrap.dataSource
         .getRepository(UserEntity)
         .findOne({ where: { guid, active: true } })

      if (!user) {
         return err(new UserNotFoundException())
      }

      const emailResult = EmailVO.create(user.email)
      if (emailResult.isErr()) {
         return err(new UserEmailInvalidException())
      }

      return ok(
         new User({
            guid: user.guid,
            name: user.name,
            lastname: user.lastname,
            email: emailResult.value,
            password: user.password,
            refreshToken: user.refreshToken,
            active: user.active,
         }),
      )
   }

   async insert(user: User): Promise<User> {
      const userInsert = new UserEntity()
      const { guid, name, lastname, email, password, refreshToken, active } = user.properties()
      Object.assign(userInsert, {
         guid,
         name,
         lastname,
         email: email.value,
         password,
         refreshToken,
         active,
      })

      await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)
      return user
   }

   async update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> {
      console.log(1)
      const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity)
      const userFound = await repo.findOne({ where: { guid: guid } })
      if (!userFound) {
         return err(new UserNotFoundException())
      }

      console.log(2)
      Object.assign(userFound, user)
      const userEntity = await repo.save(userFound)
      const emailResult = EmailVO.create(userEntity.email)

      if (emailResult.isErr()) {
         return err(new UserEmailInvalidException())
      }

      return ok(
         new User({
            guid: userEntity.guid,
            name: userEntity.name,
            lastname: userEntity.lastname,
            email: emailResult.value,
            password: userEntity.password,
            refreshToken: userEntity.refreshToken,
            active: userEntity.active,
         }),
      )
   }
}
