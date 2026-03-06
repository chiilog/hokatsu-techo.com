import { EmptyState } from "@/components/layout/EmptyState";
import { NurseryCard } from "@/components/nursery/NurseryCard";
import type { Nursery } from "@/types/nursery";

interface NurseryListProps {
  nurseries: Nursery[];
}

export function NurseryList({ nurseries }: NurseryListProps) {
  if (nurseries.length === 0) {
    return (
      <EmptyState
        message="まだ園が登録されていません"
        description="見学候補の園を追加しましょう"
        showAddButton
      />
    );
  }

  return (
    <ul className="space-y-3" data-testid="nursery-list">
      {nurseries.map((nursery) => (
        <li key={nursery.id}>
          <NurseryCard nursery={nursery} />
        </li>
      ))}
    </ul>
  );
}
