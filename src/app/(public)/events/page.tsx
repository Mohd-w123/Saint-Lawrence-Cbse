import { eventService } from "@/services/event.service";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming school events",
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function PublicEventsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const result = await eventService.findPublished(page, 12);

  return (
    <main>
      <Container className="py-12">
        <h1 className="text-3xl font-bold mb-8">Events</h1>
        {result.data.length === 0 ? (
          <p className="text-muted-foreground">No upcoming events.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((item) => (
              <Link key={item._id.toString()} href={`/events/${item.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  {item.image && (
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(item.eventDate).toLocaleDateString()}
                      {item.startTime && ` · ${item.startTime}`}
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
