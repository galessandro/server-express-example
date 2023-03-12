import { ValueObject } from './vo.class'

interface EmailProps {
   value: string
}

export class EmailVO extends ValueObject<EmailProps> {
   private constructor(props: EmailProps) {
      super(props)
   }

   static create(email: string): EmailVO {
      if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi)) {
         // eslint-disable-next-line quotes
         throw new Error(`It's not a valid email`)
      }

      return new EmailVO({ value: email })
   }

   get value(): string {
      return this.props.value
   }
}
