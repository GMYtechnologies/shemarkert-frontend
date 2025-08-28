"use client";

import React, { useState } from 'react';
import { User, Building2 } from 'lucide-react';
import {  } from 'next/router';

// A mock useRouter hook to allow the component to run without Next.js

const router = useRouter;

// Assumes these components are available via shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useRouter } from 'next/dist/client/components/navigation';

interface UserData {
  email: string;
  userType: string;
  name: string;
  businessId?: string;
}

const AuthPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentView, setCurrentView] = useState('signup'); // 'signup' or 'signin'
  const [data, setData] = useState({
    email: '', userType: 'seller', businessName: '', businessId: '', username: '', password: '', confirmPassword: ''
  });
  
  // A single state for sign-in data to keep it separate from sign-up data
  const [signInData, setSignInData] = useState({
    email: '', password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (currentView === 'signup') {
      const fieldMap: { [key: string]: keyof typeof data } = {
        'signup-email': 'email',
        'signup-business-name': 'businessName',
        'signup-business-id': 'businessId',
        'signup-username': 'username',
        'signup-password': 'password',
        'signup-confirm-password': 'confirmPassword',
      };
      const fieldName = fieldMap[id];
      if (fieldName) {
        setData({ ...data, [fieldName]: value });
      }
    } else if (currentView === 'signin') {
      const fieldMap: { [key: string]: keyof typeof signInData } = {
        'signin-email': 'email',
        'signin-password': 'password',
      };
      const fieldName = fieldMap[id];
      if (fieldName) {
        setSignInData({ ...signInData, [fieldName]: value });
      }
    }
  };

  const handleSelectChange = (value: string) => {
    setData({ ...data, userType: value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simple frontend routing - ask user to select their account type for signin
      const userType = prompt("Are you a 'buyer' or 'seller'? Please type 'buyer' or 'seller':");
      
      if (userType?.toLowerCase() === 'seller') {
        router.push('/sellers');
      } else if (userType?.toLowerCase() === 'buyer') {
        router.push('/buyer-dashboard');
      } else {
        setError('Please select either "buyer" or "seller"');
        setLoading(false);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const name = data.userType === 'seller' ? data.businessName : data.username;
    const userData: UserData = { email: data.email, userType: data.userType, name, businessId: data.businessId };

    try {
      // In a real app, you would perform an API call here to create the user
      console.log('Signing up user:', userData);
      
      // Route based on selected user type during signup
      if (data.userType === 'seller') {
        console.log('Routing to seller dashboard');
        router.push('/sellers');
      } else if (data.userType === 'buyer') {
        console.log('Routing to buyer dashboard');
        router.push('/buyer-dashboard');
      } else {
        setError('Please select account type');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-[#593c88] border-none shadow-none text-white mt-34">  
      <div className="flex items-center justify-center pt-24">
        <div className="w-16 h-16 bg-[#F3915C] rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
      </div>
          <CardHeader className="text-center">
            <CardTitle className="text-white">Welcome to SheMarket</CardTitle>
            <CardDescription className="text-gray-300">Join Tanzania&apos;s premier women&apos;s fashion marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <Button 
                variant="ghost" 
                className={`w-1/2 rounded-r-none border-b-2 ${currentView === 'signin' ? 'border-[#F3915C]' : 'border-gray-500'} text-white hover:bg-gray-700`}
                onClick={() => setCurrentView('signin')}
              >
                Sign In
              </Button>
              <Button 
                variant="ghost" 
                className={`w-1/2 rounded-l-none border-b-2 ${currentView === 'signup' ? 'border-[#F3915C]' : 'border-gray-500'} text-white hover:bg-gray-700`}
                onClick={() => setCurrentView('signup')}
              >
                Sign Up
              </Button>
            </div>
            {currentView === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                {error && <div className="bg-destructive/10 text-destructive border border-destructive p-3 rounded-md">{error}</div>}
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-300">Email</Label>
                  <Input id="signin-email" type="email" placeholder="Enter your email" value={signInData.email} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-gray-300">Password</Label>
                  <Input id="signin-password" type="password" placeholder="Enter your password" value={signInData.password} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                </div>
                <Button type="submit" className="w-full h-12 text-white font-bold text-lg" style={{ background: 'linear-gradient(to right, #F7418F, #FF894B)' }} disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                {error && <div className="bg-destructive/10 text-destructive border border-destructive p-3 rounded-md">{error}</div>}
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white-300">Email</Label>
                  <Input id="signup-email" type="email" placeholder="Enter your email" value={data.email} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-usertype" className="text-white-300">I am a</Label>
                  <Select value={data.userType} onValueChange={handleSelectChange}>
                    <SelectTrigger className="bg-[#3D226A] text-white border-none placeholder:text-gray-400">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3D226A] text-white border-none">
                      <SelectItem value="buyer"><div className="flex items-center gap-2"><User className="h-4 w-4" />Buyer</div></SelectItem>
                      <SelectItem value="seller"><div className="flex items-center gap-2"><Building2 className="h-4 w-4" />Seller</div></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {data.userType === 'seller' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="signup-business-name" className="text-white-300">Business Name</Label>
                      <Input id="signup-business-name" placeholder="Enter business name" value={data.businessName} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-business-id" className="text-white-300">Business Registration Number</Label>
                      <Input id="signup-business-id" placeholder="Enter business registration number" value={data.businessId} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                    </div>
                  </>
                )}
                {data.userType === 'buyer' && (
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-gray-300">Username</Label>
                    <Input id="signup-username" placeholder="Choose a username" value={data.username} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                  <Input id="signup-password" type="password" placeholder="Create a password" value={data.password} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-gray-300">Confirm Password</Label>
                  <Input id="signup-confirm-password" type="password" placeholder="Confirm password" value={data.confirmPassword} onChange={handleChange} required className="bg-[#3D226A] text-white border-none placeholder:text-gray-400" />
                </div>
                <Button type="submit" className="w-full h-12 text-white font-bold text-lg" style={{ background: 'linear-gradient(to right, #F7418F, #FF894B)' }} disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
  
  );
};

export default function Page() { return <AuthPage />; }