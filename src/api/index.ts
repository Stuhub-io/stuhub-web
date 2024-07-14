import { Client } from "@/libs/client";
import { authService } from "./auth";


const privateServices: Client[] = [
    // NOTE: add services ... 
    authService
]

const servicesGuard = {
  setAuthToken: (token: string) => {
    privateServices.forEach((service) => service.setAuthToken(token))
  },
  clearAuthToken: () => {
    privateServices.forEach((service) => service.clearAuthToken())
  },
  hasAuthToken: () => {
    return privateServices.every(s => s.hasAuthToken())
  }
}

export { authService, servicesGuard }