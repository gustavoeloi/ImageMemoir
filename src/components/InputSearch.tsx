import { Search } from "lucide-react";

import { useState } from "react";

interface Props {
  onSearch: (term: string) => void;
}

const InputSearch = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(searchTerm);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search posts by tags or titles"
          required
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default InputSearch;
