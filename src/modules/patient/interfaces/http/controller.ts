import { Request, Response } from 'express'
import PatientApplication from '../../application/patient.application'
import Patient from '../../domain/patient'
import PatientFactory from '../../domain/patient-factory'
import { EmailVO } from '../../domain/value-objects/email.vo'
import { PatientDeleteDTO } from './dto/response/patient-delete.dto'
import { PatientInsertMapping, PatientInsertOneDTO } from './dto/response/patient-insert.dto'
import { PatientListOneDTO, PatientListOneMapping } from './dto/response/patient-list-one.dto'
import { PatientListDTO, PatientListMapping } from './dto/response/patient-list.dto'

export default class {
   constructor(private patientApplication: PatientApplication) {
      this.list = this.list.bind(this)
      this.listOne = this.listOne.bind(this)
      this.insert = this.insert.bind(this)
      this.update = this.update.bind(this)
      this.delete = this.delete.bind(this)
   }

   list(req: Request, res: Response) {
      const list = this.patientApplication.list()
      const result: PatientListDTO = new PatientListMapping().execute(list)
      res.json(result)
   }

   listOne(req: Request, res: Response) {
      const { guid } = req.params
      const patient = this.patientApplication.listOne(guid)
      const result: PatientListOneDTO = new PatientListOneMapping().execute(patient.properties())
      res.json(result)
   }

   insert(req: Request, res: Response) {
      const { name, lastname, dni, address, phone, email } = req.body
      const patient: Patient = new PatientFactory().create(name, lastname, dni, address, phone, EmailVO.create(email))

      const patientInserted = this.patientApplication.insert(patient)
      const result: PatientInsertOneDTO = new PatientInsertMapping().execute(patientInserted)
      res.json(result)
   }

   update(req: Request, res: Response) {
      const { guid } = req.params
      const { name, lastname, dni, address, phone, email } = req.body
      const patient = this.patientApplication.listOne(guid)
      patient.update({ name, lastname, dni, address, phone, email: EmailVO.create(email) })
      const patientUpdated = this.patientApplication.update(patient)
      res.json(patientUpdated)
   }

   delete(req: Request, res: Response) {
      const { guid } = req.params
      const patient = this.patientApplication.listOne(guid)
      patient.delete()
      const patientDeleted = this.patientApplication.update(patient)
      const result = new PatientDeleteDTO().execute(patientDeleted)
      res.json(result)
   }
}
