import Container from "@/components/container";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ArticleContent = ({ children }: Props) => {
  return (
    <Container className="flex max-w-[1000px] gap-12 static overflow-visible">
      <main className="flex-1 prose prose-neutral prose-invert max-w-none scroll-smooth prose-headings:scroll-mt-[calc(var(--header-height)+1rem)] overflow-y-auto">
        {children}
      </main>
    </Container>
  );
};

export default ArticleContent;
