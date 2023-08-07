import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import SubscriptionButton from "../subscription-button";

const ProModal = () => {
  const modal = useProModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <SubscriptionButton isSubscribed={false} />
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
