// app/legal/privacy-policy/page.tsx
import LegalLayout from "@/app/components/legal/legal-layout";
import getLegalPage from "@/lib/legal-page";
import fs from "fs/promises";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getLegalPage(slug);

  return {
    title: data?.frontmatter?.metaTitle || "Legal Documents | InboxDoctor",
    description: data?.frontmatter?.metaDescription || "Important legal information and policies for InboxDoctor users and services.",
    openGraph: {
      title: data?.frontmatter?.metaTitle || "Legal Documents | InboxDoctor",
      description: data?.frontmatter?.metaDescription || "Important legal information and policies for InboxDoctor users and services.",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.frontmatter?.metaTitle || "Legal Documents | InboxDoctor",
      description: data?.frontmatter?.metaDescription || "Important legal information and policies for InboxDoctor users and services.",
    },
  };
}

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
