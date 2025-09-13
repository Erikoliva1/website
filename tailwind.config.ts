import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        'accent-music': {
          DEFAULT: 'var(--accent-music)',
          dark: 'var(--accent-music-dark)',
          light: 'var(--accent-music-light)',
        }
      },
      fontFamily: {
        system: ['var(--font-system)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-system)', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'title1': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
        'title2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'callout': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],
        'caption1': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption2': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        'apple-xs': 'var(--spacing-xs)',
        'apple-sm': 'var(--spacing-sm)',
        'apple-md': 'var(--spacing-md)',
        'apple-lg': 'var(--spacing-lg)',
        'apple-xl': 'var(--spacing-xl)',
        'apple-2xl': 'var(--spacing-2xl)',
        'apple-3xl': 'var(--spacing-3xl)',
      },
      boxShadow: {
        'apple-sm': 'var(--shadow-sm)',
        'apple': 'var(--shadow)',
        'apple-md': 'var(--shadow-md)',
        'apple-lg': 'var(--shadow-lg)',
        'apple-xl': 'var(--shadow-xl)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { 
            opacity: "0",
            transform: "translateY(24px)"
          },
          to: { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        scaleIn: {
          from: { 
            opacity: "0",
            transform: "scale(0.95)"
          },
          to: { 
            opacity: "1",
            transform: "scale(1)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slideUp": "slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        "scaleIn": "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;