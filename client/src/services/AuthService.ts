import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";
export type LoginParams = {
    email: string;
    password: string;
};

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

}