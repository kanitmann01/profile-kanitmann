import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

const REPO_URL = "https://github.com/kanitmann01/profile-kanitmann";
const TEMPLATE = "fable5-submission.md";
const SUBMISSION_TITLE = "[Fable 5] ";
const SUBMISSION_BODY =
  "Please fill in the template. The site will be triaged and added if approved.";

const buildSubmissionHref = () => {
  const params = new URLSearchParams({
    template: TEMPLATE,
    title: SUBMISSION_TITLE,
    body: SUBMISSION_BODY,
  });
  return `${REPO_URL}/issues/new?${params.toString()}`;
};

export interface SubmitSiteButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function SubmitSiteButton({
  className,
  children = "Submit a site",
}: SubmitSiteButtonProps) {
  return (
    <Button asChild variant="default" size="lg" className={className}>
      <a href={buildSubmissionHref()} target="_blank" rel="noopener noreferrer">
        <Plus className="mr-2 h-4 w-4" />
        {children}
      </a>
    </Button>
  );
}
