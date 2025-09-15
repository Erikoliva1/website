import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, User } from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import type { Contact } from "@shared/schema";

export default function ContactsManager() {
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
    queryFn: () => apiRequest("/api/admin/contacts"),
  });

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Contact Messages</h3>
        <Badge variant="secondary" data-testid="badge-contact-count">
          {contacts.length} messages
        </Badge>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {contact.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {format(new Date(contact.createdAt), "MMM dd, yyyy 'at' HH:mm")}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        {contacts.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No contact messages yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}