import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Award,
  Headphones,
  CheckCircle2,
  Camera,
  Mountain,
  Utensils,
  Compass
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrendingExperiences from "@/components/TrendingExperiences";

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [isLiked, setIsLiked] = useState(false);

  const experience = {
    id: id || "1",
    title: "Majestic Mountain Adventures",
    location: "Swiss Alps, Switzerland",
    rating: 4.8,
    reviewCount: 2847,
    price: 299,
    originalPrice: 399,
    duration: "3 days",
    groupSize: "8-12 people",
    guide: "Marco Silva",
    images: [
      "/lovable-uploads/56628e38-93c6-4daf-bc37-68b2e759d39e.png",
      "/lovable-uploads/a26300b1-f01d-4f86-880d-99c4fc88d181.png",
      "/lovable-uploads/b8be241b-a5f1-405b-850a-283612b2441f.png",
      "/lovable-uploads/cd69aa7a-1ff4-42aa-b8fa-d8ee8cdf17c4.png",
      "/lovable-uploads/dbe53354-4e12-429d-96e9-f53b18d9b259.png",
      "/lovable-uploads/ddc3747c-a8f5-4c25-a089-0b698516a18a.png"
    ],
    description: "Embark on an unforgettable journey through the breathtaking Swiss Alps. This comprehensive adventure combines scenic mountain railways, pristine alpine lakes, and authentic Swiss culture.",
    highlights: [
      "Scenic train rides through mountain passes",
      "Visit to traditional Swiss villages",
      "Lake boat tours and mountain hiking",
      "Swiss cuisine and wine tasting",
      "Professional mountain guide",
      "Small group experience (max 12 people)"
    ],
    included: [
      "Professional mountain guide",
      "All transportation during the tour",
      "Accommodation (2 nights mountain lodge)",
      "All meals and refreshments",
      "Safety equipment and gear",
      "Professional photography service"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Alpine Village Tour",
        activities: [
          "Meet at Zurich Central Station",
          "Scenic train journey to Interlaken",
          "Walking tour of traditional Alpine village",
          "Swiss cuisine dinner at local restaurant"
        ]
      },
      {
        day: "Day 2", 
        title: "Mountain Adventure and Lake Experience",
        activities: [
          "Early morning mountain railway to Jungfraujoch",
          "Guided glacier walk and ice palace visit",
          "Afternoon boat tour on Lake Thun",
          "Sunset viewing from mountain lodge"
        ]
      },
      {
        day: "Day 3",
        title: "Final Exploration and Departure",
        activities: [
          "Morning hike to scenic viewpoint",
          "Visit to local cheese and chocolate factory",
          "Shopping time in mountain village",
          "Return journey to Zurich"
        ]
      }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === experience.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? experience.images.length - 1 : prev - 1
    );
  };

  const handleBookNow = () => {
    navigate('/checkout', {
      state: {
        experience: {
          title: experience.title,
          image: experience.images[0],
          rating: experience.rating,
          reviewCount: experience.reviewCount,
          guide: experience.guide,
          price: experience.price
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section with Image Gallery */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="relative w-full h-full">
            <img 
              src={experience.images[currentImageIndex]} 
              alt={experience.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {experience.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-12">
                <div className="max-w-2xl text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-white/90">{experience.location}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{experience.title}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{experience.rating}</span>
                      <span className="text-white/80">({experience.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{experience.groupSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {experience.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {experience.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Highlights
                    </h3>
                    <ul className="space-y-2">
                      {experience.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Itinerary */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {experience.itinerary.map((day, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{day.day}</Badge>
                              <h3 className="font-semibold text-lg">{day.title}</h3>
                            </div>
                            <ul className="space-y-2">
                              {day.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Activity Icons */}
              <section>
                <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Camera className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="font-medium">Photography</p>
                    <p className="text-sm text-muted-foreground">Professional photos included</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mountain className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="font-medium">Mountain Views</p>
                    <p className="text-sm text-muted-foreground">Breathtaking Alpine scenery</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Utensils className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="font-medium">Local Cuisine</p>
                    <p className="text-sm text-muted-foreground">Authentic Swiss dishes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Compass className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="font-medium">Expert Guide</p>
                    <p className="text-sm text-muted-foreground">Local mountain expert</p>
                  </div>
                </div>
              </section>

              {/* Reviews Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{experience.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((review) => (
                    <Card key={review}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <span className="font-semibold">JD</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">Jane Doe</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">2 weeks ago</p>
                            <p className="text-sm">
                              Amazing experience! The guide was knowledgeable and the views were absolutely breathtaking. 
                              Would definitely recommend this tour to anyone visiting Switzerland.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Booking Card */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold">${experience.price}</span>
                      <span className="text-lg text-muted-foreground line-through">${experience.originalPrice}</span>
                      <span className="text-sm text-muted-foreground">per person</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input 
                            type="date" 
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Number of Guests</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select 
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                            value={selectedGuests}
                            onChange={(e) => setSelectedGuests(Number(e.target.value))}
                          >
                            {[1,2,3,4,5,6,7,8].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>${experience.price} x {selectedGuests} guests</span>
                        <span>${experience.price * selectedGuests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>$25</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(experience.price * selectedGuests) + 25}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <Button 
                        onClick={handleBookNow}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Book Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setIsLiked(!isLiked)}
                        className={isLiked ? "text-red-500 border-red-200" : ""}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Guide Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Your Guide</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <span className="font-semibold text-lg">MS</span>
                      </div>
                      <div>
                        <p className="font-semibold">{experience.guide}</p>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm">4.9 (127 reviews)</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Mountain climbing expert with 8+ years experience</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Book With Confidence */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-blue-900">Book With Confidence</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-900 font-medium">Free Cancellation</p>
                          <p className="text-blue-700 text-sm">Cancel up to 24 hours before your experience</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-900 font-medium">Quality Guaranteed</p>
                          <p className="text-blue-700 text-sm">All our experiences are carefully vetted</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Headphones className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-900 font-medium">24/7 Support</p>
                          <p className="text-blue-700 text-sm">We're here to help before, during, and after your trip</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Experiences */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <TrendingExperiences />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExperienceDetail;
