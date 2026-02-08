/// <reference types="nativewind/types" />
import { type VariantProps } from "class-variance-authority";
import { TextInput, type TextInputProps } from "react-native";
import { cn } from "../../lib/utils";
import { inputVariants } from "./input.variants";
import React from "react";

export interface InputProps extends TextInputProps, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, variant, placeholderTextColor, ...props }, ref) => {
    // Default placeholder color for dark mode if not provided is usually too dark
    const phColor = placeholderTextColor ?? "#a1a1aa";

    return (
      <TextInput
        ref={ref}
        className={cn(inputVariants({ variant, className }), "text-foreground")}
        placeholderTextColor={phColor}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
