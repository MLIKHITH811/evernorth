import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, ChevronRight, 
  Heart, Shield, Clock, Phone, Mail, MapPin,
  Facebook, Twitter, Linkedin, Instagram} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
      title: "Comprehensive Healthcare Solutions",
      description: "Access world-class healthcare services tailored to your needs"
    },
    {
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2080",
      title: "Personalized Care Plans",
      description: "Get customized healthcare plans designed specifically for you"
    },
    {
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2091",
      title: "24/7 Support",
      description: "Round-the-clock access to healthcare professionals"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-blue-500" />,
      title: "Personalized Care",
      description: "Tailored healthcare solutions that adapt to your unique needs"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Secure & Private",
      description: "Your health information is protected with industry-leading security"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: "Quick Access",
      description: "Instant access to your health records and care providers"
    }
  ];

  const faqs = [
    {
      question: "How do I set up my health profile?",
      answer: "Setting up your profile is easy! Simply click on 'Sign Up', verify your identity, and follow our guided setup process."
    },
    {
      question: "Is my health information secure?",
      answer: "Yes, we use industry-leading encryption and security measures to protect your personal health information."
    },
    {
      question: "Can I add family members to my account?",
      answer: "Absolutely! You can add up to 4 dependents to your account and manage their healthcare needs."
    },
    {
      question: "How quickly can I access care?",
      answer: "With Evernorth, you can access virtual care 24/7 and schedule in-person appointments based on availability."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Evernorth</span>
              </Link>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
                <Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">About Us</Link>
              <Link to="/services" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Services</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Contact</Link>
              <Link to="/resources" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Resources</Link>
              <Link to="/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Sign In</Link>
              <Link to="/register" className="block px-3 py-2 text-blue-600 hover:text-blue-700">Sign Up</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Carousel */}
        <div className="relative h-[600px] overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="min-w-full relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                    <p className="text-xl md:text-2xl mb-8">{item.description}</p>
                    <Link
                      to="/signup"
                      className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-400'}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8">Why Choose Evernorth?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold mt-4">{benefit.title}</h3>
                  <p className="mt-2 text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
         {/* FAQ Section */}
         <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <summary className="cursor-pointer font-semibold text-gray-700">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Control of Your Health?</h2>
            <p className="text-xl text-blue-100 mb-8">Join thousands of members who trust Evernorth with their healthcare needs</p>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">Evernorth</span>
              </div>
              <p className="text-sm">Your trusted partner in healthcare management and wellness solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/services" className="hover:text-white">Services</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1-800-EVERNORTH
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@evernorth.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Bloomfield, CT 06002
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white"><Facebook className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white"><Twitter className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white"><Linkedin className="h-6 w-6" /></a>
                <a href="#" className="hover:text-white"><Instagram className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2023 Evernorth. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                <Link to="/accessibility" className="hover:text-white">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}