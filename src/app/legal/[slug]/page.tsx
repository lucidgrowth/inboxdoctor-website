// app/legal/privacy-policy/page.tsx
import LegalLayout from "@/app/components/legal/legal-layout";
import getLegalPage from "@/lib/legal-page";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import path from "path";

export const metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy details.",
};

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), "src/content"));
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));
  return mdxFiles.map((file) => ({ slug: file.replace(".mdx", "") }));
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getLegalPage(slug);

  if (!data) {
    return notFound();
  }

  return (
    <LegalLayout frontmatter={data?.frontmatter} toc={data?.toc}>
      {data?.content}
    </LegalLayout>
  );
}
