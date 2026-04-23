"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawAPI } from "@excalidraw/excalidraw/types";

interface ExcalidrawCanvasHandle {
  getDescription: () => string;
  getSceneJSON: () => string;
}

export const ExcalidrawCanvas = forwardRef<ExcalidrawCanvasHandle>((_, ref) => {
  const excalidrawAPI = useRef<ExcalidrawAPI>(null);

  useImperativeHandle(ref, () => ({
    getDescription: () => {
      if (!excalidrawAPI.current) return "No diagram drawn";
      const elements = excalidrawAPI.current.getSceneElements();
      if (elements.length === 0) return "Empty diagram (no elements drawn)";

      const textLabels = elements
        .filter((el: any) => el.type === "text" && el.text)
        .map((el: any) => el.text);
      const rectangles = elements.filter((el: any) => el.type === "rectangle");
      const arrows = elements.filter((el: any) => el.type === "arrow");
      const ellipses = elements.filter((el: any) => el.type === "ellipse");
      const diamonds = elements.filter((el: any) => el.type === "diamond");

      return `Architecture diagram contains: ${rectangles.length} boxes, ${ellipses.length} ellipses, ${diamonds.length} diamonds, ${arrows.length} arrows. Labels: ${textLabels.join(", ") || "none"}.`;
    },
    getSceneJSON: () => {
      if (!excalidrawAPI.current) return "";
      const elements = excalidrawAPI.current.getSceneElements();
      return JSON.stringify(elements);
    },
  }));

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-slate-700">
      <Excalidraw
        excalidrawAPI={(api) => {
          excalidrawAPI.current = api;
        }}
        initialData={{
          elements: [],
          appState: {
            viewBackgroundColor: "#F2F3F2",
            theme: "light",
          },
        }}
        theme="light"
      />
    </div>
  );
});

ExcalidrawCanvas.displayName = "ExcalidrawCanvas";
