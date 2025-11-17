interface Member {
    userName: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    _id: string;
}

interface Chat {
    members: Member[];
}

/**
 * Get other members in a chat excluding the specified user
 * @param userName - The username to exclude from the results
 * @param chat - The chat object containing members array
 * @returns Array of other members or null if invalid input
 */
export const getOtherMembers = (userName: string, chat: Chat): Member[] | null => {
    // Validate inputs
    if (!userName || !chat) {
        return null;
    }

    // Check if members array exists and is valid
    if (!Array.isArray(chat.members) || chat.members.length === 0) {
        return null;
    }

    // Filter out the current user
    const otherMembers = chat.members.filter(
        (member) => member?.userName && member.userName !== userName
    );

    return otherMembers.length > 0 ? otherMembers : null;
};

/**
 * Get display name for a chat (for 1-on-1 chats, returns the other person's name)
 * @param userName - Current user's username
 * @param chat - The chat object
 * @returns Display name for the chat or fallback
 */
export const getChatDisplayName = (userName: string, chat: Chat): string => {
    const otherMembers = getOtherMembers(userName, chat);

    if (!otherMembers || otherMembers.length === 0) {
        return 'Unknown Chat';
    }

    // For 1-on-1 chats
    if (otherMembers.length === 1) {
        const member = otherMembers[0];
        return member.displayName ||
            `${member.firstName || ''} ${member.lastName || ''}`.trim() ||
            member.userName ||
            'Unknown User';
    }

    // For group chats
    if (otherMembers.length === 2) {
        return otherMembers
            .map(member => member.displayName || member.firstName || member.userName)
            .join(', ');
    }

    // For larger group chats
    const firstTwo = otherMembers.slice(0, 2);
    const remainingCount = otherMembers.length - 2;
    const names = firstTwo
        .map(member => member.displayName || member.firstName || member.userName)
        .join(', ');

    return remainingCount > 0 ? `${names} and ${remainingCount} others` : names;
};

/**
 * Get initials for chat avatar (useful for group chats)
 * @param userName - Current user's username
 * @param chat - The chat object
 * @returns Initials string for avatar
 */
export const getChatInitials = (userName: string, chat: Chat): string => {
    const otherMembers = getOtherMembers(userName, chat);

    if (!otherMembers || otherMembers.length === 0) {
        return 'UC'; // Unknown Chat
    }

    // For 1-on-1 chats, use other person's initials
    if (otherMembers.length === 1) {
        const member = otherMembers[0];
        const name = member.displayName ||
            `${member.firstName || ''} ${member.lastName || ''}`.trim() ||
            member.userName;

        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    // For group chats, use first letters of first two members
    return otherMembers
        .slice(0, 2)
        .map(member => {
            const name = member.displayName || member.firstName || member.userName;
            return name.charAt(0).toUpperCase();
        })
        .join('');
};