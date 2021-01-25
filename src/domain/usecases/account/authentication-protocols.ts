import { AuthenticationModel } from '@/domain/models/authentication-protocols'
export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationModel>
}
