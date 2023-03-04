import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'

const users: User[] = [
   new User({
      name: 'German',
      lastname: 'Granados',
      email: 'granados@gmail.com',
      password: 'ggranados08',
      active: true,
      refreshToken: 'abc123',
   }),
   new User({
      name: 'French',
      lastname: 'Granados',
      email: 'french@gmail.com',
      password: 'gfrench08',
      active: true,
      refreshToken: 'abcd1234',
   }),
]

export default class UserInfraestructure implements UserRepository {
   list(): any {
      return users
   }

   listOne(guid: string): User {
      const user: User = Object.assign(
         {},
         users.find((el: User) => el.properties().guid === guid),
      )
      console.log('user list', user)
      return user
   }

   insert(user: User): any {
      console.log('user inserted', user)
      return user
   }

   update(user: User): any {
      console.log('user updated', user)
      return user
   }
}
