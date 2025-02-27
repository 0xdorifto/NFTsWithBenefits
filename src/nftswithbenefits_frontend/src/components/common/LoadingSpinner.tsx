interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'purple';
}

const LoadingSpinner = ({ size = 'md', color = 'white' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    white: 'border-white',
    purple: 'border-purple-600'
  };

  return (
    <div
      className={`
        animate-spin rounded-full
        border-2 border-t-transparent
        ${sizeClasses[size]}
        ${colorClasses[color]}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
