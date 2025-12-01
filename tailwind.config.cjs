export default {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#4a0e2a"
        },
        obsidian: {
          50: "#f5f5f6",
          100: "#e6e7e9",
          200: "#c9cbd0",
          300: "#a6a9b2",
          400: "#727684",
          500: "#474a50",
          600: "#2e3035",
          700: "#1d1e22",
          800: "#111114",
          900: "#0a0a0c",
          950: "#050507" 
        }
      },
      boxShadow: {
        glow: "0 0 20px rgba(236, 72, 153, 0.35)",
        card: "0 4px 30px rgba(0,0,0,0.4)",
        soft: "0 2px 12px rgba(0,0,0,0.2)"
      },

      backdropBlur: {
        xs: "2px"
      },
      fontFamily: {
        sans: [
          "Poppins",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ]
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        soft: "0.75rem"
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        pop: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 }
        }
      },
      animation: {
        fade: "fade .35s ease-out",
        pop: "pop .25s ease-out"
      }
    }
  },

  plugins: []
}
