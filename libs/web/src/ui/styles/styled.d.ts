import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    general: {
      transition: string;
      font?: string;
      color: {
        primary: string;
        secondary?: string;
        text: string;
        textSecondary: string;
        border: string;
        hover: string;
        hoverSecondary: string;
        button: string;
        buttonSecondary: string;
      };
    };
  }
}
