import { FileText, Calculator, Shield, TrendingUp, Users, Award, Clock, Video } from 'lucide-react';

const highlights = [
  {
    icon: FileText,
    title: 'GST Registration & Returns',
    description: 'Complete guide to GST registration process and filing various returns (GSTR-1, GSTR-3B, GSTR-9)...',
  },
  {
    icon: Calculator,
    title: 'Tax Calculations',
    description: 'Master CGST, SGST, IGST calculations, input tax credit, and reverse charge mechanism...',
  },
  {
    icon: Shield,
    title: 'Compliance & Law',
    description: 'Understanding GST laws, compliance requirements, and avoiding penalties...',
  },
  {
    icon: TrendingUp,
    title: 'GST for Business',
    description: 'Practical applications for e-commerce, exports, imports, and service providers...',
  },
  {
    icon: Users,
    title: 'Live Interactive Sessions',
    description: 'Engage with expert instructors and clarify doubts in real-time',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Receive industry-recognized certificate upon course completion',
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Access recorded sessions anytime and learn at your own pace',
  },
  {
    icon: Video,
    title: 'Practical Case Studies',
    description: 'Real-world scenarios and hands-on practice with GST portal',
  },
];

export default function CourseHighlights() {
  return (
    <section id="highlights" className="py-0 px-2 sm:px-1 lg:px-0 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Highlights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive curriculum designed to make you a GST expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
