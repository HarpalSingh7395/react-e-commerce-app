import React from 'react';

const LoadingBar = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center z-50">
      {/* Main Loading Container */}
      <div className="relative">
        {/* Animated Shopping Bag */}
        <div className="relative mb-8 animate-bounce">
          <div className="w-20 h-24 bg-gradient-to-b from-blue-500 to-purple-600 rounded-lg shadow-2xl transform rotate-3 animate-pulse">
            {/* Bag Handle */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-6 border-4 border-blue-500 rounded-full bg-transparent"></div>
            </div>
            {/* Bag Shine Effect */}
            <div className="absolute top-2 left-2 w-3 h-8 bg-white/30 rounded-full animate-pulse"></div>
          </div>
          
          {/* Floating Items */}
          <div className="absolute -top-2 -right-4 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping animation-delay-300"></div>
          <div className="absolute top-1/2 -right-6 w-2 h-2 bg-green-400 rounded-full animate-ping animation-delay-500"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-pulse">
            Loading your experience
          </h2>
          <div className="flex justify-center space-x-1 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar"></div>
          </div>
        </div>

        {/* Percentage Text */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600 font-medium animate-pulse">
            Preparing your shopping experience...
          </span>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float-${i % 3 + 1}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gray-300 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-gray-300 rounded-full animate-spin-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-gray-300 rounded-full animate-spin-slow animation-delay-500"></div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 2.5s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 3.5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default LoadingBar;