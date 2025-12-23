import { useNavigate } from 'react-router-dom';

export  function PrivacyPolicy() {
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
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>TheFinanceShowByAK</strong>, we respect your privacy and are
        committed to protecting your personal information.
      </p>

      <p className="mb-4">
        We collect basic information such as name, email, phone number, and
        educational details when you submit enquiry or enrollment forms.
      </p>

      <p className="mb-4">
        We do not sell, rent, or share your personal data with third parties
        except when required by law or to provide our services effectively.
      </p>

      <p className="mb-4">
        All course content is the intellectual property of TheFinanceShowByAK.
        Recording, sharing, or reselling content without permission is strictly prohibited.
      </p>

      <p className="font-medium">
        Contact: <span className="text-blue-600">thefinanceshowbyak@gmail.com</span>
      </p>
    </div>
  );
}
