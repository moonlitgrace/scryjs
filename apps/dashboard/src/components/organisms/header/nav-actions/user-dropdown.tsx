import ThemeSelector from '@/components/molecules/theme-selector';
import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { CirclePlus, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-sm" variant="outline">
          <Avatar>
            <AvatarFallback className="bg-transparent">M</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col text-sm">
          <span>moonlitgrace</span>
          <span className="text-muted-foreground text-xs">
            moonlitgrace.gaia@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/'} className="flex-1">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/account'} className="flex-1">
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer items-center justify-between"
            disabled
          >
            <span>Create Org</span>
            <CirclePlus />
          </DropdownMenuItem>
          <div className="inline-flex w-full items-center justify-between px-2 text-sm">
            <span>Theme</span>
            <ThemeSelector />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer items-center justify-between">
            <span>Log out</span>
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
