import { useEffect, useRef, useState } from "react";

function CameraCapture({ onCapture, onSkip, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setReady(true);
      })
      .catch(() => setError("We couldn't reach your camera."));

    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const photoDataUrl = canvas.toDataURL("image/jpeg", 0.85);

    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCapture(photoDataUrl);
  };

  return (
    <div className="eld-modal-overlay">
      <div className="eld-modal">
        <button className="eld-modal-close" onClick={onClose} aria-label="Cancel">
          ✕
        </button>

        <h2>Take a quick photo</h2>
        <p className="eld-modal-sub">This confirms you've taken your medicine.</p>

        {error ? (
          <div className="eld-camera-error">
            <p>{error}</p>
            <button className="eld-btn eld-btn-primary" onClick={onSkip}>
              Confirm without a photo
            </button>
          </div>
        ) : (
          <>
            <div className="eld-camera-frame">
              <video ref={videoRef} autoPlay playsInline muted />
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div className="eld-modal-actions">
              <button
                className="eld-btn eld-btn-primary"
                onClick={handleCapture}
                disabled={!ready}
              >
                📷 Take Photo
              </button>
              <button className="eld-btn eld-btn-ghost" onClick={onSkip}>
                Skip photo, just confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;