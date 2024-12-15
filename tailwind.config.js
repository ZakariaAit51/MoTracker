export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          
            "primary": "#0099e2",
                      
            "secondary": "#4300ff",
                      
            "accent": "#00d800",
                      
            "neutral": "#0f0a08",
                      
            "base-100": "#152537",
                      
            "info": "#009bff",
                      
            "success": "#008300",
                      
            "warning": "#e17000",
                      
            "error": "#ff555b",
          },
        },
      ],
    },
  plugins: [
    require('daisyui'),
  ],
}