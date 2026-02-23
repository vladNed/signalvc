"use client";

import { useRef, useEffect, useCallback } from "react";

type SentimentChartProps = {
  data: { month: string; value: number }[];
  sentiment: number;
  sentimentTrend: number;
};

function getChartColor(sentiment: number) {
  if (sentiment >= 70) return { line: "#10b981", glow: "rgba(16, 185, 129, 0.6)" };
  if (sentiment >= 50) return { line: "#eab308", glow: "rgba(234, 179, 8, 0.6)" };
  return { line: "#ef4444", glow: "rgba(239, 68, 68, 0.6)" };
}

export function SentimentChart({ data, sentiment, sentimentTrend }: SentimentChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawChart = useCallback(() => {
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

    const colors = getChartColor(sentiment);

    // Read the grid line color from CSS variable for theme support
    const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--color-grid-line').trim() || "rgba(255, 255, 255, 0.04)";

    // Subtle horizontal grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = paddingTop + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Fill area with sentiment-matched gradient
    const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
    gradient.addColorStop(0, colors.line.replace(")", ", 0.25)").replace("rgb", "rgba"));
    gradient.addColorStop(1, colors.line.replace(")", ", 0.02)").replace("rgb", "rgba"));

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
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Endpoint glow
    const lastPoint = points[points.length - 1];
    const endGlow = ctx.createRadialGradient(
      lastPoint.x, lastPoint.y, 0,
      lastPoint.x, lastPoint.y, 12,
    );
    endGlow.addColorStop(0, colors.glow);
    endGlow.addColorStop(1, "transparent");
    ctx.fillStyle = endGlow;
    ctx.fillRect(lastPoint.x - 12, lastPoint.y - 12, 24, 24);

    // Endpoint dot
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = colors.line;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Start dot
    const firstPoint = points[0];
    ctx.beginPath();
    ctx.arc(firstPoint.x, firstPoint.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ef4444";
    ctx.fill();

    // Month labels
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    data.forEach((d, i) => {
      const x = (i / (data.length - 1)) * width;
      if (i === 0 || i === data.length - 1) {
        ctx.fillStyle = colors.line;
      } else {
        ctx.fillStyle = "#4b5563";
      }
      ctx.fillText(d.month, x, height - 4);
    });
  }, [data, sentiment]);

  useEffect(() => {
    drawChart();

    // Watch for theme changes (class attribute on <html>) to redraw the chart
    const observer = new MutationObserver(() => {
      drawChart();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [drawChart]);

  const trendColor = sentimentTrend >= 0 ? "text-emerald-400" : "text-red-400";
  const trendPrefix = sentimentTrend >= 0 ? "\u2191" : "\u2193";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Sentiment Over Time</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${trendColor}`}>
            {trendPrefix}
            {Math.abs(sentimentTrend)}%
          </span>
          <span className="text-xl font-bold text-foreground">{sentiment}%</span>
        </div>
      </div>
      <div className="w-full h-32">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
