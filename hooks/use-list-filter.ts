"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface UseListFilterOptions {
  /** URL query param holding comma-separated chip values, e.g. "stack". */
  paramKey: string;
  /** Values considered valid — unknown URL values are dropped. */
  validValues: string[];
}

export interface ListFilterState {
  selected: string[];
  query: string;
  toggle: (value: string) => void;
  setQuery: (query: string) => void;
  clear: () => void;
  isActive: boolean;
}

const QUERY_PARAM = "q";

/**
 * Parse a comma-separated URL param into canonical valid values.
 * Matching is case-insensitive so shared links like ?stack=python work, but
 * state is always the canonical casing from the data ("Python").
 */
function parseParam(raw: string | null, validValues: string[]): string[] {
  if (!raw) return [];
  const byLower = new Map(
    validValues.map((value) => [value.toLowerCase(), value])
  );
  return raw
    .split(",")
    .map((value) => value.trim())
    .map((value) => byLower.get(value.toLowerCase()))
    .filter((value): value is string => value !== undefined);
}

/**
 * URL-synced list filter state for the projects/articles listing pages.
 *
 * Chips and the text query live in local state so interactions stay
 * responsive, initialized from and re-synced with the URL (?stack=…&q=…) so
 * back/forward navigation and shared links work.
 */
export function useListFilter({
  paramKey,
  validValues,
}: UseListFilterOptions): ListFilterState {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selected, setSelected] = React.useState<string[]>(() =>
    parseParam(searchParams.get(paramKey), validValues)
  );
  const [query, setQueryState] = React.useState(
    () => searchParams.get(QUERY_PARAM) ?? ""
  );

  // Re-sync when the URL changes externally (back/forward navigation, links).
  React.useEffect(() => {
    setSelected(parseParam(searchParams.get(paramKey), validValues));
    setQueryState(searchParams.get(QUERY_PARAM) ?? "");
  }, [searchParams, paramKey, validValues]);

  const updateUrl = React.useCallback(
    (nextSelected: string[], nextQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextSelected.length > 0) {
        params.set(paramKey, nextSelected.join(","));
      } else {
        params.delete(paramKey);
      }
      if (nextQuery.trim().length > 0) {
        params.set(QUERY_PARAM, nextQuery);
      } else {
        params.delete(QUERY_PARAM);
      }
      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(url, { scroll: false });
    },
    [searchParams, pathname, router, paramKey]
  );

  const toggle = React.useCallback(
    (value: string) => {
      const next = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      setSelected(next);
      updateUrl(next, query);
    },
    [selected, query, updateUrl]
  );

  const setQuery = React.useCallback(
    (nextQuery: string) => {
      setQueryState(nextQuery);
      updateUrl(selected, nextQuery);
    },
    [selected, updateUrl]
  );

  const clear = React.useCallback(() => {
    setSelected([]);
    setQueryState("");
    updateUrl([], "");
  }, [updateUrl]);

  return {
    selected,
    query,
    toggle,
    setQuery,
    clear,
    isActive: selected.length > 0 || query.trim().length > 0,
  };
}
