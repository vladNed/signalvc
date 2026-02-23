"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ZoomOut, Upload } from "lucide-react";
import { Button } from "@signalvc/ui";

interface AvatarEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (croppedBlob: Blob) => void;
}

const CANVAS_SIZE = 280;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export function AvatarEditor({ open, onClose, onSave }: AvatarEditorProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const resetState = useCallback(() => {
    setImageSrc(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setSaving(false);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!imageSrc) return;
      e.preventDefault();
      setDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    },
    [imageSrc, offset],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      const maxOffset = (CANVAS_SIZE * (zoom - 1)) / 2;
      const newX = Math.max(-maxOffset, Math.min(maxOffset, e.clientX - dragStart.x));
      const newY = Math.max(-maxOffset, Math.min(maxOffset, e.clientY - dragStart.y));
      setOffset({ x: newX, y: newY });
    },
    [dragging, dragStart, zoom],
  );

  const handleMouseUp = useCallback(() => setDragging(false), []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!imageSrc) return;
      const touch = e.touches[0];
      setDragging(true);
      setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
    },
    [imageSrc, offset],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging) return;
      const touch = e.touches[0];
      const maxOffset = (CANVAS_SIZE * (zoom - 1)) / 2;
      const newX = Math.max(-maxOffset, Math.min(maxOffset, touch.clientX - dragStart.x));
      const newY = Math.max(-maxOffset, Math.min(maxOffset, touch.clientY - dragStart.y));
      setOffset({ x: newX, y: newY });
    },
    [dragging, dragStart, zoom],
  );

  const handleTouchEnd = useCallback(() => setDragging(false), []);

  const handleZoomChange = useCallback(
    (newZoom: number) => {
      const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      const maxOffset = (CANVAS_SIZE * (clampedZoom - 1)) / 2;
      setOffset((prev) => ({
        x: Math.max(-maxOffset, Math.min(maxOffset, prev.x)),
        y: Math.max(-maxOffset, Math.min(maxOffset, prev.y)),
      }));
      setZoom(clampedZoom);
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (!imageSrc || !imageRef.current) return;
    setSaving(true);

    const canvas = document.createElement("canvas");
    const outputSize = 256;
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext("2d")!;

    // Clip to circle
    ctx.beginPath();
    ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const img = imageRef.current;
    const aspect = img.naturalWidth / img.naturalHeight;
    let drawW: number, drawH: number;
    if (aspect >= 1) {
      drawH = CANVAS_SIZE * zoom;
      drawW = drawH * aspect;
    } else {
      drawW = CANVAS_SIZE * zoom;
      drawH = drawW / aspect;
    }

    const scale = outputSize / CANVAS_SIZE;
    const drawX = (outputSize - drawW * scale) / 2 + offset.x * scale;
    const drawY = (outputSize - drawH * scale) / 2 + offset.y * scale;

    ctx.drawImage(img, drawX, drawY, drawW * scale, drawH * scale);

    canvas.toBlob(
      (blob) => {
        if (blob) onSave(blob);
        setSaving(false);
      },
      "image/png",
      1,
    );
  }, [imageSrc, zoom, offset, onSave]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-modal-overlay backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-modal-surface border border-border rounded-3xl p-6 w-full max-w-sm space-y-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Edit Profile Photo</h3>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Preview area */}
            <div className="flex flex-col items-center gap-4">
              {imageSrc ? (
                <>
                  {/* Circular preview */}
                  <div
                    className="relative rounded-full overflow-hidden border-2 border-border cursor-grab active:cursor-grabbing select-none"
                    style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={imageRef}
                      src={imageSrc}
                      alt="Preview"
                      draggable={false}
                      className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover pointer-events-none"
                      style={{
                        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                      }}
                    />
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-3 w-full max-w-[280px]">
                    <button
                      onClick={() => handleZoomChange(zoom - 0.1)}
                      className="text-body hover:text-foreground transition-colors"
                    >
                      <ZoomOut size={18} />
                    </button>
                    <input
                      type="range"
                      min={MIN_ZOOM}
                      max={MAX_ZOOM}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => handleZoomChange(Number(e.target.value))}
                      className="flex-1 accent-[#615fff] h-1"
                    />
                    <button
                      onClick={() => handleZoomChange(zoom + 0.1)}
                      className="text-body hover:text-foreground transition-colors"
                    >
                      <ZoomIn size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-muted-foreground hover:text-body transition-colors"
                  >
                    Choose a different photo
                  </button>
                </>
              ) : (
                /* Upload area */
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-3 rounded-full border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
                  style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
                >
                  <Upload size={32} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload</span>
                  <span className="text-[10px] text-faint">JPG, PNG or WebP</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 cursor-pointer">
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                disabled={!imageSrc || saving}
                className="flex-1 cursor-pointer"
              >
                {saving ? "Saving..." : "Save Photo"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
