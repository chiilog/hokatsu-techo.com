interface EmptyStateProps {
  message: string;
  description?: string;
}

export function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 text-center"
      data-testid="empty-state"
    >
      <p className="font-medium text-lg text-muted-foreground">{message}</p>
      {description && (
        <p className="mt-2 text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
}
