import TableOfContents from "@/app/components/legal/table-of-content";
import Container from "@/components/container";
import { Frontmatter, TocItem } from "@/types";
import ArticleHero from "./article-hero";

interface ArticleLayoutProps {
  children: React.ReactNode;
  frontmatter: Frontmatter;
  toc: TocItem[];
}

export default async function ArticleLayout({
  children,
  frontmatter,
  toc,
}: ArticleLayoutProps) {
  return (
    <main className="bg-background">
      <ArticleHero
        title={frontmatter.title}
        description={frontmatter.description ?? ""}
      />
      <Container className="flex gap-12 static overflow-visible">
        <main className="flex-1 prose prose-neutral prose-invert max-w-none scroll-smooth prose-headings:scroll-mt-[calc(var(--header-height)+1rem)] overflow-y-auto">
          {children}
        </main>
        <TableOfContents toc={toc} />
      </Container>
    </main>
  );
}
