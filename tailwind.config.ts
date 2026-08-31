import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fff0f5",
          100: "#ffe0ec",
          200: "#ffc2d9",
          300: "#ff94be",
          400: "#ff579c",
          500: "#ff2e83",
          600: "#e6116a",
          700: "#be0552",
          800: "#9e0744",
          900: "#840b3c",
        },
        gold: {
          100: "#fdf8ee",
          200: "#faeed4",
          300: "#f5dda8",
          400: "#ecc473",
          500: "#e2a945",
          600: "#c7872f",
          rosegold: "#e8a598",
          "rosegold-light": "#f6d0ba",
          "rosegold-dark": "#b76e79",
        },
        noir: {
          900: "#0b0609",
          850: "#120a10",
          800: "#180d15",
          700: "#22131e",
          600: "#2f1b2a",
        },
        silk: {
          50: "#fff9fb",
          100: "#fff2f6",
          200: "#fae8ef",
          300: "#f4d6e2",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "luxury-rose": "linear-gradient(135deg, #ff4d88 0%, #e8a598 50%, #ff85a2 100%)",
        "luxury-gold": "linear-gradient(135deg, #f6d0ba 0%, #e8a598 50%, #b76e79 100%)",
        "luxury-dark": "linear-gradient(180deg, #0b0609 0%, #160c14 50%, #0b0609 100%)",
      },
      boxShadow: {
        "rose-sm": "0 8px 25px -4px rgba(255, 77, 136, 0.15)",
        "rose-md": "0 16px 36px -6px rgba(255, 77, 136, 0.22)",
        "rose-lg": "0 25px 60px -12px rgba(255, 77, 136, 0.32)",
        "rose-glow": "0 0 50px rgba(255, 77, 136, 0.35)",
        "gold-glow": "0 0 50px rgba(232, 165, 152, 0.35)",
        "glass-inset": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-fast": "float 3.5s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
