import { useNavigate } from 'react-router-dom';

export function Disclaimer() {
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

      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

      <p className="mb-4">
        The information, courses, and services provided by TheFinanceShowByAK
        are for educational purposes only.
      </p>

      <p className="mb-4">
        We do not guarantee completeness or accuracy of GST, tax, or finance-related content.
        This should not be treated as professional advice.
      </p>

      <p className="mb-4">
        Users should consult qualified professionals before making decisions.
      </p>

      <p>
        TheFinanceShowByAK shall not be liable for any loss arising from use of this platform.
      </p>
    </div>
  );
}
