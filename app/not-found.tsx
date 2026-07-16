import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="grid min-h-[calc(100vh-3rem)] place-items-center">
        <section className="grid gap-4 text-center">
          <h1 className="text-2xl font-semibold">Order not found.</h1>
          <Link href="/" className="text-sm font-medium hover:underline">
            Back to 42Share
          </Link>
        </section>
      </div>
    </PageContainer>
  );
}
