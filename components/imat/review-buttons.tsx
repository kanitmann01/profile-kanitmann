"use client";

import { useState } from "react";
import { X, HelpCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpacedRepetition } from "@/hooks/use-spaced-repetition";
import type { Rating } from "@/hooks/use-spaced-repetition";

interface ReviewButtonsProps {
  slug: string;
  className?: string;
}

export function ReviewButtons({ slug, className }: ReviewButtonsProps) {
  const [submitted, setSubmitted] = useState(false);
  const { recordReview } = useSpacedRepetition();

  const handleClick = (rating: Rating) => {
    if (submitted) return;
    recordReview(slug, rating);
    setSubmitted(true);
  };

  const buttons: {
    rating: Rating;
    label: string;
    icon: React.ReactNode;
    color: string;
    hoverColor: string;
  }[] = [
    {
      rating: "forgot",
      label: "Forgot",
      icon: <X className="h-5 w-5" />,
      color: "border-red-500 text-red-600",
      hoverColor: "hover:bg-red-500/10 hover:border-red-500 hover:text-red-600",
    },
    {
      rating: "fuzzy",
      label: "Fuzzy",
      icon: <HelpCircle className="h-5 w-5" />,
      color: "border-yellow-500 text-yellow-600",
      hoverColor:
        "hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-600",
    },
    {
      rating: "nailed",
      label: "Nailed it",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "border-green-500 text-green-600",
      hoverColor:
        "hover:bg-green-500/10 hover:border-green-500 hover:text-green-600",
    },
  ];

  return (
    <div
      className={cn("grid grid-cols-3 gap-3", className)}
      data-testid="review-buttons"
    >
      {buttons.map(({ rating, label, icon, color, hoverColor }) => (
        <Button
          key={rating}
          variant="outline"
          disabled={submitted}
          onClick={() => handleClick(rating)}
          className={cn(
            "min-h-[44px] flex flex-col gap-1 py-3 h-auto",
            submitted && color,
            !submitted && hoverColor
          )}
        >
          {icon}
          <span className="text-sm">{label}</span>
        </Button>
      ))}
    </div>
  );
}
