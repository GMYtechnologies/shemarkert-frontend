"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import BuyerHeader from './BuyerHeader';
import ThemeToggle from './ThemeToggle';
import {
  Check,
  Crown,
  ArrowLeft,
  CreditCard,
  Calendar
} from 'lucide-react';

// Define the shape of the User object for type safety
interface User {
  userType: string;
  name?: string;
}

interface SubscriptionPageProps {
  user: User;
}

export default function SubscriptionPage({ user }: SubscriptionPageProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('half-yearly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubscribed, setIsSubscribed] = useState(false); // State to show success message

  const isBuyer = user?.userType === 'buyer';

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Premium',
      price: 25000,
      period: 'month',
      description: 'Perfect for trying out premium features',
      popular: false,
    },
    {
      id: 'half-yearly',
      name: 'Half-Yearly Premium',
      price: 125000,
      period: '6 months',
      description: 'Best value for regular shoppers',
      popular: true,
      savings: '17%',
    },
    {
      id: 'yearly',
      name: 'Yearly Premium',
      price: 225000,
      period: 'year',
      description: 'Maximum savings for fashion enthusiasts',
      popular: false,
      savings: '25%',
    },
  ];

  const features = [
    'Access to premium shops and exclusive collections',
    'Advanced search filters and personalized recommendations',
    'Priority customer support',
    'Early access to sales and new arrivals',
    'Detailed product analytics and reviews',
    'Unlimited product favorites and wishlists',
    'Ad-free browsing experience',
    'Monthly fashion trend reports'
  ];

  const handleSubscribe = () => {
    setIsSubscribed(true); // Set state to show a success message
    setTimeout(() => {
      // Simulate navigation after a brief delay
      if (isBuyer) {
        router.push('/buyer-dashboard');
      } else {
        router.push('/seller-dashboard');
      }
    }, 2000);
  };

  // Conditionally render the header based on user type
  const pageHeader = isBuyer ? (
    <BuyerHeader
      user={user}
      showSearch={false}
      currentPage="subscription"
    />
  ) : (
    <header className="bg-card border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-garbata-gradient rounded-full flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl">SheMarket Premium</h1>
                <p className="text-sm text-muted-foreground">Unlock the full experience</p>
              </div>
            </div>
          </div>
          <ThemeToggle size="sm" />
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-background">
      {pageHeader}

      <div className="container mx-auto px-6 py-8">
        {isSubscribed && (
          <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            Subscription successful! Welcome to SheMarket Premium!
          </div>
        )}

        {/* Trial Banner */}
        <Card className="mb-8 bg-garbata-gradient text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <Crown className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl mb-2">Start Your 5-Day Free Trial</h2>
              <p className="text-white/90">
                Experience all premium features risk-free. Cancel anytime during the trial period.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-2">
            <h3 className="text-xl mb-6">Choose Your Plan</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-garbata-gradient text-white">Most Popular</Badge>
                    </div>
                  )}
                  {plan.savings && (
                    <div className="absolute -top-3 right-4">
                      <Badge variant="secondary">Save {plan.savings}</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl text-primary mb-2">
                      TZS {plan.price.toLocaleString()}
                      <span className="text-sm text-muted-foreground">/{plan.period}</span>
                    </div>
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                      <div className="flex items-center justify-center">
                        <RadioGroupItem value={plan.id} id={plan.id} />
                        <Label htmlFor={plan.id} className="sr-only">
                          Select {plan.name}
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Premium Features</CardTitle>
                <CardDescription>Everything you get with SheMarket Premium</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Plan</span>
                    <span>{plans.find(p => p.id === selectedPlan)?.name}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      TZS {plans.find(p => p.id === selectedPlan)?.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    5-day free trial included. Your subscription will begin after the trial period.
                  </p>
                </div>

                <Separator />

                {/* Payment Method */}
                <div className="space-y-4">
                  <h4>Payment Method</h4>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <Label htmlFor="mobile" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Mobile Money (M-Pesa, Tigo Pesa)
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVV" />
                      </div>
                      <Input placeholder="Cardholder Name" />
                    </div>
                  )}

                  {paymentMethod === 'mobile' && (
                    <div className="space-y-3">
                      <Input placeholder="Mobile Number" />
                      <p className="text-sm text-muted-foreground">
                        You will receive a payment prompt on your phone
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSubscribe}
                  className="w-full bg-garbata-gradient hover:opacity-90"
                  size="lg"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? 'Subscribing...' : 'Start Free Trial'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                  Cancel anytime during your free trial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
