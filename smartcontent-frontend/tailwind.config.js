/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",

        google: {
          blue: "#4285F4",
          red: "#EA4335",
          yellow: "#FBBC05",
          green: "#34A853",
        },

        dark: {
          bg: "#0F172A",
          card: "#1E293B",
          surface: "#2A2A2A",
          border: "#333333",
          text: "#E5E7EB",
          muted: "#9CA3AF",
        },

        light: {
          bg: "#F8F9FA",
          card: "#FFFFFF",
          surface: "#F1F3F4",
          border: "#E0E0E0",
          text: "#202124",
          muted: "#5F6368",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-in",
      },

      keyframes: {
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(66,133,244,0.5), 0 0 10px rgba(66,133,244,0.3)",
          },
          "100%": {
            boxShadow:
              "0 0 10px rgba(66,133,244,0.8), 0 0 20px rgba(66,133,244,0.5)",
          },
        },

        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },

        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      boxShadow: {
        "glow-blue": "0 0 20px rgba(66,133,244,0.3)",
        "glow-green": "0 0 20px rgba(52,168,83,0.3)",
        "glow-red": "0 0 20px rgba(234,67,53,0.3)",
        "glow-yellow": "0 0 20px rgba(251,188,5,0.3)",
      },
    },
  },
  plugins: [],
};