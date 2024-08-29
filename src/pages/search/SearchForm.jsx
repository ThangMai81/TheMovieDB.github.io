import { useRef } from "react";
import { styled } from "styled-components";
const Input = styled.input`
  &:focus,
  &:active {
    background: none !important;

    background-color: transparent !important;
  }
`;
function SearchForm({ handleGetInputFromForm }) {
  const inputVal = useRef();
  function handleHideInputPlaceholder(event, stateOfInput) {
    if (stateOfInput === "focus") {
      event.target.placeholder = "";
    } else {
      event.target.placeholder = "Type the film you want!";
    }
  }
  function handleClickReset() {
    inputVal.current.value = "";
  }
  function handleClickSearch() {
    console.log(inputVal.current.value);
    handleGetInputFromForm(inputVal.current.value);
  }
  return (
    <form className="text-white bg-white w-[500px] h-[150px] rounded-sm relative">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="border-[2px] border-white border-b-blue-700 mx-4 mt-4 ">
        <Input
          type="text"
          name="film-name"
          className="w-[430px] text-black"
          placeholder="Type the film you want!"
          onFocus={(event) => handleHideInputPlaceholder(event, "focus")}
          onBlur={(event) => handleHideInputPlaceholder(event, "blur")}
          ref={inputVal}
        />
        <button type="button" onClick={handleClickSearch}>
          <i className="fa fa-search mr-[10px]" style={{ color: "grey" }}></i>
        </button>
      </div>
      {/* 2 buttons: reset and search */}
      <div className="absolute bottom-[20px] right-[60px]">
        <button
          type="button"
          className="font-bold text-sm text-slate-600 uppercase mr-[20px]"
          onClick={handleClickReset}
        >
          reset
        </button>
        <button
          type="button"
          className="font-bold text-sm text-white uppercase bg-blue-300 py-[5px] px-[10px] w-[100px]"
          onClick={handleClickSearch}
        >
          search
        </button>
      </div>
    </form>
  );
}
export default SearchForm;
