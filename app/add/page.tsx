"use client";

import { useRouter } from "next/navigation";
import { BackHeader } from "@/components/layout/BackHeader";
import { NurseryForm } from "@/components/nursery/NurseryForm";
import { useNurseryStore } from "@/stores/nurseryStore";

export default function AddNurseryPage() {
  const router = useRouter();
  const addNursery = useNurseryStore((s) => s.addNursery);

  const handleAdd = (name: string, visitDate: string | null) => {
    addNursery(name, visitDate);
    router.push("/");
  };

  return (
    <>
      <BackHeader backHref="/" showBackText={false} title="園を追加する" />

      <main className="mx-auto max-w-lg px-4 py-6">
        <NurseryForm onAdd={handleAdd} />
      </main>
    </>
  );
}
