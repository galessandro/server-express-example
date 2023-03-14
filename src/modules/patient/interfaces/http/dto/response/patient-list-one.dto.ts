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

export type PatientListOneDTO = PatientDTO

export class PatientListOneMapping extends DTO<PatientProperties, PatientListOneDTO> {
   execute(patient: PatientProperties): PatientListOneDTO {
      return {
         name: patient.name,
         lastname: patient.lastname,
         dni: patient.dni,
         address: patient.address,
         phone: patient.phone,
         email: patient.email.value,
         guid: patient.guid,
      }
   }
}
