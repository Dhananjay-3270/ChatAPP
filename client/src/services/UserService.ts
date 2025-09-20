import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";




export class UserService {

    static getUsers = () => {
        return NetworkManager.getInstance().appRequest(

            {
                method: HttpMethod.GET,
                url: Apiendpoints.getUsers

            }

        )
    }

}