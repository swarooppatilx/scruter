import { useState } from "react";
import ChatBot from "react-simple-chatbot";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");

  const handleMessage = (msg) => {
    setUserMessage(msg); // Update user message on each interaction
  };

  const flow = [
    {
      id: "1",
      message: "Welcome to Scruter! We're here to help you monitor and analyze your online presence. May I know your name?",
      trigger: "2",
    },
    {
      id: "2",
      message: "Hi {previousValue}! What would you like to know more about?",
      options: [
        { value: "about", label: "Tell me more about Scruter", trigger: "3" },
        { value: "features", label: "Explore features", trigger: "4" },
        { value: "pricing", label: "View pricing plans", trigger: "5" },
        { value: "support", label: "Get support", trigger: "9" },
      ],
    },
    {
      id: "3",
      message: "Scruter is a powerful analytics platform that helps businesses and individuals monitor their digital presence, analyze data, and make informed decisions. Ready to explore our features?",
      options: [
        { value: "yes", label: "Yes, show me features", trigger: "4" },
        { value: "no", label: "No, tell me about pricing", trigger: "5" },
      ],
    },
    {
      id: "4",
      message: "Our main features include:",
      trigger: "featureList",
    },
    {
      id: "featureList",
      message: "1. Keyword Monitoring\n2. Sentiment Analysis\n3. Competitive Analysis\n4. Customized Alerts\n5. Detailed Reporting",
      options: [
        { value: "learnMore", label: "Tell me more about a specific feature", trigger: "6" },
        { value: "back", label: "Back to main menu", trigger: "2" },
      ],
    },
    {
      id: "6",
      message: "Which feature would you like to know more about?",
      options: [
        { value: "keyword", label: "Keyword Monitoring", trigger: "7" },
        { value: "sentiment", label: "Sentiment Analysis", trigger: "8" },
        { value: "competitive", label: "Competitive Analysis", trigger: "7a" },
        { value: "alerts", label: "Customized Alerts", trigger: "8a" },
        { value: "reporting", label: "Detailed Reporting", trigger: "7b" },
      ],
    },
    {
      id: "7",
      message: "Our Keyword Monitoring feature allows you to track specific keywords related to your brand or industry, helping you stay ahead in your niche. Can I help with anything else?",
      trigger: "2",
    },
    {
      id: "7a",
      message: "Competitive Analysis lets you understand your competitors' digital strategies. This insight enables you to make adjustments that keep you competitive.",
      trigger: "2",
    },
    {
      id: "7b",
      message: "Detailed Reporting provides in-depth analysis and visual reports that help you understand trends and make data-driven decisions. Anything else you need help with?",
      trigger: "2",
    },
    {
      id: "8",
      message: "Sentiment Analysis helps gauge public opinion by analyzing the tone of mentions about your brand. It’s a powerful tool for reputation management. Anything else?",
      trigger: "2",
    },
    {
      id: "8a",
      message: "Customized Alerts notify you about specific events or changes in your metrics, so you stay informed in real time.",
      trigger: "2",
    },
    {
      id: "5",
      message: "Scruter offers flexible pricing plans suitable for individuals, small businesses, and large organizations. Would you like more information on specific plans?",
      options: [
        { value: "yes", label: "Yes, show me the plans", trigger: "pricingDetails" },
        { value: "no", label: "No, take me back to main menu", trigger: "2" },
      ],
    },
    {
      id: "pricingDetails",
      message: "Our pricing plans are as follows:\n1. Basic - $29/month\n2. Professional - $99/month\n3. Enterprise - Custom pricing based on needs",
      options: [
        { value: "basic", label: "Basic Plan Details", trigger: "planBasic" },
        { value: "professional", label: "Professional Plan Details", trigger: "planProfessional" },
        { value: "enterprise", label: "Enterprise Plan Details", trigger: "planEnterprise" },
      ],
    },
    {
      id: "planBasic",
      message: "The Basic Plan includes keyword monitoring and basic reporting, suitable for individuals and small businesses.",
      trigger: "2",
    },
    {
      id: "planProfessional",
      message: "The Professional Plan offers advanced reporting, competitive analysis, and sentiment tracking, ideal for growing businesses.",
      trigger: "2",
    },
    {
      id: "planEnterprise",
      message: "The Enterprise Plan is custom-tailored to meet specific needs, including dedicated support and in-depth analytics.",
      trigger: "2",
    },
    {
      id: "9",
      message: "Our support team is here to help. How would you like assistance?",
      options: [
        { value: "contact", label: "Contact customer support", trigger: "contactSupport" },
        { value: "faq", label: "View FAQ", trigger: "faq" },
      ],
    },
    {
      id: "contactSupport",
      message: "You can reach our support team via email at support@scruter.com or call us at +123-456-7890.",
      trigger: "2",
    },
    {
      id: "faq",
      message: "Visit our FAQ page for answers to common questions: [FAQ Link](https://scruter.vercel.app/faq)",
      end: true,
    },
    {
      id: "end",
      message: "Thank you for visiting Scruter! If you need further assistance, feel free to chat with us again. Have a great day!",
      end: true,
    },
  ];
  

  return (
    <div>
      <ChatBot
        steps={flow}
        onUserMessage={handleMessage}
        userMessage={userMessage}
      />
    </div>
  );
};

export default Chatbot;