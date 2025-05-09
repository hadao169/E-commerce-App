// import Link from "next/link";
// import { FaRegWindowClose } from "react-icons/fa";

// const MobileMenu = ({ onCloseMenu, openMenu }) => {
//   const menuOpen = openMenu ? "translate-x-0 " : "translate-x-[100%]";

//   const navItems = [];
//   return (
//     <ul
//       className={`flex md:hidden flex-col items-start gap-4 py-20 px-[6%] fixed -right-6 top-0 w-[50%] z-50 h-screen transition duration-500 bg-orange-500 ${menuOpen}`}>
//       <div className="absolute right-10 top-6" onClick={onCloseMenu}>
//         <FaRegWindowClose className="text-2xl opacity-70"/>
//       </div>
//       {navItems.map((item, index) => (
//         <li key={index} className="text-[18px]">
//           <Link
//             href={item.href}
//             className="hover:opacity-80 duration-300"
//             onClick={onCloseMenu}>
//             {item.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MobileMenu;
import { EllipsisVertical } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageSwitcher from "./language_switcher";
import Cartbutton from "./cartButton";
import Userbutton from "./userButotn";

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
          <div className="flex items-end gap-2 ml-3">
            <Cartbutton />
          </div>
          <div className="ml-3">
            <Userbutton />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Menu;
