// Create this file in your src/types directory

declare namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          'alt'?: string;
          'auto-rotate'?: boolean;
          'camera-controls'?: boolean;
          'shadow-intensity'?: string;
          'ar'?: boolean;
          'ar-modes'?: string;
          'environment-image'?: string;
          'exposure'?: string;
          'loading'?: 'auto' | 'lazy' | 'eager';
          'poster'?: string;
          'reveal'?: 'auto' | 'manual';
          'touch-action'?: string;
          'style'?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }