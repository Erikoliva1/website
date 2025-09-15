import { useQuery } from "@tanstack/react-query";
import { Calendar, AlertCircle, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@shared/schema";

export default function EventsSection() {
  const { data: events = [], isLoading, error, refetch } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Helper function to format date
  const formatEventDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  // Helper function to format time
  const formatEventTime = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  // Handle loading state
  if (isLoading) {
    return (
      <section id="events" className="py-20 bg-secondary" data-testid="events-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 section-title">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join me for live performances and musical experiences
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section id="events" className="py-20 bg-secondary" data-testid="events-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 section-title">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join me for live performances and musical experiences
            </p>
          </div>
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <p className="text-muted-foreground mb-4">
                Failed to load events. Please try again.
              </p>
              <Button variant="outline" onClick={() => refetch()} data-testid="button-retry-events">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-secondary" data-testid="events-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 section-title">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join me for live performances and musical experiences
          </p>
        </div>
        
        {events.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No upcoming events scheduled at the moment.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Check back soon for new performances and shows!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const dateInfo = formatEventDate(event.eventDate);
              const timeInfo = formatEventTime(event.eventDate);
              
              return (
                <div key={event.id} className="glass-effect p-6 rounded-xl card-3d" data-testid={`event-${event.id}`}>
                  <div className="flex items-center mb-4">
                    <div className="bg-accent text-black p-3 rounded-lg mr-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">{dateInfo.day}</div>
                        <div className="text-sm">{dateInfo.month}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold mb-1">{event.title}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-accent text-sm font-semibold">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{timeInfo}</span>
                    </div>
                    {event.price && (
                      <Badge variant="secondary">
                        {event.price}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center gap-2">
                    {event.ticketUrl ? (
                      <a 
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold px-4 py-2 rounded-lg text-sm flex-1 text-center"
                        data-testid={`book-tickets-${event.id}`}
                      >
                        Book Tickets
                      </a>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        disabled
                        data-testid={`tickets-soon-${event.id}`}
                      >
                        Tickets Soon
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}