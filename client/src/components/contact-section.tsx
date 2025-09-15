import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if ReCAPTCHA is enabled
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const isRecaptchaEnabled = Boolean(recaptchaSiteKey);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      recaptchaToken: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
      // Reset reCAPTCHA on error so user can try again
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      form.setValue("recaptchaToken", "");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: InsertContact) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    form.setValue("recaptchaToken", token || "");
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    form.setValue("recaptchaToken", "");
    toast({
      title: "reCAPTCHA expired",
      description: "Please complete the reCAPTCHA verification again.",
      variant: "destructive",
    });
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);
    form.setValue("recaptchaToken", "");
    toast({
      title: "reCAPTCHA error",
      description: "There was an issue loading reCAPTCHA. Please try again.",
      variant: "destructive",
    });
  };

  const socialLinks = [
    { icon: FaYoutube, href: "#", className: "youtube", label: "YouTube" },
    { icon: FaFacebookF, href: "#", className: "facebook", label: "Facebook" },
    { icon: FaInstagram, href: "#", className: "instagram", label: "Instagram" },
    { icon: FaTiktok, href: "#", className: "tiktok", label: "TikTok" },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary" data-testid="contact-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's connect for collaborations, bookings, or just to share the love of music
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass-effect p-8 rounded-xl">
            <h3 className="font-display text-2xl font-semibold mb-6 text-accent section-title">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                // Handle validation errors, especially for reCAPTCHA
                if (errors.recaptchaToken) {
                  toast({
                    title: "reCAPTCHA required",
                    description: "Please complete the reCAPTCHA verification to continue.",
                    variant: "destructive",
                  });
                }
              })} className="space-y-6" data-testid="contact-form">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className="bg-secondary border-border text-foreground"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          className="bg-secondary border-border text-foreground"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          rows={5}
                          {...field}
                          className="bg-secondary border-border text-foreground resize-none"
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {isRecaptchaEnabled && (
                  <div className="flex justify-center" data-testid="recaptcha-container">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey!}
                    onChange={handleRecaptchaChange}
                    onExpired={handleRecaptchaExpired}
                    onError={handleRecaptchaError}
                    theme="dark"
                  />
                </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting || (isRecaptchaEnabled && !recaptchaToken)}
                  className="btn-gold w-full py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="submit-button"
                >
                  <Send className="inline w-5 h-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Form>
          </div>
          
          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-xl">
              <h3 className="font-display text-2xl font-semibold mb-6 text-accent section-title">Connect With Me</h3>
              <div className="space-y-4">
                <div className="flex items-center" data-testid="contact-email">
                  <Mail className="text-accent mr-4 w-6 h-6" />
                  <span>prabhat.singer@gmail.com</span>
                </div>
                <div className="flex items-center" data-testid="contact-phone">
                  <Phone className="text-accent mr-4 w-6 h-6" />
                  <span>+977 98xxxxxxxx</span>
                </div>
                <div className="flex items-center" data-testid="contact-location">
                  <MapPin className="text-accent mr-4 w-6 h-6" />
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
            
            <div className="glass-effect p-8 rounded-xl">
              <h3 className="font-display text-2xl font-semibold mb-6 text-accent section-title">Follow My Journey</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`social-icon ${social.className} text-white`}
                    aria-label={social.label}
                    data-testid={`social-link-${social.label.toLowerCase()}`}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
