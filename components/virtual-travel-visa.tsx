import Image from "next/image";
import { Shield, Globe, CreditCard, ArrowRight, Zap, Lock } from "lucide-react";

export function VirtualTravelVisa() {
  const cards = [
    {
      name: "RedotPay",
      image: "/images/redotpaycard.jpeg",
      link: "https://url.hk/i/en/6ysyt",
      description: "Experience seamless global spending with RedotPay's virtual Visa card. Enjoy instant card issuance, competitive exchange rates, and secure transactions across 180+ countries.",
      features: [
        { icon: Zap, text: "Instant virtual card activation" },
        { icon: Globe, text: "Accepted worldwide at millions of merchants" },
        { icon: Shield, text: "Bank-grade security with 256-bit encryption" },
        { icon: CreditCard, text: "Zero foreign transaction fees" },
      ],
      color: "from-blue-600 to-blue-800",
      accent: "bg-blue-600",
    },
    {
      name: "Wise",
      image: "/images/wise.png",
      link: "https://wise.com/invite/ihpc/anslemb",
      description: "Transform your travel spending with Wise's multi-currency account. Hold 50+ currencies, transfer money at real exchange rates, and spend like a local anywhere in the world.",
      features: [
        { icon: Globe, text: "Hold 50+ currencies in one account" },
        { icon: Zap, text: "Real exchange rates, no hidden fees" },
        { icon: Lock, text: "FDIC insured up to $250,000" },
        { icon: Shield, text: "Instant notifications and spending controls" },
      ],
      color: "from-emerald-600 to-teal-700",
      accent: "bg-emerald-600",
    },
    {
      name: "Trustyfy",
      image: "/images/trustyfy.png",
      link: "https://app.trustyfy.com?by=101ld0",
      description: "One solution for crypto,banking,cards and freedom",
      features: [
        { icon: CreditCard, text: "Crypto-friendly virtual card" },
        { icon: Zap, text: "Works with Apple Pay, Google Pay, and more" },
        { icon: Shield, text: "Crypto-friendly bank accounts" },
        { icon: Globe, text: "In multiple currencies" },
        { icon: ArrowRight, text: "Convert fiat to crypto & vice-versa" },
      ],
      color: "from-orange-600 to-amber-700",
      accent: "bg-orange-600",
    },
  ];

  return (
    <section className="section bg-gradient-to-b from-background via-surface-2 to-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="overline">Financial Tools</span>
          <h2 className="text-responsive-h2 mb-4">
            Virtual Travel <span className="text-gradient">Visa Cards</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover secure and convenient financial solutions designed for modern travelers. 
            Manage your spending globally with confidence.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.name}
              className="group relative"
            >
              {/* Card Container */}
              <div className="card h-full flex flex-col overflow-hidden border-2 border-border/50 hover:border-primary/30 transition-all duration-300">
                
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${card.color} p-6 md:p-8 relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                  </div>
                  
                  {/* Card Title */}
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {card.name}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base">
                      Your global travel companion
                    </p>
                  </div>
                </div>

                {/* Card Image */}
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-surface-2 to-surface overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <Image
                      src={card.image}
                      alt={`${card.name} Virtual Card`}
                      width={400}
                      height={250}
                      className="object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col">
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {card.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className={`mt-0.5 ${card.accent} rounded-full p-0.5`}>
                          <feature.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary mt-auto w-full"
                  >
                    Get Card
                  </a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span>Global Acceptance</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-sunset" />
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>FDIC Insured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
