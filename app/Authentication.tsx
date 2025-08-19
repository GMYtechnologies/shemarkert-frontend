"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeToggle from './ThemeToggle';
import { ArrowLeft, User, Building2, Shield } from 'lucide-react';

// Define the shape of the user data to ensure type safety
interface UserData {
  email: string;
  userType: string;
  name: string;
  businessId?: string;
}

interface AuthPageProps {
  setUser: (user: UserData) => void;
  setUserType: (type: string) => void;
}

export default function AuthPage({ setUser, setUserType }: AuthPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Sign In & Sign Up Form State are kept separate for clarity and distinct field validation
  const [signInData, setSignInData] = useState({
    email: '', userType: '', businessName: '', username: '', password: '', adminCode: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    email: '', userType: '', businessName: '', businessId: '', username: '', password: '', confirmPassword: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    // Determine user data based on account type
    const name = signInData.userType === 'seller' ? signInData.businessName : signInData.username;
    const userData = { email: signInData.email, userType: signInData.userType, name };
    let destination = '';

    try {
      if (signInData.userType === 'admin') {
        if (signInData.adminCode !== 'SHEMARKET_ADMIN_2024') {
          setErrorMessage('Invalid admin code.');
          return;
        }
        setUser({ ...userData, name: 'Admin' });
        destination = '/admin-dashboard';
      } else {
        setUser(userData);
        destination = signInData.userType === 'seller' ? '/seller-dashboard' : '/buyer-dashboard';
      }
      
      setUserType(signInData.userType);
      router.push(destination);

    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Determine user data and destination based on account type
    const name = signUpData.userType === 'seller' ? signUpData.businessName : signUpData.username;
    const businessId = signUpData.userType === 'seller' ? signUpData.businessId : undefined;
    const userData = { email: signUpData.email, userType: signUpData.userType, name, businessId };
    const destination = signUpData.userType === 'seller' ? '/seller-dashboard' : '/buyer-dashboard';
    
    try {
      setUser(userData);
      setUserType(signUpData.userType);
      router.push(destination);
    } finally {
      setIsLoading(false);
    }
  };

  // Use a generic type T for the form data to provide type safety
  const commonFields = <T extends { email: string; userType: string; }>(
    data: T, 
    setData: React.Dispatch<React.SetStateAction<T>>, 
    isSignUp: boolean
  ) => (
    <>
      <div className="space-y-2">
        <Label htmlFor={`${isSignUp ? 'signup' : 'signin'}-email`}>Email</Label>
        <Input
          id={`${isSignUp ? 'signup' : 'signin'}-email`}
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${isSignUp ? 'signup' : 'signin'}-usertype`}>I am a</Label>
        <Select 
          value={data.userType} 
          onValueChange={(value: T["userType"]) => setData({ ...data, userType: value as T['userType'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Buyer
              </div>
            </SelectItem>
            <SelectItem value="seller">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Seller
              </div>
            </SelectItem>
            {!isSignUp && (
              <SelectItem value="admin">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </div>
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <ThemeToggle size="sm" />
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-garbata-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle>Welcome to SheMarket</CardTitle>
            <CardDescription>
              Join Tanzania&apos;s premier women&apos;s fashion marketplace
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-destructive/10 text-destructive border border-destructive p-3 rounded-md">
                      {errorMessage}
                    </div>
                  )}
                  {commonFields(signInData, setSignInData, false)}
                  {signInData.userType === 'seller' && (
                    <div className="space-y-2">
                      <Label htmlFor="signin-business-name">Business Name</Label>
                      <Input
                        id="signin-business-name"
                        placeholder="Enter your business name"
                        value={signInData.businessName}
                        onChange={(e) => setSignInData({ ...signInData, businessName: e.target.value })}
                        required
                      />
                    </div>
                  )}
                  {signInData.userType === 'buyer' && (
                    <div className="space-y-2">
                      <Label htmlFor="signin-username">Username</Label>
                      <Input
                        id="signin-username"
                        placeholder="Enter your username"
                        value={signInData.username}
                        onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
                        required
                      />
                    </div>
                  )}
                  {signInData.userType === 'admin' && (
                    <div className="space-y-2">
                      <Label htmlFor="signin-admin-code">Admin Access Code</Label>
                      <Input
                        id="signin-admin-code"
                        type="password"
                        placeholder="Enter admin access code"
                        value={signInData.adminCode}
                        onChange={(e) => setSignInData({ ...signInData, adminCode: e.target.value })}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-garbata-gradient hover:opacity-90" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-destructive/10 text-destructive border border-destructive p-3 rounded-md">
                      {errorMessage}
                    </div>
                  )}
                  {commonFields(signUpData, setSignUpData, true)}
                  {signUpData.userType === 'seller' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="signup-business-name">Business Name</Label>
                        <Input
                          id="signup-business-name"
                          placeholder="Enter your business name"
                          value={signUpData.businessName}
                          onChange={(e) => setSignUpData({ ...signUpData, businessName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-business-id">Business Registration Number</Label>
                        <Input
                          id="signup-business-id"
                          placeholder="Enter your business registration number"
                          value={signUpData.businessId}
                          onChange={(e) => setSignUpData({ ...signUpData, businessId: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}
                  {signUpData.userType === 'buyer' && (
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        placeholder="Choose a username"
                        value={signUpData.username}
                        onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-garbata-gradient hover:opacity-90" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
