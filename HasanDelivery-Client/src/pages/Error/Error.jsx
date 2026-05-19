import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center md:my-8">
      <div className="text-center px-6 max-w-md">

        {/* Animated Error Icon */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 90 90" width="90" height="90" xmlns="http://www.w3.org/2000/svg">
            <circle cx="45" cy="45" r="42" fill="#FCEBEB" stroke="#F09595" strokeWidth="1.5" />
            <line x1="28" y1="28" x2="62" y2="62" stroke="#E24B4A" strokeWidth="5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 45 45" to="360 45 45" dur="0.4s" fill="freeze" />
            </line>
            <line x1="62" y1="28" x2="28" y2="62" stroke="#E24B4A" strokeWidth="5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 45 45" to="360 45 45" dur="0.4s" fill="freeze" />
            </line>
            <circle cx="45" cy="45" r="42" fill="none" stroke="#E24B4A" strokeWidth="2" strokeDasharray="264" strokeDashoffset="264">
              <animate attributeName="stroke-dashoffset" from="264" to="0" dur="0.6s" fill="freeze" />
            </circle>
          </svg>
        </div>

        {/* Text */}
        <p className="text-xs font-medium text-red-500 tracking-widest uppercase mb-2">Error</p>
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">Something went wrong</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          The page you're looking for couldn't be loaded. Please try again or return to the homepage.
        </p>

        {/* Go Home Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-200 bg-violet-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
        >
          🏠 Go Home
        </button>

      </div>
    </div>
  );
};

export default Error;