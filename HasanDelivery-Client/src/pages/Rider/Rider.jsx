import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const inputClass =
  "w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 rounded-lg outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 placeholder:text-gray-300";

const labelClass =
  "block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2";

const sectionTitleClass =
  "block text-[10px] font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-5";

const perks = [
  {
    icon: "⚡",
    title: "Fast Approval",
    desc: "Get approved within 24–48 hours",
  },
  {
    icon: "💰",
    title: "Weekly Earnings",
    desc: "Payments deposited every week",
  },
  {
    icon: "🛡️",
    title: "Rider Insurance",
    desc: "Coverage included on every trip",
  },
];

export default function Rider() {
  const { register, handleSubmit } = useForm();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosSecure();

 

  // region array
  const ServiceCenters = useLoaderData();
  const regions = [
    ...new Set(ServiceCenters.map((item) => item.district)),
  ].sort();

  const handlaRiderSubmit = (data) => {

    axiosInstance.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success!",
            text: "Your application has been submitted.",
          }).then(() => {
            navigate("/");
          });
        }
      }
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-dm    { font-family: 'DM Sans', sans-serif; }
        .text-outline { -webkit-text-stroke: 1.5px #f97316; color: transparent; }
        .badge-dot  { animation: pulse-dot 1.5s infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        textarea    { resize: none; }
      `}</style>

      <div className="font-dm bg-white min-h-screen text-gray-800 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-500 mb-2">
              Join Our Fleet
            </p>
            <h1
              className="font-bebas leading-none tracking-wide"
              style={{ fontSize: "clamp(52px,8vw,96px)" }}
            >
              Be a <span className="text-outline">Rider</span>
            </h1>
            <p className="mt-4 text-gray-400 text-sm max-w-md leading-relaxed">
              Start earning on your own schedule. Join thousands of riders
              delivering across the city every day.
            </p>
            <span className="block w-14 h-0.5 bg-orange-500 rounded-full mt-5" />
          </div>

          {/* ── Grid ── */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* ── Form ── */}
            <form onSubmit={handleSubmit(handlaRiderSubmit)}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-500 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-7">
                <span className="badge-dot w-1.5 h-1.5 rounded-full bg-orange-500" />
                Accepting Applications
              </div>

              {/* — Personal Info — */}
              <span className={sectionTitleClass}>Personal Information</span>

              <div className="mb-5">
                <label className={labelClass}>Full Name</label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="e.g. Rahim Uddin"
                  {...register("name", { required: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="you@email.com"
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    className={inputClass}
                    type="tel"
                    placeholder="+880 1X XX XXX XXX"
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelClass}>NID Number</label>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="National ID No."
                    {...register("nid", { required: true })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Region</label>
                  <select
                    className={inputClass}
                    defaultValue=""
                    {...register("region", { required: true })}
                  >
                    <option value="" disabled>
                      Select region
                    </option>
                    {regions.map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* — Vehicle & License — */}
              <span className={`${sectionTitleClass} mt-8 block`}>
                Vehicle &amp; License
              </span>

              <div className="mb-5">
                <label className={labelClass}>Driving License Number</label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="e.g. DL-1234567890"
                  {...register("license", { required: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={labelClass}>Bike Model &amp; Year</label>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="e.g. Yamaha FZS 2022"
                    {...register("bikeModel", { required: true })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Bike Registration No.</label>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="e.g. DM-GA-11-1234"
                    {...register("bikeRegistration", { required: true })}
                  />
                </div>
              </div>

              {/* — About — */}
              <span className={`${sectionTitleClass} mt-8 block`}>
                About You
                <span className="text-gray-300 text-[8px] ml-2 normal-case tracking-normal font-normal">
                  optional
                </span>
              </span>

              <div className="mb-2">
                <label className={labelClass}>Tell Us About Yourself</label>
                <textarea
                  className={inputClass}
                  rows={4}
                  placeholder="Share your delivery experience, riding skills, or anything else you'd like us to know..."
                  {...register("about", { required: false })}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="font-bebas mt-7 w-full flex items-center justify-center gap-2.5 btn btn-error hover:bg-orange-400 text-white text-lg tracking-widest px-6 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md shadow-orange-100"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Submit Application
              </button>

              <p className="text-[11px] text-gray-300 text-center mt-4 leading-relaxed">
                By submitting, you agree to our{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Rider Policy
                </a>
                .
              </p>
            </form>

            {/* ── Image Column ── */}
            <div className="sticky top-12">
              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80"
                  alt="Rider on motorcycle"
                  className="w-full object-cover h-80 block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-bebas text-3xl tracking-wider leading-tight text-white">
                    Ride. Earn.
                    <br />
                    Repeat.
                  </h3>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Flexible hours. Weekly payouts. Full support from day one.
                  </p>
                </div>
              </div>

              {/* Perks */}
              <div className="mt-4 flex flex-col gap-3">
                {perks.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm"
                  >
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <strong className="block text-[13px] text-gray-700 mb-0.5 font-semibold">
                        {title}
                      </strong>
                      <span className="text-xs text-gray-400">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
