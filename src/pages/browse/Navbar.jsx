function Navbar({ changeBgNav, handleChangeRoute }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      {/* Navigation bar (with position fixed) */}
      <nav
        className={`${
          changeBgNav && "bg-gray-950 transition duration-700"
        } flex justify-between fixed w-full`}
      >
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => handleChangeRoute("homepage")}
            className="text-red-600 font-bold ml-10"
          >
            Movie App
          </button>
          <button
            type="button"
            onClick={() => handleChangeRoute("search")}
            className="absolute right-10"
          >
            <i className="fa fa-search" style={{ color: "grey" }}></i>
          </button>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
