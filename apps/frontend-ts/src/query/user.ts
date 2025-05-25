import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { UserService } from '../gen/user_pb';
import type { GetUserResponse } from '../gen/user_pb';
import { useQuery } from '@tanstack/react-query';

const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
});

const client = createClient(UserService, transport);

export const useUserQuery = (userId: string) => {
    return useQuery<GetUserResponse>({
        queryKey: ['user', userId],
        queryFn: async () => {
            if (!userId) throw new Error('Please enter a user ID');
            return client.getUser({ id: userId });
        },
        enabled: !!userId,
    });
}; 