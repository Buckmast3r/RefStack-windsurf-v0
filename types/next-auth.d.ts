import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      role: string
      subscriptionPlan?: string
    } & DefaultSession["user"]
  }
}

// Additional NextAuth JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    subscriptionPlan?: string
  }
}
