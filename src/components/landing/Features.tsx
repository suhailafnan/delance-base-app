// src/components/landing/Features.tsx
export function Features() {
    const features = [
      {
        icon: "🔒",
        title: "Trustless Escrow",
        description: "Funds are locked in smart contracts, ensuring freelancers get paid when work is completed"
      },
      {
        icon: "🏆",
        title: "NFT Reputation",
        description: "Build a portable reputation that follows you across platforms and belongs to you forever"
      },
      {
        icon: "⚡",
        title: "Instant Payments",
        description: "Get paid instantly when work is approved, no waiting for bank transfers or payment processing"
      },
      {
        icon: "🌐",
        title: "Global Access",
        description: "Work with anyone, anywhere in the world without borders or traditional banking limitations"
      }
    ];
  
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Delance?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The future of freelancing is here. Built on blockchain for transparency, security, and global access.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-card border border-border shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  