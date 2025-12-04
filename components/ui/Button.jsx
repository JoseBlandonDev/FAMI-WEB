import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-fami-primary text-white hover:bg-fami-secondary focus:ring-fami-primary",
    outline: "border-2 border-fami-primary text-fami-primary hover:bg-fami-primary hover:text-white focus:ring-fami-primary",
    ghost: "text-fami-primary hover:bg-fami-light focus:ring-fami-primary",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
