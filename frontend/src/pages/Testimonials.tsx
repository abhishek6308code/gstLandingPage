import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import testimonials7 from '../assets/testimonial7.jpg';
import testimonials2 from '../assets/testimonial2.jpg';
import testimonials3 from '../assets/testimonial3.jpg';
import testimonials4 from '../assets/testimonial4.jpg';
import testimonials5 from '../assets/testimonial5.jpg';
import testimonials6 from '../assets/testimonial6.jpg';
import testimonials8 from '../assets/testimonial8.jpg';
import testimonials9 from '../assets/testimonial9.jpg';

type Testimonial = {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [{
    name: 'Priya Sharma',
    role: 'Small Business Owner',
    image: testimonials7,
    content: 'This GST course helped me understand complex tax regulations easily. The practical examples and live sessions made all the difference for my business compliance.',
    rating: 5,
  },
  {
    name: 'Anil Singh',
    role: 'Freelance Consultant',
    image: testimonials9,
    content: 'Highly recommended for professionals.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Freelance Consultant',
    image: testimonials2,
    content: 'Excellent course structure with in-depth coverage of GST returns and compliance. The instructors are knowledgeable and always ready to help.',
    rating: 5,
  },
  {
    name: 'Anita Desai',
    role: 'Finance Professional',
    image: testimonials3,
    content: 'The flexibility to learn at my own pace while having access to live doubt-clearing sessions was perfect.',
    rating: 5,
  },
  {
    name: 'Amit Singh',
    role: 'Small Business Owner',
    image: testimonials4,
    content: 'This GST course helped me understand complex tax regulations easily.',
    rating: 5,
  },
  {
    name: 'Rohit Verma',
    role: 'Chartered Accountant',
    image: testimonials5,
    content: 'Very practical and job-oriented GST course.',
    rating: 5,
  },
  {
    name: 'Ankit Rao',
    role: 'Finance Professional',
    image: testimonials6,
    content: 'Highly recommended for professionals.',
    rating: 5,
  },
  
  {
    name: 'Sunita Rao',
    role: 'Finance Professional',
    image: testimonials7,
    content: 'Highly recommended for professionals.',
    rating: 5,
  },
  ,
  {
    name: 'Mandeep Singh',
    role: 'Freelance Consultant',
    image: testimonials8,
    content: 'Highly recommended for professionals.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      const slider = sliderRef.current;
      const cardWidth = slider.children[0].clientWidth + 32;
      slider.scrollBy({ left: cardWidth, behavior: 'smooth' });

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - cardWidth
      ) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of satisfied professionals who transformed their GST knowledge
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-start bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-50" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 italic">
                {testimonial.content}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
