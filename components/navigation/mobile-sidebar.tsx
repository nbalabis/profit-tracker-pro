import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
  isSubscribed: boolean;
}

const MobileSidebar = ({ isSubscribed = false }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isSubscribed={isSubscribed} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
