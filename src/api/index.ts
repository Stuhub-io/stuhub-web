import { Client } from "@/libs/client";
import { authService } from "./auth";
import { organizationService } from "./organization";
import { userService } from "./user";
import { spaceService } from "./space";


const privateServices: Client[] = [
    // NOTE: add services ... 
    organizationService,
    spaceService,
    userService,
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