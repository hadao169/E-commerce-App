import { SortOption, FilterOption } from "../types";

export function createProductQuery(
  options: {
    keyword?: string;
    sort?: SortOption;
    filter?: FilterOption;
  }
): string {
  const params = new URLSearchParams();

	//keyword for searching
  if (options.keyword) params.set("keyword", options.keyword);

  if (options.sort) {
    params.set("sortBy", options.sort.field);
    if (options.sort.order) params.set("order", options.sort.order);
  }

  if (options.filter) {
    const { avgRating, minPrice, maxPrice } = options.filter;
    if (avgRating !== undefined) params.set("avgRating", avgRating.toString());
    if (minPrice !== undefined) params.set("minPrice", minPrice.toString());
    if (maxPrice !== undefined) params.set("maxPrice", maxPrice.toString());
  }

  return params.toString();
}
