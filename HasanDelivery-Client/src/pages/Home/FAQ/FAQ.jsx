import React from "react";
import { faqData } from "./FAQlist";

const FAQ = () => {
  return (
    <div className="my-8 mx-3 md:mx-20">
        <div className="text-center md:mx-50 ">
            <h1 className="text-3xl font-bold pb-2">Frequently Asked Question (FAQ)</h1>
            <p className="text-sm text-gray-500">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
        </div>
      {faqData.map((faq) => (
        <div
          tabIndex={0}
          className="collapse collapse-arrow bg-base-100 border-base-300 border my-1.5"
        >
          <div className="collapse-title font-semibold">
            {faq.question}
          </div>
          <div className="collapse-content text-sm">
            {faq.answer}
          </div>
        </div>
      ))}
      <button className="btn btn-error mx-auto block mt-4">See More FQA's</button>
    </div>
  );
};

export default FAQ;
