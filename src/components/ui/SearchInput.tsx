export default function SearchInput() {
  return (
    <div className="relative max-w-[15rem]">
      <input
        className="w-full h-full px-4 py-2 rounded-md"
        placeholder="Search"
      />
      <i className="bx bx-search absolute right-[1rem] top-[50%] translate-y-[-50%] text-lg text-light"></i>
    </div>
  );
}
