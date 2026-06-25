import React, { useState } from "react";

const tabs = [
  {
    key: "mission",
    label: "Mission",
    content:
      "Our mission is to provide fast, safe, and reliable delivery service all over the country. We are dedicated to ensuring every parcel reaches its destination on time, with the utmost care and professionalism. By leveraging cutting-edge technology, real-time tracking systems, and a passionate team of delivery experts, we aim to redefine the standards of logistics in the country. We believe that every package carries a story — a gift for a loved one, a product for a customer, or an important document for a business. That is why we treat every delivery with the same level of urgency and responsibility. Our goal is not just to deliver parcels, but to deliver trust, reliability, and peace of mind to every customer we serve.",
  },
  {
    key: "terms",
    label: "Terms",
    content:
      "By using our service, you agree to our terms and conditions including delivery policies and privacy rules. All shipments are subject to our standard handling guidelines, and customers are responsible for providing accurate and complete delivery information at the time of booking. We reserve the right to update our policies at any time, and continued use of our platform constitutes acceptance of the latest terms. Our liability for lost or damaged parcels is limited to the declared value of the shipment, and claims must be submitted within 7 days of the scheduled delivery date. We are committed to protecting your personal data and will never share your information with third parties without your consent. Please read our full privacy policy for more details on how we collect, use, and safeguard your information.",
  },
  {
    key: "story",
    label: "Story",
    content:
      "We started our journey with a small team, a handful of vehicles, and a big dream — to make delivery simple, fast, and reliable for everyone across the country. In the early days, our founders worked around the clock to ensure every parcel was delivered with a smile. Over the years, we have expanded our network to cover every corner of the country, embraced new technology to streamline our operations, and built a team of hundreds of dedicated professionals who share our vision. We have faced challenges, learned from our mistakes, and grown stronger with every obstacle. Today, we proudly serve thousands of customers — from individuals sending gifts to large businesses managing their supply chains. Our story is not just about delivering parcels; it is about building relationships, earning trust, and making a difference in people's lives every single day.",
  },
  {
    key: "success",
    label: "Success",
    content:
      "We have successfully delivered hundreds of thousands of parcels with a consistent 99% customer satisfaction rate, and we are incredibly proud of what we have achieved. Our growth over the years reflects the unwavering trust and loyalty of our customers who choose us again and again for their delivery needs. From small personal packages and heartfelt gifts to large-scale business shipments and time-sensitive documents, we have consistently delivered excellence in every order. We have received numerous industry recognitions for our commitment to quality, speed, and customer service. These achievements are not just milestones for our company — they are a testament to the hard work of our entire team and the confidence our customers place in us. As we celebrate our successes, we remain focused on the future, continuously improving our services and setting new benchmarks in the delivery industry.",
  },
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const active = tabs.find((tab) => tab.key === activeTab);

  return (
    <div className=" px-2 bg-white rounded-2xl border border-gray-100 py-2 md:py-8  shadow-sm my-5 md:my-10 px-2 md:px-20">
      <div className="my-3">
        <h1 className="text-[10px] md:text-4xl font-semibold">About us</h1>
        <p className="text-gray-500 text-[6px] md:text-xs leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      {/* Tab Buttons */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-2 md:px-5 py-2 rounded-full text-sm font-medium transition border ${
              activeTab === tab.key
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="">
        <p className="text-gray-500 text-[6px] md:text-sm leading-relaxed text-justify">{active.content}</p>
      </div>
    </div>
  );
};

export default AboutUs;
