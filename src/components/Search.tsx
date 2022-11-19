import SearchIcon from "./Icons/SearchIcon";

const Search = () => {
  return (
    <div className="relative mt-4 w-full md:hidden">
      <div className="fill-my_darkGray pointer-events-none absolute inset-y-0 left-0 flex w-6 items-center pl-3">
        <SearchIcon color="gray" />
      </div>
      <input
        className="bg-my_lightGray placeholder-my_darkGray text-Bm w-full rounded-md py-[5px] pl-8"
        type="text"
        placeholder="Search"
        name=""
        id=""
      />
    </div>
  );
};

export default Search;
