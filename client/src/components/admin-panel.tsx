import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Music, Video, Image, Calendar, MessageSquare } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import MusicTracksManager from "./admin/music-tracks-manager";
import YoutubeVideosManager from "./admin/youtube-videos-manager";
import GalleryManager from "./admin/gallery-manager";
import EventsManager from "./admin/events-manager";
import ContactsManager from "./admin/contacts-manager";

interface AdminPanelProps {
  admin: { id: string; username: string };
  onLogout: () => void;
}

export default function AdminPanel({ admin, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("music");
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    queryClient.clear();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                Welcome, {admin.username}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Music
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="music" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Music Tracks Management</CardTitle>
                  <CardDescription>
                    Manage your music tracks with Spotify and YouTube integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MusicTracksManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>YouTube Videos Management</CardTitle>
                  <CardDescription>
                    Manage YouTube videos displayed on your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <YoutubeVideosManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Photo Gallery Management</CardTitle>
                  <CardDescription>
                    Manage images displayed in your photo gallery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GalleryManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Events Management</CardTitle>
                  <CardDescription>
                    Manage upcoming events and performances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EventsManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>
                    View and manage contact form submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactsManager />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}