import { useDebounce } from "@/hooks";
import { LoaderIcon } from "lucide-react";
import React, { useState } from "react";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (prop: string) => void;
}) => {
  const [query, setQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(query, 2000);

  React.useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <div className="mb-4 mt-4 flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search Repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 w-full max-w-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {debouncedQuery !== query && <LoaderIcon />}
    </div>
  );
};

export default SearchInput;
