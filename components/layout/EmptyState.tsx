import { Heart, Plus } from "lucide-react";
import Link from "next/link";
import { IconCircle } from "@/components/layout/IconCircle";
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
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <IconCircle className="mb-4 size-14 bg-secondary">
        <Heart className="size-7 text-primary" aria-hidden="true" />
      </IconCircle>
      <p className="font-bold text-lg text-muted-foreground">{message}</p>
      {description && (
        <p className="mt-2 text-muted-foreground text-sm">{description}</p>
      )}
      {showAddButton && (
        <Button asChild className="mt-4">
          <Link href="/add">
            <Plus className="mr-1 h-4 w-4" />
            園を追加する
          </Link>
        </Button>
      )}
    </div>
  );
}
