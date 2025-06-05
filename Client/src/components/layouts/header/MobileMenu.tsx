import { EllipsisVertical } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageSwitcher from "./LanguageSwitcher";
import CartButton from "./CartButton";
import UserButton from "./UserButton";
import Link from "next/link";

const Menu = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="mt-3 cursor-pointer">
          <EllipsisVertical className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent className="bg-orange-500 text-white flex flex-col items-start gap-y-6 px-4">
          <SheetHeader className="w-full">
            <div className="flex items-center justify-between">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </div>
          </SheetHeader>
          <LanguageSwitcher />
          <Link href="/cart">
            <div className="flex items-end gap-2 ml-3">
              <CartButton />
            </div>
          </Link>
          <div className="ml-3">
            <UserButton />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Menu;
