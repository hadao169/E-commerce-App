export const validSortFields = ["price", "createdAt", "numSales", "avgRating"];
export function buildFilter({
  category,
  keyword,
  avgRating,
  minPrice,
  maxPrice,
}) {
  const filter = {};

  if (category) filter.category = category;

  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { tags: { $elemMatch: { $regex: keyword, $options: "i" } } },
      { category: { $regex: keyword, $options: "i" } },
    ];
  }

  if (avgRating) filter.avgRating = { $gte: Number(avgRating) };

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  return filter;
}

export function buildSort(sortBy, order = "desc") {
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  return { [sortField]: order === "asc" ? 1 : -1 };
}
