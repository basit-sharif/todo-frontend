import { isBrowser } from "@/components/utils/functions";
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

    function handleSignOut() {
        if (isBrowser()) {
            localStorage.removeItem("tokenForBasitTodo")
            window.location.reload();
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