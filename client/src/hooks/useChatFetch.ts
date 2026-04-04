

import { ChatService } from '../services/ChatService'
import { useFetch } from './useFetch'



export function useChatFetch<TData = unknown, TError = unknown>(key: string[], search: string, options?: any) {
  const fetchChats = (() => ChatService.getChats(search) as Promise<TData>);
  return useFetch<TData, TError>([key], fetchChats, options);
}



