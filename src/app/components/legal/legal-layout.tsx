// app/legal/layout.tsx
import Container from "@/components/container";
import { Frontmatter, TocItem } from "@/types";
import Image from "next/image";
import TableOfContents from "./table-of-content";
interface LegalLayoutProps {
  children: React.ReactNode;
  frontmatter: Frontmatter;
  toc: TocItem[];
}

export default async function LegalLayout({
  children,
  frontmatter,
  toc,
}: LegalLayoutProps) {
  return (
    <main className="bg-background">
      <Container className="relative pt-40 md:h-[350px]">
        <div className="z-0 pointer-events-none w-[1200px] absolute top-0 bottom-auto left-1/2 -translate-x-1/2">
          <Image
            src="/hero-bg-grid.png"
            alt="InboxDoctor Interface"
            width={1400}
            height={600}
            className="w-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl lg:text-6xl text-white font-semibold text-center">
            {frontmatter.title}
          </h1>
          {frontmatter.lastUpdatedAt && (
            <p className="text-muted-foreground">
              Last updated:{" "}
              {new Date(frontmatter.lastUpdatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </Container>
      <Container className="flex gap-12 static overflow-visible">
        <main className="flex-1 prose prose-neutral prose-invert max-w-none scroll-smooth prose-headings:scroll-mt-[calc(var(--header-height)+1rem)] overflow-y-auto">
          {children}
        </main>
        <TableOfContents toc={toc} />
      </Container>
    </main>
  );
}
