

import { ChatService } from '../services/ChatService'
import { useFetch } from './useFetch'



export function useChatFetch<TData = unknown, TError = unknown>(key: string, options?: any) {
  const fetchChats = (() => ChatService.getChats() as Promise<TData>);
  return useFetch<TData, TError>([key], fetchChats, options);
}



