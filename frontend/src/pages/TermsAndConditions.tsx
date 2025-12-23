import { useNavigate } from 'react-router-dom';

export  function TermsAndConditions() {
     const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
       {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="
          mb-8
          inline-flex items-center gap-2
          px-6 py-3
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white
          rounded-xl
          font-semibold
          text-base
          shadow-lg
          hover:from-blue-700 hover:to-indigo-700
          hover:shadow-xl
          transform hover:-translate-y-0.5
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-blue-300
        "
      >
        ← Back To Home
      </button>
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        By accessing TheFinanceShowByAK, you agree to these Terms & Conditions.
      </p>

      <p className="mb-4">
        All course content is for personal educational use only and may not be
        recorded, shared, or resold without written permission.
      </p>

      <p className="mb-4">
        Fees paid are non-refundable unless explicitly stated.
        Violation of terms may result in termination without refund.
      </p>

      <p>
        We reserve the right to modify these terms at any time.
      </p>
    </div>
  );
}
