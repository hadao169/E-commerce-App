import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { countries } from "./footerData";

export function DropdownMenuCountry() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant="outline"
          className="hover:bg-[rgb(208,1,27)]/10 hover:text-[rgb(208,1,27)] transition-colors">
          {countries.title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 bg-white border border-gray-200">
        <DropdownMenuGroup>
          {countries.names.map((country) => (
            <DropdownMenuItem
              key={country}
              className="cursor-pointer hover:bg-[rgb(208,1,27)]/10 hover:text-[rgb(208,1,27)] transition-colors">
              {country}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DropdownMenuCountry;
