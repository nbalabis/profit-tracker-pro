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
import { Check, ChevronsDownUp, Store as StoreIcon } from "lucide-react";

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
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between", className)}
        >
          {currentStore ? (
            <div className="flex flex-row text-primary">
              <Avatar className="mr-2 h-5 w-5">
                <AvatarFallback>
                  <StoreIcon />
                </AvatarFallback>
              </Avatar>
              {currentStore.name}
            </div>
          ) : (
            <div className="text-primary">Select a store</div>
          )}
          <ChevronsDownUp className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
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
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarFallback>
                        <StoreIcon />
                      </AvatarFallback>
                    </Avatar>
                    {store.name}
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
