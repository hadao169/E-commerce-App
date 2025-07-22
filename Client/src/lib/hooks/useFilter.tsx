import { FilterOption } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
const useFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filter = useMemo((): FilterOption => {
    const avgRating = searchParams.get("avgRating");

    // Parse priceRange from string to object
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    return {
      avgRating: avgRating ? Number(avgRating) : undefined,
      minPrice: minPrice ? Number(minPrice) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : Infinity,
    };
  }, [searchParams]);

  const updateFilter = (newFilter: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilter.avgRating) {
      params.set("avgRating", newFilter.avgRating.toString());
    } else {
      params.delete("avgRating");
    }

    if (newFilter.minPrice !== undefined) {
      params.set("minPrice", newFilter.minPrice.toString());
    } else {
      params.delete("minPrice");
    }

    if (newFilter.maxPrice !== undefined) {
      params.set("maxPrice", newFilter.maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    router.push(`?${params.toString()}`);
  };

  return {
    filter,
    updateFilter,
  };
};

export default useFilter;
