import { AuthParams, AuthProviderProps } from "@saas-ui/auth"

type CustomUser = {
  email: string;
  password: string;
}

export const createAuthService = (): AuthProviderProps<CustomUser> => {
  let user: CustomUser | null = null

  return {
    onLogin: async (params: AuthParams) => {
      if (params.email && params.password) {
        user = { email: params.email, password: params.password }
        return user
      }
      return null
    },
    onSignup: async (params: AuthParams) => {
      if (params.email && params.password) {
        user = { email: params.email, password: params.password }
        return user
      }
      return null
    },
    onVerifyOtp: async (params: AuthParams) => {
      return true // check if params.otp is valid
    },
    onLogout: async () => {
      user = null
    },
    onAuthStateChange: (callback) => {
      // Set up and event handler that calls `callback(user)` with the current user or undefined if the user is logged out
      return () => {
        // Remove the event handler
      }
    },
    onLoadUser: async () => {
      return user
    },
    onGetToken: async () => {
      // return a session token if it's supported.
      return null
    },
    onResetPassword: async (params: AuthParams) => {
      if (params.email) {
        return { email: params.email }
      }
      return null
    },
    onUpdatePassword: async (params: AuthParams) => {
      // update the user's password, eg after sending a reset password email
    },
  }
}