import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
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
const ContactFAQ = () => {
  return <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
      
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left hover:text-nepal-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>)}
      </Accordion>
    </div>;
};
export default ContactFAQ;