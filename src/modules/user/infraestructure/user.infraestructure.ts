import User, { UserProperties } from '../domain/user'
import UserFactory from '../domain/user-factory'
import { UserRepository } from '../domain/user.repository'
import { EmailVO } from '../domain/value-objects/email.vo'

let users: User[] = []

const promisesUsers = [
   new UserFactory().create('German', 'Granados', EmailVO.create('ggranados@gmail.com'), 'ggranados1234'),
   new UserFactory().create('Mateo', 'Granados', EmailVO.create('mgranados@gmail.com'), 'mgranados09867'),
]

Promise.all(promisesUsers).then(result => (users = result))

export default class UserInfraestructure implements UserRepository {
   list(): UserProperties[] {
      return users.filter((el: User) => el.properties().active).map((el: User) => el.properties())
   }

   listOne(guid: string): User {
      return users.filter((el: User) => el.properties().active).find((el: User) => el.properties().guid === guid)
   }

   insert(user: User): UserProperties {
      users.push(user)
      return user.properties()
   }

   update(user: User): UserProperties {
      const { guid } = user.properties()
      const userIndex: number = users.findIndex((el: User) => el.properties().guid === guid)
      users[userIndex] = user
      return user.properties()
   }
}
