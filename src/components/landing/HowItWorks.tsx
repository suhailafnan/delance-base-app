// src/components/landing/HowItWorks.tsx
export function HowItWorks() {
    const steps = [
      {
        step: "1",
        title: "Connect Wallet & Create Profile",
        description: "Connect your Web3 wallet and set up your freelancer or client profile with skills and preferences"
      },
      {
        step: "2", 
        title: "Browse or Post Gigs",
        description: "Clients post gigs with locked funds, freelancers browse and apply to projects that match their skills"
      },
      {
        step: "3",
        title: "Complete Work & Get Paid",
        description: "Deliver your work, client approves, and you receive instant payment plus reputation NFT"
      }
    ];
  
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to start earning on the blockchain
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  