export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search for a coin (e.g. Bitcoin, ETH)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
      />
    </div>
  );
}