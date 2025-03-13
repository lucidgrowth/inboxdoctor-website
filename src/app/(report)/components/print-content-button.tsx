"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const wrapInBranding = (htmlContent: string) => `
  <html>
    <head>
    </head>
    <body>
       <header class="flex h-16 max-w-[1600px] w-full mx-auto shrink-0 items-center justify-between gap-2 border-b px-4">
          <a
            href="https://inboxdoctor.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2"
          >
            <img
              src="https://app.inboxdoctor.ai/id-logo.png"
              alt="InboxDoctor"
              class="size-8 md:size-10 rounded-md"
            />
            <div class="flex flex-col whitespace-nowrap">
              <img
                src="https://app.inboxdoctor.ai/id-logo-text.png"
                alt="InboxDoctor"
                class="max-w-[90px] md:max-w-[120px]"
              />
            </div>
          </a>
          <div>
            <a
              href="https://inboxdoctor.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://inboxdoctor.ai
            </a>
          </div>
        </header>
      ${htmlContent}
       <footer class="flex flex-col py-10 max-w-[1600px] w-full mx-auto shrink-0 items-center justify-between gap-2 border-t px-4">
          <p>
            &copy; ${new Date().getFullYear()} InboxDoctor. All rights reserved.
          </p>

          <p class="text-center">
            InboxDoctor LLC 300 Delaware Ave Ste 210 #207, Wilmington, DE 19801,
            United States.
          </p>
          <div class="flex gap-3">
            <span>
              <span class="font-semibold">Email:</span>
              <a href="mailto:support@inboxdoctor.ai">support@inboxdoctor.ai</a>
            </span>
            <span>
              <span class="font-semibold">Phone:</span>
              <a href="tel:(+1)2073909986">(+1)207-390-9986</a>
            </span>
          </div>
        </footer>
    </body>
  </html>
`;

const PrintContentButton = ({
  id,
  preRunCallback,
  postRunCallback,
}: {
  id: string;
  preRunCallback: () => void;
  postRunCallback: () => void;
  beforePrintCallback?: (newTab: Window) => void;
}) => {
  const handlePrint = () => {
    // const width = 800;
    // const height = 600;
    // // const left = (window.screen.width - width) / 2;
    // // const top = (window.screen.height - height) / 2;

    preRunCallback?.();

    setTimeout(() => {
      // Get the element to print
      const elementToPrint = document.getElementById(id);
      if (!elementToPrint) {
        console.error(`Element with ID "${id}" not found.`);
        return;
      }

      // Create a blob with the HTML content
      const htmlContent = wrapInBranding(elementToPrint.innerHTML);
      const blob = new Blob([htmlContent], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);

      // Open in a new tab
      const newTab = window.open(blobUrl, "_blank");

      if (newTab) {
        // Wait for the page to load before adding styles
        newTab.addEventListener("load", () => {
          const styles = document.getElementsByTagName("style");
          const links = document.getElementsByTagName("link");

          // Copy all <style> elements
          Array.from(styles).forEach((style) => {
            const newStyle = document.createElement("style");
            newStyle.textContent = style.textContent;
            // Copy any attributes from the original style tag
            Array.from(style.attributes).forEach((attr) => {
              newStyle.setAttribute(attr.name, attr.value);
            });
            newTab.document.head?.appendChild(newStyle);
          });

          // Copy all <link> elements (external stylesheets)
          Array.from(links).forEach((link) => {
            if (link.rel === "stylesheet" && link.href) {
              const newLink = document.createElement("link");
              newLink.rel = "stylesheet";
              newLink.href = link.href;
              newTab.document.head?.appendChild(newLink);
            }
          });

          // Remove the print button from the new tab
          const printContentButton = newTab.document.getElementById(
            "print-content-button"
          );
          if (printContentButton) {
            printContentButton.remove();
          }

          // Trigger print after everything is loaded
          setTimeout(() => {
            newTab.print();
            postRunCallback?.();
          }, 1000);
        });
      }
    }, 0);
  };

  return (
    <div id="print-content-button">
      <Button onClick={handlePrint} variant="outline">
        <Printer className="w-4 h-4" />
        Print
      </Button>
    </div>
  );
};

export default PrintContentButton;
