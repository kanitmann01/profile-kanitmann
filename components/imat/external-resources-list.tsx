import { ExternalResourceCard } from "./external-resource-card";
import type { ResourceLink } from "@/data/imat/types";

interface ExternalResourcesListProps {
  resources: ResourceLink[];
  className?: string;
}

export function ExternalResourcesList({
  resources,
  className,
}: ExternalResourcesListProps) {
  if (resources.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="font-serif text-xl text-foreground mb-3">
        Recommended Resources
      </h3>
      <div className="grid gap-2">
        {resources.map((resource) => (
          <ExternalResourceCard key={resource.url} resource={resource} />
        ))}
      </div>
    </div>
  );
}
