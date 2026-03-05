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
				description="「園を追加する」ボタンから、見学候補の園を追加しましょう"
			/>
		);
	}

	return (
		<div className="space-y-3" data-testid="nursery-list">
			{nurseries.map((nursery) => (
				<NurseryCard key={nursery.id} nursery={nursery} />
			))}
		</div>
	);
}
