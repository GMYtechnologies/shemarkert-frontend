"use client";

import React, { useState } from 'react';
import { User, Building2 } from 'lucide-react';

// A mock useRouter hook to allow the component to run without Next.js
const useRouter = () => {
  return {
    push: (path: string) => console.log(`Simulating navigation to: ${path}`),
  };
};

// Assumes these components are available via shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface UserData {
  email: string;
  userType: string;
  name: string;
  businessId?: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState({
    email: '', userType: '', businessName: '', businessId: '', username: '', password: '', confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id.replace('signup-', '')]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setData({ ...data, userType: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    const destination = data.userType === 'seller' ? '/seller-dashboard' : '/buyer-dashboard';

    try {
      console.log('Signing up user:', userData);
      router.push(destination);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-garbata-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Join Tanzania&apos;s premier women&apos;s fashion marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-destructive/10 text-destructive border border-destructive p-3 rounded-md">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="Enter your email" value={data.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-usertype">I am a</Label>
              <Select value={data.userType} onValueChange={handleSelectChange}>
                <SelectTrigger><SelectValue placeholder="Select account type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer"><div className="flex items-center gap-2"><User className="h-4 w-4" />Buyer</div></SelectItem>
                  <SelectItem value="seller"><div className="flex items-center gap-2"><Building2 className="h-4 w-4" />Seller</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            {data.userType === 'seller' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="signup-business-name">Business Name</Label>
                  <Input id="signup-business-name" placeholder="Enter business name" value={data.businessName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-business-id">Business Registration Number</Label>
                  <Input id="signup-business-id" placeholder="Enter business registration number" value={data.businessId} onChange={handleChange} required />
                </div>
              </>
            )}
            {data.userType === 'buyer' && (
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input id="signup-username" placeholder="Choose a username" value={data.username} onChange={handleChange} required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="Create a password" value={data.password} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-confirm-password">Confirm Password</Label>
              <Input id="signup-confirm-password" type="password" placeholder="Confirm password" value={data.confirmPassword} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full bg-garbata-gradient hover:opacity-90" disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default function App() { return <SignUpPage />; }
