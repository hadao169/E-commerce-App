// Because SearchPage is a server component, we need to wrap it in a Suspense component when using nextjs-specific hooks like "useSearchParams", "useRouter", "usePathname".
import { Suspense } from "react";
import SearchPage from "@/app/search/SearchPage";

export default function Search() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPage />
    </Suspense>
  );
}
