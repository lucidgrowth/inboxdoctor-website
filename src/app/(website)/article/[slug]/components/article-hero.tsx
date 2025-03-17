import Container from "@/components/container";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
};

const ArticleHero = (props: Props) => {
  return (
    <Container className="relative pt-[calc(var(--header-height)+1rem)] pb-10">
      <div className="border border-primary rounded-2xl p-10 relative md:h-[300px] overflow-hidden z-10">
        <div className="flex flex-col items-start justify-center gap-2 h-full relative z-20 max-w-[500px]">
          <h1 className="text-2xl md:text-4xl font-bold">{props.title}</h1>
          <p className="text-muted-foreground text-sm">{props.description}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-[15]" />

        <div className="z-10 pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 translate-x-[10%]">
          <Image
            src="/hero-bg-grid.png"
            alt="InboxDoctor Interface"
            width={1400}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Container>
  );
};

export default ArticleHero;
