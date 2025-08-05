import { useEffect, useState } from "react";
import { FaBrain, FaBook, FaUsers, FaArrowRight } from "react-icons/fa";
type FeatureCardProps = {
  iconType: 'brain' | 'book' | 'users';
  title: string;
  description: string;
  delay?: number;
};

export default function FeatureCard({ iconType, title, description, delay = 0 }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 200);
    return () => clearTimeout(timer);
  }, [delay]);

  const getIcon = () => {
    switch (iconType) {
      case 'brain':
        return <FaBrain className="text-white text-xl" />;
      case 'book':
        return <FaBook className="text-white text-xl" />;
      case 'users':
        return <FaUsers className="text-white text-xl" />;
      default:
        return <FaBrain className="text-white text-xl" />;
    }
  };

  return (
    <div
      className={`p-8 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6">
        {getIcon()}
      </div>

      <h3 className="text-xl font-semibold mb-4 text-slate-800">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

      <div className="flex items-center text-slate-800 font-medium hover:text-slate-600 transition-colors cursor-pointer">
        <span>Learn more</span>
        <FaArrowRight className="ml-2 text-sm" />
      </div>
    </div>
  );
};