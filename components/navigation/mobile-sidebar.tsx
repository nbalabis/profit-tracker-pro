import { Menu } from "lucide-react";
import { Store } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
  isSubscribed: boolean;
  ownedStores: Store[];
  remainingProducts: number;
}

const MobileSidebar = ({
  isSubscribed = false,
  ownedStores,
  remainingProducts,
}: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar
          isSubscribed={isSubscribed}
          ownedStores={ownedStores}
          remainingProducts={remainingProducts}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
