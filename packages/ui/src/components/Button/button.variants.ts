import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost: "hover:bg-primary hover:text-primary-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline",
        // Social specific variants
        google: "bg-white text-black border border-gray-300 hover:bg-gray-100 active:bg-gray-200",
        apple: "bg-black text-white hover:bg-gray-900 active:bg-gray-800",
        feed: "hover:bg-accent/60 hover:text-white border border-accent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu will-change-transform transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 active:translate-y-1 hover:shadow-lg transition-all duration-300",
        feedInactive: "border-accent hover:border  hover:text-white hover:bg-accent/60 disabled:pointer-events-none transform-gpu will-change-transform transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 active:translate-y-1 hover:shadow-lg transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
