import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  message: string;
  description?: string;
  showAddButton?: boolean;
}

export function EmptyState({
  message,
  description,
  showAddButton = false,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 text-center"
      data-testid="empty-state"
    >
      <p className="font-medium text-lg text-muted-foreground">{message}</p>
      {description && (
        <p className="mt-2 text-muted-foreground text-sm">{description}</p>
      )}
      {showAddButton && (
        <Button asChild size="sm" className="mt-4">
          <Link href="/add">
            <Plus className="mr-1 h-4 w-4" />
            園を追加する
          </Link>
        </Button>
      )}
    </div>
  );
}
