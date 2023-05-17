import { err, ok, Result } from 'neverthrow'
import { ValueObject } from './vo.class'
import { UserEmailInvalidException } from '../exceptions/user.exception'

interface EmailProps {
   value: string
}

export type EmailResult = Result<EmailVO, UserEmailInvalidException>

export class EmailVO extends ValueObject<EmailProps> {
   private constructor(props: EmailProps) {
      super(props)
   }

   static create(email: string): EmailResult {
      if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi)) {
         return err(new UserEmailInvalidException())
      }

      return ok(new EmailVO({ value: email }))
   }

   get value(): string {
      return this.props.value
   }
}
