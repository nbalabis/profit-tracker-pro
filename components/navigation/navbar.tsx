import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "./mobile-sidebar";

interface NavbarProps {
  isSubscribed: boolean;
}

const Navbar = ({ isSubscribed = false }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isSubscribed={isSubscribed} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
