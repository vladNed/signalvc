# UI Component Management Framework

This document outlines the framework for building cross-platform UI components in `@signalvc/ui`.

## 1. Core Philosophy: "Semantics on Web, Native on Mobile"

We satisfy the requirement of **"Tailwind for Next.js"** and **"NativeWind for React Native"** using a **Twin-Implementation Strategy** unified by **Class Variance Authority (CVA)**.

-   **Logic (Shared)**: We define visual variants 100% in JavaScript using `cva`.
-   **Web Implementation**: Renders semantic HTML (`<button>`, `<nav>`) specifically for proper SEO and accessibility.
-   **Mobile Implementation**: Renders Native primitives (`<Pressable>`, `<View>`) via NativeWind.

## 2. Directory Structure

Each component in `packages/ui` follows this strict structure:

```text
packages/ui/src/components/Button/
├── button.variants.ts   // SHARED: Pure JS Design Logic (CVA)
├── index.web.tsx        // WEB: Semantic HTML + Tailwind
├── index.tsx            // MOBILE: Native Primitives + NativeWind
└── index.ts             // Barrel Export
```

## 3. Implementation Recipe

### Step A: Define Shared Variants (`*.variants.ts`)

```typescript
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-md font-medium transition-colors flex items-center justify-center", 
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-100",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

### Step B: Web Implementation (`index.web.tsx`)
Must use semantic HTML tags.

```tsx
import { buttonVariants } from "./button.variants";
import { cn } from "../../lib/utils";

export const Button = ({ className, variant, size, ...props }) => (
  <button 
    className={cn(buttonVariants({ variant, size }), className)} 
    {...props} 
  />
);
```

### Step C: Mobile Implementation (`index.tsx`)
Must use React Native primitives.

```tsx
import { Pressable, Text } from "react-native";
import { buttonVariants } from "./button.variants";
import { cn } from "../../lib/utils";

export const Button = ({ className, variant, size, label, ...props }) => (
  <Pressable 
    className={cn(buttonVariants({ variant, size }), className)} 
    {...props}
  >
    <Text className="text-white">{label}</Text>
  </Pressable>
);
```

## 4. Shared Configuration

`apps/web/tailwind.config.ts` and `apps/mobile/tailwind.config.ts` **MUST** import the shared preset from `packages/ui/tailwind.config.ts` to ensure color tokens (e.g., `bg-brand-500`) are identical on both platforms.
