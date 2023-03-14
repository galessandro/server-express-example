import { PatientProperties } from 'src/modules/patient/domain/patient'
import { DTO } from './dto.interface'

interface PatientDTO {
   name: string
}

export class PatientDeleteDTO extends DTO<PatientProperties, PatientDTO> {
   execute(data: PatientProperties): PatientDTO {
      return { name: data.name }
   }
}
