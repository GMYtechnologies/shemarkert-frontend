import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  onPaymentSuccess: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  planName,
  price,
  onPaymentSuccess,
}: PaymentModalProps) {
  // A function to simulate payment processing.
  // In a real application, you would integrate a payment service here (e.g., Stripe).
  const processPayment = () => {
    // Simulate API call to process payment
    console.log(`Processing payment for ${planName} plan...`);
    
    // Simulate successful payment
    setTimeout(() => {
      onPaymentSuccess();
      onClose(); // Close modal on success
    }, 1500); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Subscription</DialogTitle>
          <DialogDescription>
            You are subscribing to the <strong>{planName}</strong> plan for TZS {price.toLocaleString()}/month.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <p>Please confirm your payment to continue.</p>
          <Button className="w-full" onClick={processPayment}>
            <Zap className="h-4 w-4 mr-2" />
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
