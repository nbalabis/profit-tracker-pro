"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import Balancer from "react-wrap-balancer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

const ProModal = () => {
  const modal = useProModal();

  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stripe/${selectedPlan}`);

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold">
            Upgrade to Profit Tracker{" "}
            <span className="inline-block bg-gradient-to-tr from-[#3361EB] to-[#59C3C8] bg-clip-text text-transparent">
              Pro
            </span>
          </DialogTitle>
          <DialogDescription className="text-center">
            <Balancer>Upgrade to get access to the following features</Balancer>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex">
            <Check className="mr-3 h-6 w-6" />
            <p className="font-semibold">
              Create up to <span className="font-bold text-primary">3</span>{" "}
              stores
            </p>
          </div>
          <div className="flex">
            <Check className="mr-3 h-6 w-6" />
            <p className="font-semibold">
              Add <span className="font-bold text-primary">unlimited</span>{" "}
              products
            </p>
          </div>
          <div className="flex">
            <Check className="mr-3 h-6 w-6" />
            <p className="font-semibold">
              Access to all{" "}
              <span className="font-bold text-primary">new features</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div
            className="sadow-inner inline-flex cursor-pointer gap-4 rounded-full bg-primary/90 p-1"
            onClick={() => {
              if (selectedPlan === "yearly") {
                setSelectedPlan("monthly");
              } else {
                setSelectedPlan("yearly");
              }
            }}
          >
            <div
              className={cn(
                "flex flex-col items-center justify-start rounded-full px-8 py-1 text-center transition-all",
                selectedPlan === "yearly"
                  ? "bg-white shadow-sm"
                  : "bg-transparent",
              )}
            >
              <p
                className={cn(
                  "text-xs font-light",
                  selectedPlan === "yearly"
                    ? "text-muted-foreground"
                    : "text-muted/50",
                )}
              >
                Yearly
              </p>
              <h3
                className={cn(
                  "text-xl font-extrabold",
                  selectedPlan === "yearly" ? "" : "text-primary-foreground",
                )}
              >
                $97.95
              </h3>
            </div>
            <div
              className={cn(
                "flex flex-col items-center justify-start rounded-full px-8 py-1 text-center transition-all",
                selectedPlan === "monthly"
                  ? "bg-white shadow-sm"
                  : "bg-transparent",
              )}
            >
              <p
                className={cn(
                  "text-xs font-light",
                  selectedPlan === "monthly"
                    ? "text-muted-foreground"
                    : "text-muted/50",
                )}
              >
                Monthly
              </p>
              <h3
                className={cn(
                  "text-xl font-extrabold",
                  selectedPlan === "monthly" ? "" : "text-primary-foreground",
                )}
              >
                $9.97
              </h3>
            </div>
          </div>
          {selectedPlan === "yearly" && (
            <p className="text-xs font-bold tracking-tight text-green-500">
              You Save 18%
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            onClick={onClick}
            disabled={loading}
            className="w-1/2 bg-gradient-to-r from-[#3361EB] to-[#59C3C8] py-6"
          >
            <div className="text-xl  text-secondary-foreground">Subscribe</div>
            <Zap className="ml-2 h-4 w-4 fill-secondary-foreground" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Cancel Anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
