import "./style.css";

interface props {
  setSearchParam: Function;
  setPage?: Function;
}

const SearchInput = ({ setSearchParam, setPage }: props) => {
  return (
    <input
      id="search-input"
      type="text"
      placeholder="Search..."
      onChange={(e) => {
        if (setPage) setPage(1);
        setSearchParam(e.target.value);
      }}
      style={{ backgroundColor: "#fff" }}
    />
  );
};

export default SearchInput;
