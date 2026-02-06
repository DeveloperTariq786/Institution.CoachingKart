import LandingButton from "@/components/common/LandingButton";

const CTABanner = () => {
  return (
    <section className="hero-gradient py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Join the elite community of educators scaling their impact with ClassConnect.
              </p>
            </div>

            <LandingButton
              text="Start Now"
              size="md"
              rounded="full"
              variant="sky"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
