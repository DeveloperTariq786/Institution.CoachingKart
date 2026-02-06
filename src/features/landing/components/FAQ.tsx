import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Will students be able to access coaching from home?",
    answer: "Yes, students can attend live classes and watch recorded lectures from anywhere using the app."
  },
  {
    question: "Can I customize my coaching branding?",
    answer: "Yes, you can add your coaching name, logo, description, and choose your own color theme."
  },
  {
    question: "Can I add courses, programs, and lectures easily?",
    answer: "Yes, you can easily add courses, programs, batches, and upload recorded lectures through the dashboard."
  },
  {
    question: "Can I manage faculty through the app?",
    answer: "Yes, you can add faculty members, assign them to courses, and display their profiles."
  },
  {
    question: "Can I show my offline coaching center details?",
    answer: "Yes, you can list your offline coaching centers along with their locations so students can find them easily."
  },
  {
    question: "Can I display student results on the app?",
    answer: "Yes, you can showcase your results and achievements to help students and parents evaluate your coaching."
  },
  {
    question: "Can any student access our lectures, or only registered students?",
    answer: "Only registered students can access your lectures and course content. Your content remains private and secure for enrolled students only."
  },
  {
    question: "Can we add multiple centers for our tuition?",
    answer: "Yes, you can add multiple centers and anage all of them under one Institution."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            For more understanding, visit{" "}
            <span className="text-gradient">FAQs</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl border-none px-6"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
