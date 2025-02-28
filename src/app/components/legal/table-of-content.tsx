"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TocItem } from "@/types";

const TableOfContents = ({ toc }: { toc: TocItem[] }) => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <aside className="relative max-w-[250px] w-full hidden lg:block">
      <div className="pt-4 h-fit sticky top-[60px]">
        <ScrollArea className="flex flex-col h-[calc(100vh-var(--header-height)-2rem)]">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <ul className="list-none text-muted-foreground text-sm space-y-2">
            {toc.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="hover:text-foreground text-left"
                  onClick={() => handleClick(item.id)}
                >
                  {item.title}
                </button>
                {item.subsections && (
                  <ul className="list-none ml-4 space-y-2 mt-2">
                    {item.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <button
                          type="button"
                          className="hover:text-foreground text-left"
                          onClick={() => handleClick(subsection.id)}
                        >
                          {subsection.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default TableOfContents;
