import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-cyan-300 text-slate-950 hover:bg-cyan-200",
        outline: "border border-slate-600 bg-transparent text-slate-100 hover:bg-slate-800",
      },
      size: { default: "h-10 px-4 py-2", sm: "h-9 px-3" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = ({ asChild = false, className, size, variant, ...props }: ButtonProps) => {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ size, variant }), className)} {...props} />;
};
