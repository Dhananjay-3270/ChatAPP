
import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";



export class SearchService {

    static search = async (search: string) => {
        const response = await NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.GET,
                url: Apiendpoints.search(search),
            })
        return await response.data
    }



}