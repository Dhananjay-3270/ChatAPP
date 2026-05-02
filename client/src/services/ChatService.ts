import { HttpMethod } from "../../core/utils/enum";
import { NetworkManager } from "../Networkmanager";
import { Apiendpoints } from "./Endpoints";




export class ChatService {
    static getChats = async (search: string) => {
        const response = await NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.GET,
                url: Apiendpoints.getChats(search),
            })
        return await response.data
    }
    static getAllMessages = async (chatId: string) => {
        const response = await NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.GET,
                url: Apiendpoints.getAllMessages(chatId),


            })
        return await response.data
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
    static createChat = (email: string) => {
        return NetworkManager.getInstance().appRequest(
            {
                method: HttpMethod.POST,
                url: Apiendpoints.createChat,
                data: JSON.stringify({
                    email: email
                })
            })
    }


} 