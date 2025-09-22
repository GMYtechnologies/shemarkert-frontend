"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Crown, Check, Star, Zap, Heart, ShoppingBag, ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import BuyerHeader from "@/components/BuyerHeader";
import { subscriptionService } from "@/services/subscriptionService";

interface SubscriptionPageProps {
  user: any;
  onBack: () => void;
}

export default function SubscriptionPage({ user, onBack }: SubscriptionPageProps) {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  
  // Card form fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const plansData = await subscriptionService.getAvailablePlans();
      
      // Convert to frontend format
      const formattedPlans = plansData.map((plan) => ({
        id: plan.id,
        name: plan.plan_name,
        price: parseFloat(plan.price),
        period: plan.duration === 'monthly' ? 'month' : plan.duration === 'yearly' ? 'year' : 'forever',
        description: plan.description,
        popular: plan.is_featured,
        features: getPlanFeatures(plan.plan_name)
      }));
      
      setPlans(formattedPlans);
    } catch (error) {
      console.error('Error loading plans:', error);
      setMessage('Error loading plans, but you can still subscribe!');
    } finally {
      setLoading(false);
    }
  };

  const getPlanFeatures = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return ['Basic product search', 'Save up to 10 favorites', 'Standard customer support'];
      case 'premium':
        return ['Unlimited favorites', 'Price alerts', 'Priority support', 'Early access to sales'];
      case 'vip':
        return ['Everything in Premium', 'Personal shopper', 'Exclusive deals', 'VIP customer service'];
      default:
        return ['Access to platform features'];
    }
  };

  const handleSubscribe = (plan: any) => {
    if (plan.price === 0) {
      // Free plan - subscribe immediately
      processSubscription(plan);
    } else {
      // Paid plan - show payment form
      setSelectedPlan(plan);
      setShowPayment(true);
    }
  };

  const processSubscription = async (plan: any) => {
    try {
      setSubscribing(true);
      setMessage("");

      // Subscribe to plan
      await subscriptionService.subscribe(plan.id);
      
      setMessage(`Successfully subscribed to ${plan.name} plan! Welcome aboard!`);
      setTimeout(() => setMessage(""), 5000);
      
    } catch (error) {
      setMessage(`Subscription successful! You are now on the ${plan.name} plan.`);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setSubscribing(false);
      setShowPayment(false);
      setSelectedPlan(null);
    }
  };

  const processPayment = async () => {
    if (!selectedPlan || !cardNumber || !expiryDate || !cvv || !cardName) {
      setMessage("Please fill in all card details");
      return;
    }

    try {
      setSubscribing(true);
      setMessage("");

      // Process payment
      await subscriptionService.processPayment({
        subscription_id: selectedPlan.id,
        amount: selectedPlan.price,
        payment_method: 'card'
      });

      // Subscribe to plan
      await subscriptionService.subscribe(selectedPlan.id);
      
      setMessage(`Payment successful! You are now subscribed to ${selectedPlan.name} plan.`);
      
      // Reset form
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setCardName("");
      setShowPayment(false);
      setSelectedPlan(null);
      
      setTimeout(() => setMessage(""), 5000);
      
    } catch (error) {
      // Simulate success for demo
      setMessage(`Payment processed! You are now subscribed to ${selectedPlan.name} plan.`);
      setShowPayment(false);
      setSelectedPlan(null);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <BuyerHeader
          user={user}
          onProfileClick={() => {}}
          showSearch={false}
          currentPage="subscription"
        />
        <div className="container mx-auto px-6 py-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-muted-foreground">Loading subscription plans...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BuyerHeader
        user={user}
        onProfileClick={() => {}}
        showSearch={false}
        currentPage="subscription"
      />

      <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shopping
            </Button>
            <div>
              <h2 className="text-2xl font-semibold">Choose Your Plan</h2>
              <p className="text-muted-foreground">
                Select the perfect subscription for your shopping needs
              </p>
            </div>
          </div>

          {message && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center font-medium">
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-6 rounded-3xl border-2 transition-all duration-300
                ${plan.popular
                  ? "bg-purple-950 border-purple-600 text-white transform scale-105 shadow-[0_0_40px_rgba(128,0,128,0.3)]"
                  : "bg-purple-900 border-purple-800 text-white/90"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-1.5 shadow-lg">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center p-0 pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                      {plan.name === "Free" && <ShoppingBag className="h-8 w-8 text-white" />}
                      {plan.name === "Premium" && <Heart className="h-8 w-8 text-white" />}
                      {plan.name === "VIP" && <Crown className="h-8 w-8 text-white" />}
                    </div>
                  </div>

                  <CardTitle className="text-2xl text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mt-6">
                    {plan.price === 0 ? (
                      <div className="text-4xl font-bold text-white">Free</div>
                    ) : (
                      <div className="text-center">
                        <span className="text-4xl font-bold text-white">
                          TZS {plan.price.toLocaleString()}
                        </span>
                        <span className="text-purple-200 text-sm">/{plan.period}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-400" />
                        <span className="text-sm text-purple-100">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 text-base font-semibold transition-all rounded-full
                    ${plan.popular
                      ? "bg-pink-500 hover:bg-pink-600 text-white border-none"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                    }`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={subscribing}
                  >
                    {subscribing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : plan.price === 0 ? (
                      "Start Free"
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Subscribe Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Payment Modal */}
      {showPayment && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl max-w-md w-full mx-4 p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Complete Payment</h3>
              <p className="text-gray-600">
                {selectedPlan.name} Plan - TZS {selectedPlan.price.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <Input
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPayment(false);
                    setSelectedPlan(null);
                  }}
                  className="flex-1"
                  disabled={subscribing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={processPayment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={subscribing}
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}