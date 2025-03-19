import FaqSection from "@/components/faq-section";
import React from "react";

const faqs = [
  {
    question: "What is an Email Domain Health Test?",
    answer:
      "An Email Domain Health Test is a comprehensive evaluation of your domain's email setup to ensure your emails are delivered securely and reliably. It examines essential standards like SPF, DKIM, DMARC, and TLS, and identifies potential issues such as blacklisting or weak security configurations that could affect your email performance. By providing a detailed report with an overall health score, the test helps you enhance inbox placement, protect against threats like phishing, and ensure your emails reach their intended recipients without disruptions.",
  },
  {
    question: "How is the Overall Health Score calculated?",
    answer:
      "The Overall Health Score is determined by assessing a series of key checks across your domain's email configuration, covering areas like authentication (SPF, DKIM, DMARC), security (TLS, STARTTLS), and deliverability factors such as blacklist status and domain age. Each check is assigned a weight based on its importance to email deliverability, with successful checks boosting your score and failed or warning checks reducing it. This scoring system gives you a clear, numerical representation of your domain's health, helping you understand where improvements are needed to optimize email performance.",
  },
  {
    question: "How is the Security Score calculated?",
    answer:
      "The Security Score is calculated by evaluating how well your domain implements encrypted communication standards, such as TLS, STARTTLS, and DANE, alongside secure configurations like MTA-STS and DNSSEC. We look at whether your domain supports reliable certificate rollovers to maintain secure connections and deduct points for vulnerabilities, such as open relays or weak cipher suites, that could expose your emails to risks. This score reflects your domain's ability to protect email communications, giving you confidence in its security posture and highlighting areas for enhancement.",
  },
  {
    question: "How is the Authentication Results score determined?",
    answer:
      "The Authentication Results score is determined by verifying the correct setup and functionality of email authentication standards like SPF, DKIM, DMARC, and ARC. We check if your SPF record allows the sending IP, confirm that DKIM signatures are valid, and ensure DMARC policies align with the sender's identity to prevent spoofing attempts. This score indicates how well your domain is protected against unauthorized use, helping you safeguard your email reputation and reduce the risk of phishing attacks targeting your recipients.",
  },
  {
    question: "How do we assess the Blacklist Status?",
    answer:
      "To assess Blacklist Status, we scan your domain and its associated MX servers against DNS-based blacklists, which are lists used by email providers to flag potentially problematic senders. We also examine the IP addresses tied to your domain for any listings that might signal deliverability issues, as well as your overall domain reputation. This assessment provides a clear picture of whether your domain is at risk of being blocked or filtered, allowing you to take steps to maintain a positive sender reputation and ensure your emails reach the inbox.",
  },
  {
    question: "How is the Domain Age Impact evaluated?",
    answer:
      "The Domain Age Impact is evaluated by analyzing your domain's creation date and its age at the time of the test. We assess how this age affects your email deliverability, as newer domains often face challenges due to a lack of established reputation with email providers, which can lead to emails being flagged or filtered. The test offers recommendations to build trust over time, such as consistent sending practices, helping you improve your domain's reputation and increase the likelihood of inbox placement as it matures.",
  },
  {
    question: "How is the Email Delivery Chain analyzed?",
    answer:
      "The Email Delivery Chain analysis involves tracing the step-by-step journey of your email from the sender's mail transfer agent (MTA) to the recipient's MTA. We evaluate the protocols used during this process, the security measures in place, and any potential issues, such as open relays, that could disrupt delivery or compromise security. This analysis ensures your email follows a secure and reliable path, giving you insights into any bottlenecks or vulnerabilities that might affect deliverability and need attention.",
  },
  {
    question: "How do we validate the Integrity of Messages?",
    answer:
      "We validate the Integrity of Messages by checking for the presence and proper implementation of digital signatures through standards like DKIM and ARC. These signatures are used to confirm the email's origin and ensure that the message content has not been altered during transit, protecting against tampering or unauthorized changes. This validation process helps maintain trust in your email communications, ensuring recipients receive your messages exactly as intended and reducing the risk of fraud or misrepresentation.",
  },
  {
    question: "Will the test standards be updated over time?",
    answer:
      "Yes, the standards and checks for the Email Domain Health Test will be updated as email protocols and industry best practices evolve to address new challenges and technologies. Initially, new standards or security guidelines may be introduced as optional checks, so they won't immediately affect your score, allowing you time to adapt. Over time, these may become required and influence the overall score, and we'll keep you informed of any changes through our blog or support channels to ensure you're always aligned with the latest requirements.",
  },
  {
    question:
      "Does a 100% Overall Health Score mean full compliance with all email standards?",
    answer:
      "A 100% Overall Health Score indicates excellent compliance with the email standards included in our test, reflecting a strong setup for deliverability and security. However, it doesn't guarantee adherence to every possible email standard, as some may be too complex to test comprehensively, while others might be evaluated but not included in the score, such as optional checks. Our test prioritizes the most critical standards to provide a robust evaluation, helping you achieve reliable email performance within the scope of our assessment.",
  },
];
const EmailHealthFAQ = () => {
  return (
    <FaqSection
      faqs={faqs}
      title="Frequently Asked Questions"
      description="Find answers to common questions about email domain security."
    />
  );
};

export default EmailHealthFAQ;
