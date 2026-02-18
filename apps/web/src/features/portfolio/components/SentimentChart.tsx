"use client";

import { useRef, useEffect } from "react";

type SentimentChartProps = {
  data: { month: string; value: number }[];
  sentiment: number;
  sentimentTrend: number;
};

export function SentimentChart({ data, sentiment, sentimentTrend }: SentimentChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const paddingBottom = 24;
    const paddingTop = 8;
    const chartHeight = height - paddingBottom - paddingTop;

    const maxValue = Math.max(...data.map((d) => d.value), 100);
    const minValue = 0;

    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y: paddingTop + chartHeight - ((d.value - minValue) / (maxValue - minValue)) * chartHeight,
    }));

    // Fill area
    const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
    gradient.addColorStop(0, "rgba(16, 185, 129, 0.3)");
    gradient.addColorStop(1, "rgba(16, 185, 129, 0.02)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const cp1x = (points[i - 1].x + points[i].x) / 2;
      const cp1y = points[i - 1].y;
      const cp2x = cp1x;
      const cp2y = points[i].y;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[i].x, points[i].y);
    }
    ctx.lineTo(width, height - paddingBottom);
    ctx.lineTo(0, height - paddingBottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const cp1x = (points[i - 1].x + points[i].x) / 2;
      const cp1y = points[i - 1].y;
      const cp2x = cp1x;
      const cp2y = points[i].y;
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[i].x, points[i].y);
    }
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw endpoint dot
    const lastPoint = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#10b981";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw start dot (red for "current month" highlight like the design)
    const firstPoint = points[0];
    ctx.beginPath();
    ctx.arc(firstPoint.x, firstPoint.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ef4444";
    ctx.fill();

    // Month labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    data.forEach((d, i) => {
      const x = (i / (data.length - 1)) * width;
      // Highlight first and last month
      if (i === 0 || i === data.length - 1) {
        ctx.fillStyle = "#10b981";
      } else {
        ctx.fillStyle = "#6b7280";
      }
      ctx.fillText(d.month, x, height - 4);
    });
  }, [data]);

  const trendColor = sentimentTrend >= 0 ? "text-emerald-400" : "text-red-400";
  const trendPrefix = sentimentTrend >= 0 ? "↑" : "↓";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-accent-foreground">Sentiment Over Time</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${trendColor}`}>
            {trendPrefix}
            {Math.abs(sentimentTrend)}%
          </span>
          <span className="text-xl font-bold text-white">{sentiment}%</span>
        </div>
      </div>
      <div className="w-full h-32">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
