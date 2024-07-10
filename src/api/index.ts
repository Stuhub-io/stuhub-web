import { Client } from "@/libs/client";
import { authService } from "./auth";


const privateServices: Client[] = [
    // NOTE: add services ... 
]

const servicesGuard = {
  setAuthToken: (token: string) => {
    privateServices.forEach((service) => service.setAuthToken(token))
  },
  clearAuthToken: () => {
    privateServices.forEach((service) => service.clearAuthToken())
  },
}

export { authService, servicesGuard }