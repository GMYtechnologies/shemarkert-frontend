"use client";

import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { User, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BuyerSignUp {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
interface SellerSignUp {
  email: string;
  businessName: string;
  businessId: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const AuthPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Role selector (visual) — Buyer (left) or Seller (right)
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

  // Separate signup data for buyer & seller
  const [buyerSignUp, setBuyerSignUp] = useState<BuyerSignUp>({ email: '', username: '', password: '', confirmPassword: '' });
  const [sellerSignUp, setSellerSignUp] = useState<SellerSignUp>({ email: '', businessName: '', businessId: '', username: '', password: '', confirmPassword: '' });

  // Handlers
  const handleBuyerSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBuyerSignUp(prev => ({ ...prev, [id.replace('buyer-','')]: value } as BuyerSignUp));
  };
  const handleSellerSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSellerSignUp(prev => ({ ...prev, [id.replace('seller-','')]: value } as SellerSignUp));
  };

  const handleBuyerSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (buyerSignUp.password !== buyerSignUp.confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      console.log('Creating buyer account:', buyerSignUp);
      // TODO: call API to create buyer
      router.push('/product');
    } catch (err) {
      console.error(err);
      setError('Failed to create buyer account.');
    } finally { setLoading(false); }
  };

  const handleSellerSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (sellerSignUp.password !== sellerSignUp.confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      console.log('Creating seller account:', sellerSignUp);
      // TODO: call API to create seller
      router.push('/sellersdashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to create seller account.');
    } finally { setLoading(false); }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.cardWrapper}>
        <Card className={styles.cardRoot}>
          <div className="flex items-center justify-center pt-8">
            <div className={styles.avatar}>
              <User className="h-8 w-8 text-white" />
            </div>
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-white">Welcome to SheMarket</CardTitle>
            <CardDescription className="text-gray-300">Join Tanzania&apos;s premier women&apos;s fashion marketplace</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Role selector */}
            <div className={styles.roleSelector}>
              <div className="flex w-full max-w-sm gap-4">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`${styles.roleButton} ${role === 'buyer' ? styles.roleActive : ''}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Buyer</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className={`${styles.roleButton} ${role === 'seller' ? styles.roleActive : ''}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Seller</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Single-column Sign Up only (sign-in removed entirely) */}
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>
                {role === 'buyer' ? 'Create Buyer Account' : 'Create Seller Account'}
              </h3>

              {role === 'buyer' ? (
                <form onSubmit={handleBuyerSignUp} className="space-y-4">
                  {error && <div className={styles.errorBox}>{error}</div>}

                  <div>
                    <Label htmlFor="buyer-email" className="text-gray-200">Email</Label>
                    <Input
                      id="buyer-email"
                      value={buyerSignUp.email}
                      onChange={handleBuyerSignUpChange}
                      placeholder="you@example.com"
                      className={styles.inputCustom}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="buyer-username" className="text-gray-200">Username</Label>
                    <Input
                      id="buyer-username"
                      value={buyerSignUp.username}
                      onChange={handleBuyerSignUpChange}
                      placeholder="choose username"
                      className={styles.inputCustom}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="buyer-password" className="text-gray-200">Password</Label>
                      <Input
                        id="buyer-password"
                        type="password"
                        value={buyerSignUp.password}
                        onChange={handleBuyerSignUpChange}
                        placeholder="password"
                        className={styles.inputCustom}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyer-confirmPassword" className="text-gray-200">Confirm Password</Label>
                      <Input
                        id="buyer-confirmPassword"
                        type="password"
                        value={buyerSignUp.confirmPassword}
                        onChange={handleBuyerSignUpChange}
                        placeholder="confirm password"
                        className={styles.inputCustom}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center mt-4">
                    <Button type="submit" className="w-64 py-3 rounded-full" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Account'}
                    </Button>
                  </div>

                  <div className={styles.formFooter}>
                    Already have an account? <button type="button" onClick={() => router.push('/login')} className={styles.smallLink}>Sign in</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSellerSignUp} className="space-y-4">
                  {error && <div className={styles.errorBox}>{error}</div>}

                  <div>
                    <Label htmlFor="seller-email" className="text-gray-200">Business Email</Label>
                    <Input
                      id="seller-email"
                      value={sellerSignUp.email}
                      onChange={handleSellerSignUpChange}
                      placeholder="business@example.com"
                      className={styles.inputCustom}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="seller-businessName" className="text-gray-200">Business Name</Label>
                    <Input
                      id="seller-businessName"
                      value={sellerSignUp.businessName}
                      onChange={handleSellerSignUpChange}
                      placeholder="Business name"
                      className={styles.inputCustom}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="seller-businessId" className="text-gray-200">Business Registration Number</Label>
                    <Input
                      id="seller-businessId"
                      value={sellerSignUp.businessId}
                      onChange={handleSellerSignUpChange}
                      placeholder="Registration No."
                      className={styles.inputCustom}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="seller-username" className="text-gray-200">Username</Label>
                    <Input
                      id="seller-username"
                      value={sellerSignUp.username}
                      onChange={handleSellerSignUpChange}
                      placeholder="choose username"
                      className={styles.inputCustom}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="seller-password" className="text-gray-200">Password</Label>
                      <Input
                        id="seller-password"
                        type="password"
                        value={sellerSignUp.password}
                        onChange={handleSellerSignUpChange}
                        placeholder="password"
                        className={styles.inputCustom}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="seller-confirmPassword" className="text-gray-200">Confirm Password</Label>
                      <Input
                        id="seller-confirmPassword"
                        type="password"
                        value={sellerSignUp.confirmPassword}
                        onChange={handleSellerSignUpChange}
                        placeholder="confirm"
                        className={styles.inputCustom}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center mt-4">
                    <Button type="submit" className="w-64 py-3 rounded-full" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Account'}
                    </Button>
                  </div>

                  <div className={styles.formFooter}>
                    Already have an account? <button type="button" onClick={() => router.push('/login')} className={styles.smallLink}>Sign in</button>
                  </div>
                </form>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function Page() { return <AuthPage />; }
