import Patient from '../domain/patient'
import { PatientRepository } from '../domain/patient.repository'

export default class PatientApplication {
   //design pattern: injection dependency https://www.arquitecturajava.com/el-patron-de-inyeccion-de-dependencia/
   constructor(private readonly patientRepository: PatientRepository) {}

   list() {
      return this.patientRepository.list()
   }

   listOne(guid: string) {
      return this.patientRepository.listOne(guid)
   }

   insert(patient: Patient) {
      return this.patientRepository.insert(patient)
   }

   update(patient: Patient) {
      return this.patientRepository.update(patient)
   }
}
