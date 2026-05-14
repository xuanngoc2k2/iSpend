"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCw, X, Check, Image as ImageIcon } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (blob: Blob) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  const startCamera = async () => {
    stopCamera();
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
        audio: false,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      setError("Không thể truy cập camera. Vui lòng cấp quyền.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0);
      
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      fetch(capturedImage)
        .then((res) => res.blob())
        .then((blob) => onCapture(blob));
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onClose} className="text-white p-2">
          <X className="w-6 h-6" />
        </button>
        <button onClick={toggleCamera} className="text-white p-2">
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      {/* Preview / Capture */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {capturedImage ? (
          <img src={capturedImage} className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-10 text-center text-white">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-10 flex items-center justify-around bg-black">
        {capturedImage ? (
          <>
            <button
              onClick={() => setCapturedImage(null)}
              className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={handleConfirm}
              className="w-20 h-20 rounded-full bg-ios-blue flex items-center justify-center text-white"
            >
              <Check className="w-10 h-10" />
            </button>
          </>
        ) : (
          <>
            <button className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <ImageIcon className="w-6 h-6" />
            </button>
            <button
              onClick={takePhoto}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1"
            >
              <div className="w-full h-full bg-white rounded-full active:scale-90 transition-transform" />
            </button>
            <div className="w-12" /> {/* Spacer */}
          </>
        )}
      </div>
    </motion.div>
  );
}
