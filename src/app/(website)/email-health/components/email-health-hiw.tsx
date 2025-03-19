import HowItWorks from "@/components/how-it-works";

const data = {
  id: "how-it-works",
  badge: "Three Simple Steps",
  heading: "How It Works",
  description:
    "Our domain health check process is quick, secure, and provides actionable insights to improve your email security.",
  steps: [
    {
      step: 1,
      image: "/email-health/hiw_01.png",
      title: "Initiate Your Test with a Unique Email",
      description:
        "Copy the provided test email address, compose an email from your domain, send it, check the confirmation box, and click 'View Results' to start the analysis.",
    },
    {
      step: 2,
      image: "/email-health/hiw_02.png",
      title: "Unlock a Detailed Health Report",
      description:
        "Sit back as our system evaluates your domain's authentication, security, and deliverability, generating a comprehensive report tailored to your email setup.",
    },
    {
      step: 3,
      image: "/email-health/hiw_03.png",
      title: "Explore and Download Your Results",
      description:
        "Access your personalized report on the results page, review key insights, and download it for further action or record-keeping.",
    },
  ],
};

const EmailHealthHIW = () => {
  return <HowItWorks data={data} />;
};

export default EmailHealthHIW;
