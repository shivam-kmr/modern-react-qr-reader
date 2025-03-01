declare module 'modern-react-qr-reader' {
    import { Component } from "react";
  
    interface QrReaderProps {
      delay?: number;
      onScan: (data: string | null) => void;
      onError: (err: any) => void;
      facingMode?: "user" | "environment";
    }
  
    export default class QrReader extends Component<QrReaderProps> {}
  }
  