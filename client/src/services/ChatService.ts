import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";




export class ChatService {
    static getChats = async () => {
        const response = await NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.GET,
                url: Apiendpoints.getChats,
            })
        return await response.data
    }
    static getAllMessages = (chatId: string) => {
        return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.GET,
                url: Apiendpoints.getAllMessages(chatId),


            })
    }
    static sendMessage = (message: string, chatId: string) => {
        return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.POST,
                url: Apiendpoints.sendMessage,
                data: JSON.stringify({
                    chatId: chatId,
                    content: message
                })
            })

    }


} 