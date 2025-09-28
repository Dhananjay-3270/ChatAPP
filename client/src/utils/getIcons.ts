import { MessageCircle, Users, Search, Bird } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function getIcons(index: number): LucideIcon {
    switch (index) {
        case 0:
            return MessageCircle;
        case 1:
            return Users;
        case 2:
            return Search;
        default:
            return Bird;
    }
}