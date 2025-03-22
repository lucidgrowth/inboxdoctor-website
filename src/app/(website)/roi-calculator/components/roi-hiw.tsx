import HowItWorks from "@/components/how-it-works";

const data = {
  id: "how-it-works",
  badge: "Three Simple Steps",
  heading: "How to Run Your Inbox Placement Test",
  description:
    "Follow these simple steps to ensure your emails land in the inbox",
  steps: [
    {
      step: 1,
      image: "/inbox-placement/hiw_01.png",
      title: "Enter Your Email and Choose Your Audience",
      description:
        "Start by entering the email address you'll use to send the test email, ensuring we analyze the correct sender domain for accurate results. Then, select whether your audience is B2B or B2C, which helps us tailor the test to the email providers most relevant to your recipients, setting the stage for a targeted placement analysis.",
    },
    {
      step: 2,
      image: "/inbox-placement/hiw_02.png",
      title: "Copy the Test Emails and Dispatch Your Message",
      description:
        "Next, copy the unique test email address we provide for this test, which ensures your email is routed to our system for analysis. Open your email client, compose a new message from the address you entered, paste the test email as the recipient, and dispatch the message to initiate the inbox placement evaluation.",
    },
    {
      step: 3,
      image: "/inbox-placement/hiw_03.png",
      title: "Unlock and Explore Your Placement Report",
      description:
        "Sit back as our system evaluates your email's delivery across major providers, generating a comprehensive report tailored to your setup, which you can access to see where your emails land—inbox, spam, or elsewhere—and download for actionable insights.",
    },
  ],
};
export const ROIHIW = () => {
  return <HowItWorks data={data} />;
};
