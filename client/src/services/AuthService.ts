import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";
export type LoginParams = {
    email: string;
    password: string;
}
export type RegisterParams = {
    fullName: string,
    userName: string,
    email: string,
    password: string,
    ConfirmPassword: string
}

export class AuthService {

    static login = (params: LoginParams) => {

        return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.POST,
                url: Apiendpoints.login,
                data: JSON.stringify(params),

            }
        )


    }

    static logout = () => {

        return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.POST,
                url: Apiendpoints.logout,
            }
        )


    }

    static register = (params :RegisterParams) => {

          return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.POST,
                url: Apiendpoints.register,
                data: JSON.stringify(params),

            }
        )
    }

}