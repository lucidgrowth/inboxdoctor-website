import fs from "fs/promises";
import path from "path";
import React, { cache } from "react";

import { compileMdxContent, parseToc, readFileSafe } from "@/lib/legal-page";
import { Frontmatter, TocItem } from "@/types";
import { notFound } from "next/navigation";
import ArticleCTASection from "./components/article-cta-section";
import ArticleLayout from "./components/article-layout";

type Props = {
  params: Promise<{ slug: string }>;
};

interface ArticlePageResult {
  frontmatter: Frontmatter;
  content: React.ReactNode;
  toc: TocItem[];
}

export async function generateStaticParams() {
  const files = await fs.readdir(
    path.join(process.cwd(), "src/article-content")
  );
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));
  return mdxFiles.map((file) => ({ slug: file.replace(".mdx", "") }));
}

const getArticlePage = cache(
  async (slug: string): Promise<ArticlePageResult | null> => {
    const contentDir = path.join(process.cwd(), "src/article-content");
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    const tocPath = path.join(contentDir, `${slug}-toc.json`);

    // Get MDX source
    const source = await readFileSafe(mdxPath);
    if (!source) {
      return null;
    }

    // Compile MDX content
    const compiledData = await compileMdxContent(source);
    if (!compiledData) {
      return null;
    }

    // Get TOC
    const toc = await parseToc(tocPath);

    return {
      frontmatter: compiledData.frontmatter,
      content: compiledData.content,
      toc: toc ?? [], // Fallback to empty array if toc is undefined
    };
  }
);

const ArticlePage = async ({ params }: Props) => {
  const { slug } = await params;
  const article = await getArticlePage(slug);

  if (!article) {
    return notFound();
  }
  return (
    <main>
      <ArticleLayout frontmatter={article.frontmatter} toc={article.toc}>
        {article.content}
      </ArticleLayout>
      <ArticleCTASection />
    </main>
  );
};

export default ArticlePage;
