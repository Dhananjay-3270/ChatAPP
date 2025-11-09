import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";
import type { Status } from "../pages/Home";


export class HomePageService {


    static getConfigDetails = () => {
        return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.GET,
                url: Apiendpoints.getHomePageConfig,


            }
        )
    }
    static getStatus = () => {

        return NetworkManager.getInstance().appRequest(

            {
                method: HttpMethod.GET,
                url: Apiendpoints.getStatus
            }
        )


    }
    static updateStatus = (params: Status) => {

        return NetworkManager.getInstance().appRequest(

            {
                method: HttpMethod.POST,
                url: Apiendpoints.updateStatus,
                data: JSON.stringify(params)
            }
        )
    }
}