import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'violet': '#280944',
        'tree-poppy': '#FF931E',
        'flush-orange': '#FF8500',
      },
    },
  },
  plugins: [],
} satisfies Config;
