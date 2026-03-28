import { ChatService } from '../services/ChatService'
import { useFetch } from './useFetch'




export function useGetMessages<TData = unknown, TError = unknown>(key: string, selectedChatid: string | "", options?: any) {
    const getAllMessages = (() => ChatService.getAllMessages(selectedChatid) as Promise<TData>)
 
    return useFetch<TData, TError>([key], getAllMessages, options);
}
