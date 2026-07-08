/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5C2E1F',
          light: '#7A4A3A',
          dark: '#3E1F15',
          50: '#FDF5F2',
          100: '#F8E8E1',
          200: '#F0CFC3',
          300: '#E4AD98',
          400: '#D4876D',
          500: '#5C2E1F',
          600: '#4A2519',
          700: '#3E1F15',
          800: '#2E1610',
          900: '#1F0F0B',
        },
        secondary: {
          DEFAULT: '#8B5E3C',
          light: '#A67B57',
          dark: '#6B472B',
        },
        accent: {
          DEFAULT: '#C89B3C',
          light: '#D4AF5E',
          dark: '#A67E2E',
          50: '#FCF8EB',
          100: '#F5EBD0',
          200: '#EDDCAA',
          300: '#E0C57A',
          400: '#D4AF5E',
          500: '#C89B3C',
          600: '#A67E2E',
          700: '#7E6023',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F2ECE2',
          darker: '#E8DFD2',
        },
        dark: {
          DEFAULT: '#2C2C2C',
          light: '#3D3D3D',
          lighter: '#555555',
        },
        text: {
          DEFAULT: '#555555',
          light: '#888888',
          dark: '#333333',
          heading: '#2C2C2C',
        },
        success: {
          DEFAULT: '#3D7A48',
          light: '#4A9558',
        },
        error: {
          DEFAULT: '#C53030',
          light: '#E53E3E',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['1.875rem', { lineHeight: '1.25' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3' }],
        'heading-4': ['1.25rem', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(92, 46, 31, 0.06)',
        'warm': '0 4px 20px rgba(92, 46, 31, 0.08)',
        'warm-lg': '0 8px 40px rgba(92, 46, 31, 0.12)',
        'warm-xl': '0 16px 60px rgba(92, 46, 31, 0.16)',
        'gold': '0 4px 20px rgba(200, 155, 60, 0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
