import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";



export class HomePageService {


    static getConfigDetails = () => {
        return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.GET,
                url: Apiendpoints.getHomePageConfig,


            }
        )
    }

}