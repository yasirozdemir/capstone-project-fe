import "./style.css";

interface props {
  setSearchParam: Function;
}

const SearchInput = ({ setSearchParam }: props) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => {
        setSearchParam(e.target.value);
      }}
      style={{ backgroundColor: "#fff" }}
    />
  );
};

export default SearchInput;
