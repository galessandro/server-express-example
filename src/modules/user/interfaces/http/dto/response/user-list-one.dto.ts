import { UserProperties } from 'src/modules/user/domain/user'
import { DTO } from './dto.interface'

interface UserDTO {
   name: string
   lastname: string
   email: string
   guide: string
}

export type UserListOneDTO = UserDTO

export class UserListOneMapping extends DTO<UserProperties, UserListOneDTO> {
   execute(data: UserProperties): UserListOneDTO {
      return {
         name: data.name,
         lastname: data.lastname,
         email: data.email.value,
         guide: data.guid,
      }
   }
}
