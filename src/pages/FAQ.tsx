import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import faqHeroBg from '../assets/faq-hero-bg.jpg';
const faqData = [{
  question: "What is the best time to visit Nepal?",
  answer: "The best time to visit Nepal depends on your activities. For trekking and mountain views, October-November and March-May are ideal. For wildlife viewing in the lowlands, October-March is perfect. Monsoon season (June-September) brings lush greenery but can affect trekking conditions."
}, {
  question: "Do I need a visa to visit Nepal?",
  answer: "Most visitors need a visa to enter Nepal. Tourist visas are available on arrival at Tribhuvan International Airport and major land borders. You can also apply online through the Department of Immigration's website. Visas are typically valid for 15, 30, or 90 days."
}, {
  question: "What should I pack for trekking in Nepal?",
  answer: "Essential items include: warm clothing layers, waterproof jacket, sturdy hiking boots, sleeping bag, headlamp, first aid kit, water purification tablets, and personal medications. We provide a detailed packing list based on your specific trek and season."
}, {
  question: "Is travel insurance required?",
  answer: "While not legally required, we strongly recommend comprehensive travel insurance that covers trekking activities, helicopter evacuation, and medical expenses. Many trekking areas are remote, and evacuation costs can be very expensive."
}, {
  question: "What is the accommodation like during treks?",
  answer: "Accommodation varies by trek. Popular routes like Everest Base Camp and Annapurna Circuit offer tea houses with basic but comfortable rooms. Remote treks may require camping. We'll inform you about accommodation options when planning your trip."
}, {
  question: "How physically demanding are the treks?",
  answer: "Trek difficulty varies greatly. Some treks are suitable for beginners, while others require excellent fitness. We assess each trek's difficulty and provide fitness recommendations. Most treks involve walking 5-7 hours daily with significant altitude changes."
}, {
  question: "What about altitude sickness?",
  answer: "Altitude sickness is a serious concern on high-altitude treks. We include acclimatization days in our itineraries and provide guidance on recognizing symptoms. Our guides are trained in altitude sickness prevention and response."
}, {
  question: "Can you arrange airport transfers?",
  answer: "Yes, we provide airport pickup and drop-off services. Our representative will meet you at Tribhuvan International Airport with a sign bearing your name. This service is included in most of our packages."
}, {
  question: "What if I need to cancel my trip?",
  answer: "Cancellation policies vary by service and timing. Generally, cancellations made 30+ days in advance receive partial refunds. Travel insurance can help cover cancellation costs due to unforeseen circumstances. We'll explain specific terms when you book."
}, {
  question: "Do you provide equipment rental?",
  answer: "Yes, we rent trekking equipment including sleeping bags, down jackets, trekking poles, and more. Rental gear is available in Kathmandu and can be arranged before your trek. We'll provide a list of available equipment and prices."
}];
const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-r from-nepal-primary to-nepal-orange text-white pt-24 pb-16" style={{
      backgroundImage: `linear-gradient(rgba(18, 104, 148, 0.8), rgba(255, 125, 51, 0.6)), url(${faqHeroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-tm-sans">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-inter">
              Find answers to common questions about traveling to Nepal
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            

            <div className="space-y-4">
              {faqData.map((faq, index) => <div key={index} className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 hover:shadow-md">
                  <button onClick={() => toggleItem(index)} className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-muted/50 transition-colors duration-200">
                    <span className="text-lg font-medium text-foreground font-tm-sans pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openItem === index ? <Minus className="h-5 w-5 text-muted-foreground" /> : <Plus className="h-5 w-5 text-muted-foreground" />}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold font-tm-sans mb-4 text-slate-50">
              Still have a questions?
            </h3>
            <p className="mb-8 text-blue-100">
              Can't find the answer you're looking for? Please chat to our 
              friendly team and we'll help you out.
            </p>
            <Button size="lg" className="bg-nepal-primary hover:bg-nepal-primary/90 text-white px-8 py-3 font-medium">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default FAQ;