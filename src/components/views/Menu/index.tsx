import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcomp/ui/dropdown-menu";
import { Menu } from 'lucide-react';

const MenuComp = () => {
    const isBrowser = () => typeof window !== "undefined";

    function handleSignOut() {
        if (isBrowser()) {
            localStorage.removeItem("tokenForBasitTodo")
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Menu color="white" size={33} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>
                    <button onClick={handleSignOut}>
                        Sign Out
                    </button>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MenuComp