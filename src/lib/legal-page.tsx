import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc"; // Replace with actual MDX library import
import { Frontmatter, TocItem } from "@/types";

interface LegalPageResult {
  frontmatter: Frontmatter;
  content: React.ReactNode;
  toc: TocItem[];
}

// Define custom MDX components with types
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1
      id={children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "")}
      // className="text-4xl font-bold mb-6"
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2
      id={children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "")}
      // className="border-b border-border"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3
      id={children
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "")}
      // className="text-xl font-medium mt-6 mb-3 "
    >
      {children}
    </h3>
  ),
};

export const readFileSafe = async (filePath: string): Promise<string | null> => {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return null;
  }
};

export const parseToc = async (tocPath: string): Promise<TocItem[] | undefined> => {
  const tocJSON = await readFileSafe(tocPath);
  return tocJSON ? JSON.parse(tocJSON) : undefined;
};

export const compileMdxContent = async (
  source: string
): Promise<{
  frontmatter: Frontmatter;
  content: React.ReactNode;
} | null> => {
  try {
    return await compileMDX<Frontmatter>({
      source,
      options: { parseFrontmatter: true },
      components,
    });
  } catch (error) {
    console.error("Error compiling MDX:", error);
    return null;
  }
};

const getLegalPage = cache(
  async (slug: string): Promise<LegalPageResult | null> => {
    const contentDir = path.join(process.cwd(), "src/content");
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

export default getLegalPage;
