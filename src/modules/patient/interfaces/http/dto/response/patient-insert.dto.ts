import { PatientProperties } from 'src/modules/patient/domain/patient'
import { DTO } from './dto.interface'

interface PatientDTO {
   name: string
   lastname: string
   dni: string
   address: string
   phone: string
   email: string
   guid: string
}

export type PatientInsertOneDTO = PatientDTO

export class PatientInsertMapping extends DTO<PatientProperties, PatientDTO> {
   execute(data: PatientProperties): PatientInsertOneDTO {
      return {
         name: data.name,
         lastname: data.lastname,
         dni: data.dni,
         address: data.address,
         phone: data.phone,
         email: data.email.value,
         guid: data.guid,
      }
   }
}
