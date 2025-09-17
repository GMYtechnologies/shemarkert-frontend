"use client";
// import { ModeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import React from "react";
import { Sparkles, Heart, Star, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Homie from "@/components/homie";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-garbata-gradient">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-20">
          {/* Theme Toggle in top right */}
          <div className="absolute top-6 right-6">
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl text-white mb-6">
                Discover Your Perfect
                <span className="block text-garbata-cream"> Fashion Style</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-lg">
                Connect with exclusive women&apos;s fashion sellers and discover unique pieces that express your individuality.
              </p>
              <Button
                onClick={() => router.push('/signup')}
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full"
              >
                Join Our Fashion Community
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
             
            </div>
            <div className="flex-1">
              <Image
                src="/images/landinggirl2.jpg"
                alt="Fashion Collection"
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl text-center mb-16 text-garbata-gradient">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-16 h-16 bg-garbata-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl mb-4">Curated Collections</h3>
              <p className="text-muted-foreground">
                Discover handpicked fashion pieces from verified sellers who understand women&apos;s style.
              </p>
            </Card>

            <Card className="p-8 text-center border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-16 h-16 bg-garbata-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl mb-4">Community Driven</h3>
              <p className="text-muted-foreground">
                Rate and review products and shops to help other women make informed fashion choices.
              </p>
            </Card>

            <Card className="p-8 text-center border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-16 h-16 bg-garbata-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl mb-4">Premium Experience</h3>
              <p className="text-muted-foreground">
                Access exclusive features with our subscription including top-rated products and trending items.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl text-center mb-16 text-garbata-gradient">
            How It Works
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-garbata-gradient rounded-full flex items-center justify-center text-white text-sm">1</div>
                  <div>
                    <h3 className="text-lg mb-2">Sign Up</h3>
                    <p className="text-muted-foreground">Choose to join as a buyer or seller with our easy registration process.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-garbata-gradient rounded-full flex items-center justify-center text-white text-sm">2</div>
                  <div>
                    <h3 className="text-lg mb-2">Explore & Connect</h3>
                    <p className="text-muted-foreground">Browse categories, search products, and connect directly with sellers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-garbata-gradient rounded-full flex items-center justify-center text-white text-sm">3</div>
                  <div>
                    <h3 className="text-lg mb-2">Shop & Share</h3>
                    <p className="text-muted-foreground">Purchase your favorite items and share your experience with the community.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/landingshop.jpeg"
                alt="Shopping Experience"
                width={500}
                height={400}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>       
      
      {/* CTA Section */}
       <section className="py-20 bg-garbata-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-6">
            Ready to Transform Your Fashion Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of women who are already discovering amazing fashion finds and building their perfect wardrobe.
          </p>
          <Button
            onClick={() => router.push('/signup')}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-xl mb-4 text-garbata-gradient">SheMarket</h3>
          <p className="text-muted-foreground">
            Connecting women with their perfect fashion choices since 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
