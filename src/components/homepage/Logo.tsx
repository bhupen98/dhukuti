"use client";

import Link from "next/link";

interface LogoProps {
  variant?: 'default' | 'compact';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  if (variant === 'compact') {
    return (
      <Link href="/" className={`flex items-center space-x-2 group ${className}`}>
        {/* Compact Logo Icon - Simple and Visible */}
        <div className="relative">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
            {/* Simple icon - D for Dhukuti */}
            <span className="text-white font-bold text-sm">D</span>
          </div>
          {/* Accent dot */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full shadow-sm"></div>
        </div>
        <span className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors duration-200">
          Dhukuti
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={`flex items-center space-x-3 group ${className}`}>
      {/* Main Logo Icon - Simple and Visible */}
      <div className="relative">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
          {/* Simple icon - D for Dhukuti */}
          <span className="text-white font-bold text-lg">D</span>
        </div>
        {/* Accent dot */}
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-500 rounded-full shadow-sm"></div>
        {/* Community indicator */}
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-600 rounded-full shadow-sm"></div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors duration-200">
          Dhukuti
        </span>
        <span className="text-xs text-gray-500 -mt-1 font-medium">
          Community Savings
        </span>
      </div>
    </Link>
  );
};

export default Logo;
