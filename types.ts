import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER" | "PORTAR" | "CONTABIL" | "SUPERADMIN"
export type Booking = {
  starts_at: Date
  ends_at: Date
  intrare_complex: number
  loc_parcare: number
  loc_pescuit: number[]
  casuta: number[]
  total_price: number
}
export type Query = {
  approvalCode: string
  booking_id: string
  language: string
  orderId: string
  refNum: string
  token: string
}

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
