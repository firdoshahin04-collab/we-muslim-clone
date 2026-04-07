import { motion } from 'motion/react';

export const RubElHizb = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <motion.svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    whileHover={{ rotate: 45 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <path 
      d="M12 2L15.09 5.09L19 4.5L18.41 8.41L21.5 11.5L18.41 14.59L19 18.5L15.09 17.91L12 21L8.91 17.91L5 18.5L5.59 14.59L2.5 11.5L5.59 8.41L5 4.5L8.91 5.09L12 2Z" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11.5" r="2.5" stroke={color} strokeWidth="1.5" />
  </motion.svg>
);

export const CrescentStar = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <motion.svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    animate={{ rotate: [0, 5, 0, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <path 
      d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.4035 21 14.7291 20.6773 15.9076 20.104C12.4419 19.5051 9.75 16.4636 9.75 12.8125C9.75 9.16138 12.4419 6.11993 15.9076 5.52101C14.7291 4.94771 13.4035 4.625 12 4.625" 
      fill={color}
      fillOpacity="0.1"
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M17.5 9.5L18.2347 11.1653L20 11.4347L18.6173 12.6173L19.0653 14.5L17.5 13.5347L15.9347 14.5L16.3827 12.6173L15 11.4347L16.7653 11.1653L17.5 9.5Z" 
      fill={color}
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </motion.svg>
);

export const IslamicPattern = ({ className = "" }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="islamic-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0L60 30L30 60L0 30L30 0ZM30 10L10 30L30 50L50 30L30 10Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-grid)" />
    </svg>
  </div>
);
