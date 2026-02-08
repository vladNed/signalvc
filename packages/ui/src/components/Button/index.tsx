/// <reference types="nativewind/types" />
import { type VariantProps } from "class-variance-authority";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button.variants";
import React from "react";

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>, VariantProps<typeof buttonVariants> {
  label?: string;
  textClassName?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, label, textClassName, children, ...props }, ref) => {
    return (
      <Pressable className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {label ? (
          <Text
            className={cn(
              "font-medium text-sm",
              variant === "outline" || variant === "ghost"
                ? "text-foreground"
                : "text-primary-foreground",
              variant === "google" ? "text-black" : "",
              textClassName,
            )}
          >
            {label}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
