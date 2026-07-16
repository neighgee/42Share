import { PageContainer } from "@/components/layout/PageContainer";

export default function Loading() {
  return (
    <PageContainer>
      <div className="grid gap-4 py-10">
        <div className="h-8 w-32 rounded-md bg-neutral-100" />
        <div className="h-12 w-full rounded-md bg-neutral-100" />
        <div className="h-44 w-full rounded-md bg-neutral-100" />
        <div className="h-44 w-full rounded-md bg-neutral-100" />
      </div>
    </PageContainer>
  );
}
