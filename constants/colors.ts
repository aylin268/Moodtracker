export const colors = {
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#e74c3c",
    background: "#ecf0f1",
    surface: "#ffffff",
    textPrimary: "#2c3e50",
    textSecondary: "#95a5a6",
    border: "#dcdcdc",
    disabled: "#bdc3c7",
    error: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",
    success: "#2ecc71",
    lightGray: "#f5f5f5",
    gray: "#e0e0e0",
    darkGray: "#333333",
    white: "#ffffff",
    black: "#000000",
  } as const;
  
  export type Colors = typeof colors;