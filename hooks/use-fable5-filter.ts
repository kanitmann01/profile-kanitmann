"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FABLE5_TAGS, type Fable5Tag } from "@/data/fable5";

export type Fable5FilterState = {
  selectedTags: Fable5Tag[];
  toggleTag: (tag: Fable5Tag) => void;
  clear: () => void;
  shuffleSeed: number;
  shuffle: () => void;
  isActive: boolean;
};

const parseTagsParam = (raw: string | null): Fable5Tag[] => {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t): t is Fable5Tag => FABLE5_TAGS.includes(t as Fable5Tag));
};

export function useFable5Filter(): Fable5FilterState {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedTags, setSelectedTags] = React.useState<Fable5Tag[]>(() =>
    parseTagsParam(searchParams.get("tags"))
  );
  const [shuffleSeed, setShuffleSeed] = React.useState(0);

  const updateUrl = React.useCallback(
    (nextTags: Fable5Tag[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextTags.length === 0) {
        params.delete("tags");
      } else {
        params.set("tags", nextTags.join(","));
      }
      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(url, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const toggleTag = React.useCallback(
    (tag: Fable5Tag) => {
      setSelectedTags((prev) => {
        const next = prev.includes(tag)
          ? prev.filter((t) => t !== tag)
          : [...prev, tag];
        updateUrl(next);
        return next;
      });
    },
    [updateUrl]
  );

  const clear = React.useCallback(() => {
    setSelectedTags([]);
    updateUrl([]);
  }, [updateUrl]);

  const shuffle = React.useCallback(() => {
    setShuffleSeed((s) => s + 1);
  }, []);

  return {
    selectedTags,
    toggleTag,
    clear,
    shuffleSeed,
    shuffle,
    isActive: selectedTags.length > 0,
  };
}
