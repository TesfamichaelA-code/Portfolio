import { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useTheme } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { trackEvent } from '../utils/analytics';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check environment variables.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'tesfamichaelad@gmail.com',
        sent_time: new Date().toLocaleString(),
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 5000,
        icon: '🚀',
      });

      // Track successful form submission
      trackEvent('contact_form_submitted', {
        success: true,
        timestamp: new Date().toISOString()
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);
      
      // Track failed form submission
      trackEvent('contact_form_error', {
        success: false,
        error_type: error instanceof Error ? error.message : 'unknown',
        timestamp: new Date().toISOString()
      });
      
      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes('Invalid user ID')) {
          toast.error('EmailJS configuration error: Invalid Public Key. Please check your setup.');
        } else if (error.message.includes('Service not found')) {
          toast.error('EmailJS configuration error: Service ID not found. Please check your setup.');
        } else if (error.message.includes('Template not found')) {
          toast.error('EmailJS configuration error: Template ID not found. Please check your setup.');
        } else {
          toast.error('Failed to send message. Please try again or contact me directly at tesfamichaelad@gmail.com');
        }
      } else {
        toast.error('Failed to send message. Please try again or contact me directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 relative overflow-hidden"
    >
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            color: theme === 'dark' ? '#fff' : '#111827',
            border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
          },
          success: {
            style: {
              border: '1px solid #10b981',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-surface/90 via-surface to-surface/90 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-20'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-foreground-muted mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you! 
            Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-surface/40 backdrop-blur-md border border-line rounded-xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                {/* Background glow effects */}
                <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -left-24 -top-24 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-foreground-muted text-sm">Email</p>
                        <a 
                          href="mailto:tesfamichaelad@gmail.com"
                          className="text-foreground hover:text-cyan-400 transition-colors duration-300"
                        >
                          tesfamichaelad@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="text-foreground-muted text-sm">Location</p>
                        <p className="text-foreground">Addis Ababa, Ethiopia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-green-500/10 text-green-400">
                        <CheckCircle size={24} />
                      </div>
                      <div>
                        <p className="text-foreground-muted text-sm">Response Time</p>
                        <p className="text-foreground">Usually within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-line">
                    <p className="text-foreground-muted text-sm italic">
                      "I'm always excited to work on new projects and collaborate with fellow developers!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-surface/40 backdrop-blur-md border border-line rounded-xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
              {/* Background glow effects */}
              <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -left-24 -top-24 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground-sub mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-line-alt rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground-sub mb-2">
                      Your Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-line-alt rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground-sub mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-foreground-muted" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-line-alt rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or just say hello!"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-surface transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-foreground"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-line">
                  <p className="text-foreground-muted text-xs text-center">
                    Your message will be sent directly to my email inbox. I respect your privacy and will never share your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;