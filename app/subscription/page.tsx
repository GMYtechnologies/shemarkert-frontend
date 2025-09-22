"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Check,
  Star,
  Zap,
  Heart,
  ShoppingBag,
  Gift,
  ArrowLeft,
  CreditCard,
  Barcode,
  Copy,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import BuyerHeader from "@/components/BuyerHeader";
import { subscriptionService } from "@/services/subscriptionService";
import { Subscription, UserSubscription } from "@/services/subscription";
import {
  formatPrice,
  getPlanFeatures,
  getPlanColor,
} from "@/lib/utils/subscriptionHelpers";

interface SubscriptionPageProps {
  user: any;
  onBack: () => void;
}

export default function SubscriptionPage({
  user,
  onBack,
}: SubscriptionPageProps) {
  // Backend data state
  const [backendPlans, setBackendPlans] = useState<Subscription[]>([]);
  const [currentUserSubscription, setCurrentUserSubscription] =
    useState<UserSubscription | null>(null);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState("");

  // UI state
  const [success, setSuccess] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [paymentType, setPaymentType] = useState<"card" | "lipa">("card");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [paymentPending, setPaymentPending] = useState(false);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  // Load data on component mount
  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setError("");

      console.log("Loading subscription data...");

      const [plans, userSub] = await Promise.all([
        subscriptionService.getAvailablePlans(),
        subscriptionService.getCurrentUserSubscription().catch(() => null),
      ]);

      console.log("Loaded plans:", plans);
      console.log("User subscription:", userSub);

      setBackendPlans(plans);
      setCurrentUserSubscription(userSub);
    } catch (err: any) {
      console.error("Error loading data:", err);
      setError(err.message || "Failed to load subscription data");

      // Fallback to sample data for development
      setBackendPlans([
        {
          id: 1,
          plan_name: "Free",
          price: "0.00",
          duration: "lifetime",
          duration_display: "Lifetime",
          description: "Perfect for casual shoppers",
          is_featured: false,
          is_active: true,
          status: "active",
          status_display: "Active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 2,
          plan_name: "Premium",
          price: "15000.00",
          duration: "monthly",
          duration_display: "Monthly",
          description: "Best for fashion enthusiasts",
          is_featured: true,
          is_active: true,
          status: "active",
          status_display: "Active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 3,
          plan_name: "VIP",
          price: "25000.00",
          duration: "monthly",
          duration_display: "Monthly",
          description: "Ultimate shopping experience",
          is_featured: false,
          is_active: true,
          status: "active",
          status_display: "Active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ] as Subscription[]);
    }
  };

  // Convert backend plans to frontend format
  const plans = backendPlans.map((backendPlan) => ({
    id: backendPlan.id.toString(),
    name: backendPlan.plan_name,
    price: formatPrice(backendPlan.price),
    period:
      backendPlan.duration === "monthly"
        ? "month"
        : backendPlan.duration === "yearly"
        ? "year"
        : backendPlan.duration === "weekly"
        ? "week"
        : "forever",
    description:
      backendPlan.description || `${backendPlan.plan_name} subscription`,
    features: getPlanFeatures(backendPlan.plan_name),
    color: getPlanColor(backendPlan.plan_name),
    popular: backendPlan.is_featured,
    backendId: backendPlan.id,
  }));

  const providers = [
    {
      id: "mpesa",
      name: "M-Pesa",
      logo: "https://cdn.example.com/mpesa.png",
      companyCode: "131345",
      exampleRef: "SUB-1234",
      desc: "Pay via M-Pesa",
    },
    {
      id: "tigo",
      name: "Tigo Pesa",
      logo: "https://cdn.example.com/tigo.png",
      companyCode: "131345",
      exampleRef: "SUB-5678",
      desc: "Pay via Tigo Pesa",
    },
  ];

  const handleSubscribe = async (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    try {
      setSubscribing(true);
      setError("");

      if (plan.price === 0) {
        // Free plan - subscribe directly
        const subscription = await subscriptionService.subscribe(plan.backendId);
        setCurrentUserSubscription(subscription);
        setSuccess(`Successfully subscribed to ${plan.name} plan!`);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        // Paid plan - show payment modal
        setCurrentPlan(plan);
        setShowPaymentModal(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const processPayment = async (
    paymentMethod: string,
    paymentDetails: any = {}
  ) => {
    if (!currentPlan) return;

    try {
      setSubscribing(true);
      setError("");

      // Create payment record
      const payment = await subscriptionService.processPayment({
        subscription_id: currentPlan.backendId,
        amount: currentPlan.price,
        payment_method: paymentMethod,
        ...paymentDetails,
      });

      // Create subscription
      const subscription = await subscriptionService.subscribe(
        currentPlan.backendId
      );

      setCurrentUserSubscription(subscription);
      setSuccess(
        `Successfully subscribed to ${currentPlan.name} plan! Payment ID: ${payment.id}`
      );

      // Close modals
      closePaymentModal();
      closeProvider();

      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setCurrentPlan(null);
    setPaymentType("card");
    setMessage("");
    setPaymentPending(false);
  };

  const openProvider = (provider: any) => {
    setSelectedProvider(provider);
    setMessage("");
    setPaymentPending(false);
    setPhone("");
  };

  const closeProvider = () => {
    setSelectedProvider(null);
  };

  const onLipaHaraka = () => {
    if (!phone.trim()) {
      setMessage("Please enter your phone number.");
      return;
    }
    setMessage(
      `A payment request has been sent to ${phone}. Please confirm on your device.`
    );
    setPaymentPending(true);
  };

  const getCurrentSubscription = () => {
    if (currentUserSubscription) {
      return {
        planId: currentUserSubscription.subscription.id.toString(),
        planName: currentUserSubscription.subscription.plan_name,
        subscribedAt: currentUserSubscription.start_date,
        active: currentUserSubscription.is_active,
      };
    }
    return null;
  };

  const currentSubscription = getCurrentSubscription();

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
              <h2 className="text-2xl font-semibold">Subscription Plans</h2>
              <p className="text-muted-foreground">
                Choose the perfect plan for your shopping needs
              </p>
            </div>
          </div>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setError("")}
                    className="ml-auto"
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {success}
            </div>
          )}

          {currentSubscription && (
            <Card className="border-blue-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">
                      Active Subscription
                    </h3>
                    <p className="text-green-700">
                      You're currently on the{" "}
                      <strong>{currentSubscription.planName}</strong> plan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-6 rounded-3xl border-2 transition-all duration-300
                ${
                  plan.popular
                    ? "bg-purple-950 border-purple-600 text-white transform scale-105 shadow-[0_0_40px_rgba(128,0,128,0.3)]"
                    : "bg-purple-900 border-purple-800 text-white/90"
                }
                ${
                  currentSubscription?.planId === plan.id
                    ? "ring-2 ring-green-500"
                    : ""
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

                {currentSubscription?.planId === plan.id && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center p-0 pb-4">
                  <div className="flex justify-center mb-4">
                    {plan.name === "Free" && (
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-white" />
                      </div>
                    )}
                    {plan.name === "Premium" && (
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <Heart className="h-8 w-8 text-white" />
                      </div>
                    )}
                    {plan.name === "VIP" && (
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <Crown className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-2xl text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-purple-200">
                    {plan.description}
                  </CardDescription>

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
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-400" />
                        <span className="text-sm text-purple-100">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 text-base font-semibold transition-all rounded-full
                    ${
                      plan.popular
                        ? "bg-pink-500 hover:bg-pink-600 text-white border-none"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                    }`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={currentSubscription?.planId === plan.id || subscribing}
                  >
                    {subscribing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : currentSubscription?.planId === plan.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Current Plan
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

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-primary" />
                Why Choose Premium?
              </CardTitle>
              <CardDescription>
                Unlock the full potential of your fashion shopping experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Unlimited Favorites</h4>
                  <p className="text-sm text-muted-foreground">
                    Save as many products as you want to your wishlist
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Price Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your favorite items go on sale
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Early Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Shop sales and new arrivals before everyone else
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold mb-2">VIP Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Priority customer service and personal assistance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can cancel your subscription at any time. Your
                    benefits will continue until the end of your current billing
                    period.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day money-back guarantee for all premium
                    subscriptions. No questions asked!
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    Can I change my plan?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! You can upgrade or downgrade your plan at any
                    time. Changes take effect immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && currentPlan && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-purple-900 border-purple-800 rounded-3xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-purple-700">
              <div>
                <h3 className="text-lg font-semibold text-white">Complete Payment</h3>
                <p className="text-sm text-purple-200">
                  {currentPlan.name} Plan - TZS{" "}
                  {currentPlan.price.toLocaleString()}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={closePaymentModal} className="text-purple-300 hover:text-white">
                ✕
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <Card className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 border-2 border-purple-600 rounded-3xl text-white">
                <CardHeader>
                  <CardTitle className="text-base text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-100">Plan</span>
                      <span className="font-medium text-white">{currentPlan.name}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-white">TZS {currentPlan.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-purple-200">
                      5-day free trial included
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-medium mb-4 text-white">Payment Method</h4>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    className={`p-4 border-2 rounded-lg flex items-center gap-2 transition-colors
                    ${
                      paymentType === "card"
                        ? "border-pink-500 bg-pink-500/10 text-white"
                        : "border-purple-700 hover:border-purple-500 text-purple-200"
                    }`}
                    onClick={() => setPaymentType("card")}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Credit/Debit Card</span>
                  </button>

                  <button
                    className={`p-4 border-2 rounded-lg flex items-center gap-2 transition-colors
                    ${
                      paymentType === "lipa"
                        ? "border-pink-500 bg-pink-500/10 text-white"
                        : "border-purple-700 hover:border-purple-500 text-purple-200"
                    }`}
                    onClick={() => setPaymentType("lipa")}
                  >
                    <Barcode className="h-5 w-5" />
                    <span>LIPA NAMBA</span>
                  </button>
                </div>

                {paymentType === "card" ? (
                  <div className="space-y-3">
                    <Input placeholder="Card Number" className="bg-purple-800 border-purple-700 text-white placeholder-purple-400 focus:border-pink-500" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="MM/YY" className="bg-purple-800 border-purple-700 text-white placeholder-purple-400 focus:border-pink-500" />
                      <Input placeholder="CVV" className="bg-purple-800 border-purple-700 text-white placeholder-purple-400 focus:border-pink-500" />
                    </div>
                    <Input placeholder="Cardholder Name" className="bg-purple-800 border-purple-700 text-white placeholder-purple-400 focus:border-pink-500" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {providers.map((provider) => (
                      <button
                        key={provider.id}
                        className="p-4 border-2 border-purple-700 rounded-lg text-left hover:border-pink-500 transition-colors bg-purple-800 text-purple-200"
                        onClick={() => openProvider(provider)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center">
                            <img
                              src={provider.logo}
                              alt={provider.name}
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-white">
                              {provider.name}
                            </div>
                            <div className="text-xs text-purple-300">
                              {provider.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                className="w-full py-3 text-base font-semibold transition-all rounded-full bg-pink-500 hover:bg-pink-600 text-white border-none"
                size="lg"
                onClick={() => {
                  if (paymentType === "card") {
                    processPayment("card");
                  } else {
                    setMessage(
                      "Choose a provider below for Lipa Namba instructions."
                    );
                  }
                }}
                disabled={subscribing}
              >
                {subscribing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : paymentType === "card" ? (
                  "Pay Now"
                ) : (
                  "View Payment Instructions"
                )}
              </Button>

              {paymentType === "card" && (
                <p className="text-xs text-center text-purple-300">
                  Secure payment processing • Cancel anytime during trial
                </p>
              )}

              {paymentType === "lipa" && message && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Provider Modal */}
      {selectedProvider && currentPlan && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-purple-900 border-purple-800 rounded-3xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-purple-700">
              <strong className="text-lg text-white">{selectedProvider.name}</strong>
              <button className="text-xl text-purple-300 hover:text-white" onClick={closeProvider}>
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-purple-200">
                Tumia Lipa kwa simu {selectedProvider.name}
              </p>

              <div className="flex items-start gap-3 p-4 bg-purple-800 border border-purple-700 rounded-xl text-white">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-semibold text-white">
                    LIPA NO: {selectedProvider.companyCode}
                  </h4>
                  <p className="text-sm text-purple-200">JINA WALII GKUKU (MITANDAO YOTE)</p>
                </div>
              </div>
              <div className="space-y-3">
                <h6 className="font-semibold text-white">MAELEKEZO</h6>
                <ol className="space-y-2 text-sm text-purple-200">
                  <li>1. Piga menu ya mobile money (USSD/app) kama ulivyo.</li>
                  <li>2. Chagua Lipa kwa Namba / Pay by Number.</li>
                  <li className="flex items-center gap-2">
                    3. Weka namba ya kampuni:{" "}
                    <strong className="text-white">{selectedProvider.companyCode}</strong>
                    <button
                      className="p-1 hover:bg-purple-700 rounded text-purple-300"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          selectedProvider.companyCode
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </li>
                  <li className="flex items-center gap-2">
                    4. Weka kumbukumbu/reference:{" "}
                    <strong className="text-white">{selectedProvider.exampleRef}</strong>
                    <button
                      className="p-1 hover:bg-purple-700 rounded text-purple-300"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          selectedProvider.exampleRef
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </li>
                  <li>
                    5. Weka kiasi:{" "}
                    <strong className="text-white">TZS {currentPlan.price.toLocaleString()}</strong>
                  </li>
                  <li>6. Weka PIN na thibitisha.</li>
                </ol>

                {message && (
                  <div className="p-3 bg-purple-800 border border-purple-700 rounded-lg text-sm text-purple-200">
                    {message}
                  </div>
                )}

                {!paymentPending && (
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your phone number (e.g. 0712345678)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-purple-800 border-purple-700 text-white placeholder-purple-400 focus:border-pink-500"
                    />
                    <Button onClick={onLipaHaraka} className="w-full py-3 text-base font-semibold transition-all rounded-full bg-pink-500 hover:bg-pink-600 text-white border-none">
                      Send Payment Request
                    </Button>
                  </div>
                )}

                {paymentPending && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        processPayment("mobile_money", {
                          phone_number: phone,
                          transaction_id: `${selectedProvider.id.toUpperCase()}-${Date.now()}`,
                        })
                      }
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                      disabled={subscribing}
                    >
                      {subscribing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "I have completed payment"
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setPaymentPending(false);
                        setMessage("Payment cancelled.");
                      }}
                      disabled={subscribing}
                      className="text-purple-300 hover:bg-purple-700 hover:text-white rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}