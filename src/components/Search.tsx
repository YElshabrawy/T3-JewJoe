import SearchIcon from "./Icons/SearchIcon";

const Search = ({ className = "", isOutlined = false }) => {
  if (!isOutlined)
    return (
      <div className={"relative mt-4 w-full " + className}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-6 items-center fill-my_darkGray pl-3">
          <SearchIcon color="gray" />
        </div>
        <input
          className="w-full rounded-md bg-my_lightGray py-[5px] pl-8 text-Bm placeholder-my_darkGray"
          type="text"
          placeholder="Search"
          name=""
          id=""
        />
      </div>
    );
  else
    return (
      // Outlined
      <div className={"relative mt-4 w-full " + className}>
        <input
          className="z-10 w-full border-b py-[5px] pr-8 text-Bm text-[12px] placeholder-my_darkGray"
          type="text"
          placeholder="Search.."
          name=""
          id=""
        />
        <button className=" absolute inset-y-0 right-0 w-3 cursor-pointer items-center fill-my_darkGray">
          <SearchIcon color="black" />
        </button>
      </div>
    );
};

export default Search;
