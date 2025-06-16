import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { SortOption } from "@/types";

const useSortProduct = () => {
  const searchParams = useSearchParams();
  console.log("Current search params:", searchParams.toString());
  const router = useRouter();

  const sort = useMemo<SortOption>(() => {
    const field = searchParams.get("sortBy") ?? "";
    const order = searchParams.get("order") as "asc" | "desc" | null;
    return { field, order: order ?? undefined };
  }, [searchParams]);

  const updateSort = (newSort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());

    // Set field
    if (newSort.field) {
      params.set("sortBy", newSort.field);
    }

    // Handle order: only keep if field is 'price'
    if (newSort.field === "price") {
      params.set("order", newSort.order ?? "asc");
    } else {
      params.delete("order");
    }
    console.log("Updated sort params:", params.toString());

    // Not strictly necessary, but updating the URL ensures the sort state is shareable and persists across reloads.
    router.push(`?${params.toString()}`);
  };

  return {
    sort,
    updateSort,
  };
};

export default useSortProduct;
