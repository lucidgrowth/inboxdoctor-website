const emailTestTooltips = {
    DMARC:
      "Domain-based Message Authentication, Reporting & Conformance (DMARC) helps prevent email spoofing by defining how your domain handles unauthenticated emails. It’s critical for protecting your brand and improving deliverability.",
    DKIM: "DomainKeys Identified Mail (DKIM) adds a digital signature to your emails, verifying they came from your domain. It’s essential for proving email authenticity and reducing spam flags.",
    SPF: "Sender Policy Framework (SPF) specifies which servers can send emails for your domain. It’s key to preventing spoofing and ensuring emails aren’t marked as suspicious.",
    MX: "Mail Exchange (MX) records direct emails to your mail servers. Properly configured MX records are vital for ensuring emails reach their intended destination.",
    ARC: "Authenticated Received Chain (ARC) preserves authentication results across email forwarding. It’s important for maintaining trust in emails relayed through multiple servers.",
    A: "An A (Address) record maps your domain to an IPv4 address. It’s foundational for email server connectivity and overall domain functionality.",
    AAAA: "An AAAA (Quad-A) record maps your domain to an IPv6 address. It’s increasingly important as the web transitions to IPv6 for modern email delivery.",
    BIMI: "Brand Indicators for Message Identification (BIMI) displays your logo in email clients. It boosts brand trust and recognition, but requires DMARC compliance.",
    DANE: "DNS-based Authentication of Named Entities (DANE) secures email by linking certificates to your domain via DNS. It’s crucial for preventing man-in-the-middle attacks.",
    DNSKEY:
      "DNS Key (DNSKEY) record holds the public key for DNSSEC. It’s essential for validating the authenticity of your DNS data and ensuring email security.",
    DNSSEC:
      "Domain Name System Security Extensions (DNSSEC) protects DNS from tampering. It’s vital for preventing email redirection and ensuring domain trustworthiness.",
    "MTA-STS":
      "Mail Transfer Agent Strict Transport Security (MTA-STS) enforces secure email connections. It’s important for protecting email data in transit from interception.",
    PTR: "Pointer (PTR) records map an IP address back to your domain. A valid PTR is critical for reverse DNS checks, often required by email servers to verify legitimacy.",
    RPKI: "Resource Public Key Infrastructure (RPKI) secures internet routing. While not email-specific, it helps ensure your email servers’ IP addresses are trusted.",
    SSL: "Secure Sockets Layer (SSL) encrypts connections to your email server. It’s a baseline for protecting email data, though often replaced by TLS today.",
    STARTTLS:
      "STARTTLS upgrades an email connection to encrypted TLS if supported. It’s key for securing email transmission between servers opportunistically.",
    TLS: "Transport Layer Security (TLS) encrypts email data in transit. It’s critical for safeguarding privacy and integrity during email delivery.",
    WHOIS: "WHOIS records contain domain registration information including owner contact details and registration dates. They help verify legitimate email senders and can be crucial for identifying potentially fraudulent domains used in phishing campaigns."

  };
  
  // Example usage:
  export function getTooltip(cardId: keyof typeof emailTestTooltips) {
    return emailTestTooltips[cardId] || "Tooltip not available.";
  }
  