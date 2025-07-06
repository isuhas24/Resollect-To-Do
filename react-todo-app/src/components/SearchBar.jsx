import './SearchBar.css';

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search-bar"
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search todos..."
    />
  );
}
