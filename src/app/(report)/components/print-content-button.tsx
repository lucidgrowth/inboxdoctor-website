import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
const wrapInBranding = (htmlContent: string, allStyles: string) => `
  <html>
    <head>
      <style>
        ${allStyles}
        /* Add print-specific styles */
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          /* Force page size to A4 */
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      </style>
      <script>
        // Auto-close script
        window.onload = function() {
          // Set up afterprint event to close window
          window.addEventListener('afterprint', function() {
            // Signal to parent window that printing is done
            window.parent.postMessage('print-completed', '*');
          });
        }
      </script>
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
  const handleDownload = () => {
    preRunCallback?.();

    // Get the element to export
    const elementToExport = document.getElementById(id);
    if (!elementToExport) {
      console.error(`Element with ID "${id}" not found.`);
      return;
    }

    // Try to extract domain name from the content
    let domainName = "domain";
    try {
      // Look for domain name in the content - check for specific elements or text patterns
      const domainElement = elementToExport.querySelector("[data-domain-name]");
      if (domainElement) {
        domainName = domainElement.textContent || "domain";
      } else {
        // Fallback: try to find domain in content
        const contentText = elementToExport.textContent || "";
        const domainMatch = contentText.match(
          /Domain Name[:\s]+([a-zA-Z0-9.-]+)/i
        );
        if (domainMatch && domainMatch[1]) {
          domainName = domainMatch[1];
        }
      }
    } catch (error) {
      console.error("Error extracting domain name:", error);
    }

    // Generate date string for filename (YYYY-MM-DD format)
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];

    // Create unique filename: email-domain-health-report-{domain}-{date}.pdf
    // Replace invalid filename characters
    const sanitizedDomain = domainName.replace(/[^a-zA-Z0-9.-]/g, "-");
    const uniqueFilename = `email-domain-health-report-${sanitizedDomain}-${dateStr}`;

    // Collect all styles from the current page
    let allStyles = "";

    // Extract styles from <style> tags
    const styleElements = document.getElementsByTagName("style");
    for (let i = 0; i < styleElements.length; i++) {
      allStyles += styleElements[i].textContent + "\n";
    }

    // Extract styles from <link> stylesheets
    const processStylesheets = async () => {
      const linkElements = document.getElementsByTagName("link");
      const stylesheetPromises = [];

      for (let i = 0; i < linkElements.length; i++) {
        const link = linkElements[i];
        if (link.rel === "stylesheet" && link.href) {
          const promise = fetch(link.href)
            .then((response) => response.text())
            .then((cssText) => {
              allStyles += cssText + "\n";
            })
            .catch((error) => {
              console.error(`Error loading stylesheet: ${link.href}`, error);
            });

          stylesheetPromises.push(promise);
        }
      }

      // Wait for all stylesheets to load
      await Promise.all(stylesheetPromises);

      // Add additional styles
      allStyles += `
        /* Basic utility classes for common Tailwind patterns */
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .w-full { width: 100%; }
        .max-w-[1600px] { max-width: 1600px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        .size-8 { width: 2rem; height: 2rem; }
        .size-10 { width: 2.5rem; height: 2.5rem; }
        .border-b { border-bottom-width: 1px; }
        .border-t { border-top-width: 1px; }
        .rounded-md { border-radius: 0.375rem; }
        .shrink-0 { flex-shrink: 0; }
        .font-semibold { font-weight: 600; }
        .text-center { text-align: center; }
        .whitespace-nowrap { white-space: nowrap; }

        :root{
            --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;}
        
        /* Additional styles for PDF output */
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #333;
          line-height: 1.5;
        }
        
        a {
          color: #0066cc;
          text-decoration: none;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Force color printing */
        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `;

      // Create HTML content with proper styling
      const htmlContent = wrapInBranding(elementToExport.innerHTML, allStyles);

      // Create a modal dialog with instructions
      const modalOverlay = document.createElement("div");
      modalOverlay.id = "print-modal-overlay";
      modalOverlay.style.position = "fixed";
      modalOverlay.style.top = "0";
      modalOverlay.style.left = "0";
      modalOverlay.style.width = "100%";
      modalOverlay.style.height = "100%";
      modalOverlay.style.backgroundColor = "rgba(0,0,0,0.5)";
      modalOverlay.style.display = "flex";
      modalOverlay.style.alignItems = "center";
      modalOverlay.style.justifyContent = "center";
      modalOverlay.style.zIndex = "9999";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "hsl(0, 0%, 3.9%)";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "8px";
      modalContent.style.maxWidth = "500px";
      modalContent.style.width = "90%";
      modalContent.style.textAlign = "center";
      modalContent.innerHTML = `
        <h3 style="margin-top: 0; font-size: 18px; font-weight: bold;">Downloading Email Domain Health Report</h3>
        <p>Your report for <strong>${domainName}</strong> will begin downloading.</p>
        <p>When the print dialog appears, select <strong>"Save as PDF"</strong> and click <strong>"Save"</strong>.</p>
        <p>Recommended filename: <strong>${uniqueFilename}</strong></p>
        <p id="modal-status">Preparing document...</p>
        <button id="modal-close-btn" style="background-color: hsl(0, 0%, 3.9%); color: hsl(0, 0%, 98%); border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 15px; border: 1px solid hsl(0, 0%, 98%);">Close</button>
      `;

      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);

      // Close modal on button click
      document
        .getElementById("modal-close-btn")
        ?.addEventListener("click", () => {
          closeModal();
        });

      // Function to close modal and clean up
      const closeModal = () => {
        const overlay = document.getElementById("print-modal-overlay");
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      };

      // Create an invisible iframe
      const printFrame = document.createElement("iframe");
      printFrame.id = "print-pdf-frame";
      printFrame.style.position = "fixed";
      printFrame.style.right = "-9999px";
      printFrame.style.bottom = "-9999px";
      printFrame.style.width = "0";
      printFrame.style.height = "0";
      printFrame.style.opacity = "0";
      document.body.appendChild(printFrame);

      // Set up message listener for iframe communication
      const messageListener = (event: MessageEvent) => {
        if (event.data === "print-completed") {
          // Update status
          const statusElement = document.getElementById("modal-status");
          if (statusElement) {
            statusElement.textContent = "PDF saved successfully!";
            statusElement.style.color = "green";
          }

          // Clean up after printing
          setTimeout(() => {
            // Remove the message listener
            window.removeEventListener("message", messageListener);

            // Remove the iframe
            const frame = document.getElementById("print-pdf-frame");
            if (frame && frame.parentNode) {
              frame.parentNode.removeChild(frame);
            }

            // Close the modal after a brief success message
            setTimeout(() => {
              closeModal();
              postRunCallback?.();
            }, 1500);
          }, 500);
        }
      };

      window.addEventListener("message", messageListener);

      // Get the iframe document and write content to it
      const frameDoc =
        printFrame.contentDocument || printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(htmlContent);
        frameDoc.close();

        // Update status
        const statusElement = document.getElementById("modal-status");
        if (statusElement) {
          statusElement.textContent = "Print dialog opening...";
        }

        // Trigger print after a short delay
        setTimeout(() => {
          try {
            printFrame.contentWindow?.print();

            // Set a fallback cleanup in case afterprint doesn't trigger
            setTimeout(() => {
              // Check if the iframe is still in the document
              const frame = document.getElementById("print-pdf-frame");
              if (frame && frame.parentNode) {
                window.removeEventListener("message", messageListener);
                frame.parentNode.removeChild(frame);

                // Update status or close modal
                const statusElement = document.getElementById("modal-status");
                if (statusElement) {
                  statusElement.textContent = "Process completed";
                }

                setTimeout(() => {
                  closeModal();
                  postRunCallback?.();
                }, 1500);
              }
            }, 7000);
          } catch (error) {
            console.error("Error printing:", error);

            // Handle error in UI
            const statusElement = document.getElementById("modal-status");
            if (statusElement) {
              statusElement.textContent =
                "Error generating PDF. Please try again.";
              statusElement.style.color = "red";
            }

            // Clean up on error
            const frame = document.getElementById("print-pdf-frame");
            if (frame && frame.parentNode) {
              window.removeEventListener("message", messageListener);
              frame.parentNode.removeChild(frame);
            }

            postRunCallback?.();
          }
        }, 1000);
      }
    };

    // Start processing stylesheets
    processStylesheets();
  };

  return (
    <div id="print-content-button">
      <Button onClick={handleDownload} variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Download Report
      </Button>
    </div>
  );
};

export default PrintContentButton;
