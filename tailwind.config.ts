import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          50: '#faf9f7',   // Warm light beige
          100: '#f5f4f1',  // Light warm beige
          200: '#e8e6e0',  // Medium light warm beige
          300: '#d6d3cb',  // Medium warm beige
          400: '#a8a399',  // True medium warm gray
          500: '#737066',  // Balanced warm gray
          600: '#56533d',  // Dark medium warm gray
          700: '#414033',  // Dark warm gray
          800: '#2c2a22',  // Very dark warm gray
          850: '#1f1e18',  // Almost black with warm undertone (dirty black equivalent)
          900: '#171717',  // Dark
          950: '#0a0a0a',  // Near black
        },
        beige: {
          50: '#faf9f7',   // Lightest warm beige
          100: '#f5f4f1',  // Very light warm beige
          200: '#e8e6e0',  // Light warm beige
          300: '#d6d3cb',  // Medium warm beige
          400: '#c4c0b6',  // Medium beige
          500: '#a8a399',  // Balanced beige
        },
        kliv: {
          red: {
            DEFAULT: "hsl(var(--kliv-red))",
            light: "hsl(var(--kliv-red-light))",
            dark: "hsl(var(--kliv-red-dark))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;