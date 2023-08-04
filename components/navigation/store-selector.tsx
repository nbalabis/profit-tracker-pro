"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Store } from "@prisma/client";
import { Check, ChevronDown, Store as StoreIcon } from "lucide-react";

interface StoreSelectorProps {
  stores: Store[];
  className?: string;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({ stores, className }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const currentStore = stores.find((store) => store.id === params.storeId);

  const setCurrentStore = (store: Store) => {
    router.push(`/dashboard/${store.id}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Display selected store as popover trigger */}
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn(
            "group flex w-full cursor-pointer justify-start rounded-lg p-3 py-5 text-sm font-medium text-muted-foreground transition hover:bg-secondary/10 hover:text-secondary",
            className,
          )}
        >
          {currentStore ? (
            <div className="flex flex-1 items-center">
              <StoreIcon className={"mr-3 h-5 w-5"} />
              {currentStore.name}
            </div>
          ) : (
            <div className="flex flex-1 items-center">Select a store</div>
          )}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[264px] border-secondary/10 bg-secondary/10 p-0">
        <Command>
          <CommandList className="bg-primary">
            {/* Dispaly owned stores */}
            {stores.length > 0 && (
              <CommandGroup>
                {stores.map((store: Store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => {
                      setCurrentStore(store);
                      setOpen(false);
                    }}
                    className="text-sm text-muted-foreground transition aria-selected:bg-secondary/10 aria-selected:text-secondary"
                  >
                    <div className="flex flex-1 items-center">
                      <StoreIcon className={"mr-3 h-5 w-5"} />
                      {store.name}
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentStore?.id === store.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSelector;
