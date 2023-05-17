//design pattern factory: https://refactoring.guru/design-patterns/abstract-factory
import { v4 as uuidv4 } from 'uuid'
import User, { UserProperties } from './user'
import { UserPasswordService } from './services/user-password.service'
import { EmailVO } from './value-objects/email.vo'
import { err, ok, Result } from 'neverthrow'
import {
   UserEmailRequiredException,
   UserLastNameRequiredException,
   UserNameRequiredException,
   UserPasswordLengthInvalidException,
   UserPasswordRequiredException,
} from './exceptions/user.exception'

export type UserResult = Result<
   User,
   | UserNameRequiredException
   | UserLastNameRequiredException
   | UserPasswordRequiredException
   | UserEmailRequiredException
   | UserPasswordLengthInvalidException
>

// design pattern factory: https://refactoring.guru/design-patterns/abstract-factory
export default class UserFactory {
   async create(name: string, lastname: string, email: EmailVO, password: string): Promise<UserResult> {
      if (!name || name.trim() === '') {
         return err(new UserNameRequiredException())
      }
      if (!lastname || lastname.trim() === '') {
         return err(new UserLastNameRequiredException())
      }
      if (!email || email.value.trim() === '') {
         return err(new UserEmailRequiredException())
      }
      if (!password || password.trim() === '') {
         return err(new UserPasswordRequiredException())
      }
      if (password.length < 5) {
         return err(new UserPasswordLengthInvalidException(password))
      }

      const passwordHash = await UserPasswordService.hash(password)

      const userProperties: UserProperties = {
         name,
         lastname,
         email,
         password: passwordHash,
         guid: uuidv4(),
         refreshToken: uuidv4(),
      }

      const user = new User(userProperties)
      return ok(user);
   }
}
