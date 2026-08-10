import { notFound } from "next/navigation";
import { eventService } from "@/services/event.service";
import { Container } from "@/components/layout/container";
import { RichTextRenderer } from "@/components/shared/rich-text-renderer";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await eventService.findPublishedBySlug(slug);
  if (!event) return { title: "Not Found" };
  return { title: event.title, description: event.description };
}

export default async function PublicEventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await eventService.findPublishedBySlug(slug);
  if (!event) notFound();

  return (
    <main>
      <Container className="py-12 max-w-3xl">
        <article>
          {event.image && (
            <img src={event.image} alt={event.title} className="w-full aspect-video object-cover rounded-lg mb-6" />
          )}
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(event.eventDate).toLocaleDateString()}
            </div>
            {event.startTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {event.startTime}{event.endTime && ` - ${event.endTime}`}
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            )}
          </div>
          {event.description && <p className="text-lg text-muted-foreground mb-6">{event.description}</p>}
          {event.content && <RichTextRenderer content={event.content} />}
          {event.registrationUrl && (
            <div className="mt-8">
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                Register Now <ExternalLink className="h-4 w-4" />
              </a>
              {event.registrationDeadline && (
                <p className="text-sm text-muted-foreground mt-2">
                  Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </article>
      </Container>
    </main>
  );
}
