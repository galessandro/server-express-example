import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'

const users: User[] = [
   new User({
      id: 1,
      name: 'German',
      lastname: 'Granados',
      email: 'granados@gmail.com',
      password: 'ggranados08',
      active: true,
      refreshToken: 'abc123',
   }),
   new User({
      id: 2,
      name: 'French',
      lastname: 'Granados',
      email: 'french@gmail.com',
      password: 'gfrench08',
      active: true,
      refreshToken: 'abcd1234',
   }),
]

export default class UserInfraestructure implements UserRepository {
   list() {
      return users
   }

   listOne(id: number): User {
      return Object.assign(
         {},
         users.find((el: User) => el.properties().id === id),
      )
   }

   insert(user: User): void {
      console.log('user inserted', user)
   }

   update(user: User): void {
      console.log('user updated', user)
      //   user.update(user.properties())
   }

   delete(user: User): void {
      console.log('user deleted', user)
      user.delete()
   }
}
