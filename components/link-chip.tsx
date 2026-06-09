interface LinkChipProps {
  path: string
}

export function LinkChip({ path }: LinkChipProps) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[10px] leading-none text-primary pointer-events-none select-none align-middle whitespace-nowrap">
      {path}
    </span>
  )
}
