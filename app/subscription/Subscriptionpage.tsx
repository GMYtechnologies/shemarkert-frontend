// app/subscription/page.tsx
'use client';

import { JSX, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import './globals.css'
import { ModeToggle } from '../sellers/page';
import { Check, Crown, CreditCard, Barcode, Copy } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  popular?: boolean;
  savings?: number;
};

type Provider = {
  id: string;
  name: string;
  companyCode: string;
  exampleRef: string;
  logo: string;
  desc: string;
};

export default function Page(): JSX.Element {
  const [selected, setSelected] = useState<number>(1);
  const [paymentType, setPaymentType] = useState<'card' | 'lipa'>('card');
  const [showLipaDetails, setShowLipaDetails] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [paymentPending, setPaymentPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const plans: Plan[] = [
    { id: 'monthly', name: 'Monthly', price: 25000, period: 'month', popular: false },
    { id: 'half-yearly', name: 'Half-Yearly', price: 125000, period: '6 months', popular: true, savings: 17 },
    { id: 'yearly', name: 'Yearly', price: 225000, period: 'year', popular: false, savings: 25 },
  ];

  const features = [
    'Premium shops & exclusive collections',
    'Advanced search & recommendations',
    'Priority customer support',
    'Early access to sales',
    'Product analytics & reviews',
    'Unlimited favorites & wishlists',
    'Ad-free browsing',
    'Monthly fashion reports',
  ];

  const plan = plans[selected];

  const providers: Provider[] = [
    {
      id: 'mpesa',
      //name: 'Vodacom M-Pesa',
      companyCode: '009009',
      exampleRef: '903017475880',
      logo: '/images/PINGII.png',
      desc: 'Vodacom M-Pesa (Lipa Namba / Lipa Haraka)',
      name: ''
    },
    {
      id: 'mixx',
      //name: 'Mixx by Yas',
      companyCode: '009111',
      exampleRef: '903011223344',
      logo: '/images/YAS.png',
      desc: 'Mixx by Yas (Lipa Namba supported)',
      name: ''
    },
    {
      id: 'airtel',
      //name: 'Airtel Money',
      companyCode: '008888',
      exampleRef: '903099887766',
      logo: '/images/Capture.png',
      desc: 'Airtel Money (USSD / app)',
      name: ''
    },
    {
      id: 'halo',
      //name: 'Halo Pesa',
      companyCode: '007777',
      exampleRef: '903012345678',
      logo: '/images/halo.png',
      desc: 'Halo Pesa (Lipa Namba supported)',
      name: ''
    },
  ];

  function openProvider(p: Provider): void {
    setSelectedProvider(p);
    setPhone('');
    setMessage('');
    setPaymentPending(false);
  }

  function closeProvider(): void {
    setSelectedProvider(null);
    setPhone('');
    setMessage('');
    setPaymentPending(false);
  }

  function validPhone(v: string): boolean {
    const digits = v.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 13;
  }

  function onLipaHaraka(): void {
    if (!validPhone(phone)) {
      setMessage('Ingiza namba ya simu sahihi (e.g. 07XXXXXXXX).');
      return;
    }
    setMessage('');
    setPaymentPending(true);

    // Simulated async "Lipa Haraka" initiation
    window.setTimeout(() => {
      setMessage(
        `Payment prompt sent to ${phone}. Enter your mobile money PIN on your phone to complete payment of TZS ${plan.price.toLocaleString()}.`
      );
    }, 900);
  }

  function simulateConfirm(): void {
    setPaymentPending(false);
    setMessage(`Malipo yamefanikiwa! You are now subscribed to ${plan.name} plan. TZS ${plan.price.toLocaleString()} charged.`);
    window.setTimeout(() => {
      closeProvider();
    }, 1600);
  }

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setMessage('Copied to clipboard.');
      setTimeout(() => setMessage(''), 1200);
    } catch {
      setMessage('Could not copy.');
      setTimeout(() => setMessage(''), 1200);
    }
  }

  return (
    <div className="sm-page">
      {/* Header */}
      <div className="sm-header">
        <div className="container sm-header-inner">
          <div className="brand">
            <div className="logo"><Crown /></div>
            <div>
              <h1>SheMarket Premium</h1>
              <p className="muted">Unlock the full experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main container (this ensures container is present like your original) */}
      <div className="container">
        {/* Trial Banner */}
        <Card className="trial-card">
          <CardContent className="trial-content">
            <Crown className="trial-icon" />
            <div>
              <h2>5-Day Free Trial</h2>
              <p>Experience all premium features risk-free</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid-layout">
          {/* Plans column */}
          <div className="plans-col">
            <h3>Choose Your Plan</h3>

            <div className="plans-grid">
              {plans.map((p, i) => (
                <Card
                  key={p.id}
                  className={`plan-card ${selected === i ? 'active' : ''}`}
                  onClick={() => setSelected(i)}
                >
                  {p.popular && <Badge className="badge-popular">Most Popular</Badge>}
                  {p.savings && <Badge variant="secondary" className="badge-save">Save {p.savings}%</Badge>}

                  <CardHeader className="plan-header">
                    <CardTitle>{p.name} Premium</CardTitle>
                    <div className="plan-price">TZS {p.price.toLocaleString()} <span className="plan-period">/{p.period}</span></div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Premium Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="features-grid">
                  {features.map((feature, i) => (
                    <div key={i} className="feature-row">
                      <Check className="feature-icon" />
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment column */}
          <div className="payment-col">
            <Card className="order-card sticky">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="order-info">
                  <div className="order-row">
                    <span>Plan</span>
                    <span className="font-medium">{plan.name} Premium</span>
                  </div>

                  <div className="order-row total">
                    <span>Total</span>
                    <span className="total-amount">TZS {plan.price.toLocaleString()}</span>
                  </div>

                  <p className="muted">5-day free trial included</p>
                </div>

                <hr />

                <div className="payment-methods">
                  <h4>Payment Method</h4>

                  <div className="method-list">
                    <div
                      className={`method-item ${paymentType === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentType('card')}
                    >
                      <CreditCard />
                      <span>Credit/Debit Card</span>
                    </div>

                    <div
                      className={`method-item ${paymentType === 'lipa' ? 'selected' : ''}`}
                      onClick={() => { setPaymentType('lipa'); setShowLipaDetails(false); }}
                    >
                      <Barcode />
                      <span>LIPA NAMBA</span>
                    </div>
                  </div>

                  {paymentType === 'card' ? (
                    <div className="card-form">
                      <Input placeholder="Card Number" />
                      <div className="split">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVV" />
                      </div>
                      <Input placeholder="Cardholder Name" />
                    </div>
                  ) : (
                    <>
                      {/* Provider grid (first screenshot) */}
                      <div className="provider-grid">
                        {providers.map((prov: Provider) => (
                          <div key={prov.id} className="provider-card" onClick={() => openProvider(prov)}>
                            <div className="provider-logo">
                              {/* browser will show image if exists; otherwise presented fallback text */}
                              <img src={prov.logo} alt={prov.name} onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
                              <div className="logo-fallback">{prov.name.split(' ')[0]}</div>
                            </div>
                            <div className="prov-title">{prov.name}</div>
                            <div className="prov-desc muted">{prov.desc}</div>
                          </div>
                        ))}
                      </div>

                      <p className="muted small">Tap a provider to continue with Lipa Namba / Lipa Haraka flow.</p>
                    </>
                  )}
                </div>

                <Button
                  className="start-cta"
                  size="lg"
                  onClick={() => {
                    if (paymentType === 'card') {
                      alert(`Welcome to SheMarket Premium! ${plan.name} plan activated.`);
                    } else {
                      alert(`Choose a provider to continue Lipa Namba payment for TZS ${plan.price.toLocaleString()}.`);
                    }
                  }}
                >
                  Start Free Trial
                </Button>

                <p className="muted tiny center">Cancel anytime during trial. Terms apply.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Provider Modal (second screenshot) */}
      {selectedProvider && (
        <div className="modal-root" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-head">
              <strong>{selectedProvider.name}</strong>
              <button className="modal-close" onClick={closeProvider}>✕</button>
            </div>

            <div className="modal-body">
              <p className="muted">Tumia Lipa kwa simu {selectedProvider.name}</p>

              <div className="mobile-row">
                <div className="mobile-icon">📱</div>
                <h1>LIPA NO:131345: JINA WALII GKUKU (MITANDAO YOTE)</h1> 
                
              </div>

              <div className="maelekezo">
                <h6>MAELEKEZO</h6>
                <ol>
                  <li>1.Piga menu ya mobile money (USSD/app) kama ulivyo.</li>
                  <li>2.Chagua Lipa kwa Namba / Pay by Number .</li>
                  <li>3.Weka namba ya kampuni: <strong>{selectedProvider.companyCode}</strong>
                    <button className="copy-btn" onClick={() => copyToClipboard(selectedProvider.companyCode)}><Copy /></button>
                  </li>
                  <li>4.Weka kumbukumbu/reference: <strong>{selectedProvider.exampleRef}</strong>
                    <button className="copy-btn" onClick={() => copyToClipboard(selectedProvider.exampleRef)}><Copy /></button>
                  </li>
                  <li>5.Weka kiasi: <strong>TZS {plan.price.toLocaleString()}</strong></li>
                  <li>6.Weka PIN na thibitisha.</li>
                </ol>

                            {message && <div className="info-box">{message}</div>}

                {paymentPending && (
                  <div className="pending-actions">
                    <button className="confirm" onClick={simulateConfirm}>I have completed payment</button>
                    <button className="ghost" onClick={() => { setPaymentPending(false); setMessage('Payment cancelled.'); }}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-backdrop" onClick={closeProvider} />
        </div>
      )}
    </div>
  );
}
