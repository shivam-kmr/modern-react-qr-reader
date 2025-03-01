declare module 'modern-react-qr-reader' {
    import { Component, CSSProperties } from "react";
  
    interface QrReaderProps {
      onScan: (data: string | null) => void;
      onError: (err: any) => void;
      onLoad?: () => void;
      onImageLoad?: () => void;
      delay?: number | boolean;
      facingMode?: "user" | "environment";
      cameraId?: string;
      legacyMode?: boolean;
      resolution?: number;
      showViewFinder?: boolean;
      style?: CSSProperties;
      className?: string;
      constraints?: MediaTrackConstraints;
    }
  
    export default class QrReader extends Component<QrReaderProps> {}
  }
  