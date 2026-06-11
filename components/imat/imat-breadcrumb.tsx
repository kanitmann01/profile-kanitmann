"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface IMATBreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function IMATBreadcrumb({ items }: IMATBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/imat">IMAT</BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <>
            <BreadcrumbSeparator key={`sep-${index}`} />
            <BreadcrumbItem key={index}>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
