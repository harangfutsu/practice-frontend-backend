import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, deleteData } from "../store/redux/courseReducer";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value: course, isLoading, isError } = useSelector((state) => state.course);

  // 🔹 state untuk filter/search/sort
const [filters, setFilters] = useState({
  category: "",
  search: "",
  sortBy: "",
  order: "",
  limit: 5,
  page: 1,
});


  useEffect(() => {
    dispatch(getData(filters)); // ambil data berdasarkan filter
  }, [dispatch, filters]); // jika filter berubah, ambil ulang data

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFilters({
      category: "",
      search: "",
      sortBy: "",
      order: "",
    });
  };

  const handlePageChange = (newPage) => {
  setFilters((prev) => ({
    ...prev,
    page: newPage,
  }));
};


  return (
    <div>
      <h2>Home</h2>

      {/* 🔹 Filter/Search/Sort UI */}
      <div style={{ marginBottom: "20px" }}>
        <label>Category: </label>
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All</option>
          <option value="Programming">Programming</option>
          <option value="Desain">Desain</option>
          <option value="Bisnis">Bisnis</option>
          <option value="Digital">Digital</option>
        </select>

        &nbsp;&nbsp;
        <label>Search: </label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Cari title/description"
        />

        &nbsp;&nbsp;
        <label>Sort By: </label>
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="">Default</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="language">Language</option>
        </select>

        &nbsp;&nbsp;
        <select name="order" value={filters.order} onChange={handleChange}>
          <option value="">Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        &nbsp;&nbsp;
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* 🔹 Data loading/error */}
      {isLoading && (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      )}

      {isError && (
        <div className="flex flex-col justify-center items-center">
          <p>Error</p>
          <button className="border p-1 cursor-pointer" onClick={() => dispatch(getData(filters))}>
            Reload
          </button>
        </div>
      )}

      {/* 🔹 Daftar Course */}
      {!isLoading && !isError && (
        <div>
          <button onClick={() => navigate("/entry")}>Add Course</button>
          <br />
          <br />

          {course.length === 0 ? (
            <p>Tidak ada course ditemukan.</p>
          ) : (
            course.map((item, index) => (
              <div key={index}>
                <span>Title : </span>
                <span>{item.title}</span>
                <br />
                <span>Category : </span>
                <span>{item.category}</span>
                <br />
                <span>Description : </span>
                <span>{item.description}</span>
                <br />
                <span>Price : </span>
                <span>{item.price}</span>
                <br />
                <span>Language : </span>
                <span>{item.language}</span>
                <br />
                <button onClick={() => navigate(`/update/${item.course_id}`)}>Edit</button>
                <button onClick={() => dispatch(deleteData(item.course_id))}>Delete</button>
                <br />
                <br />
              </div>
            ))
          )}
          <div style={{ marginTop: "20px" }}>
            <button
              disabled={filters.page === 1}
              onClick={() => handlePageChange(filters.page - 1)}
            >
              Prev
            </button>

            <span style={{ margin: "0 10px" }}>Page {filters.page}</span>

            <button
              disabled={course.length < filters.limit}
              onClick={() => handlePageChange(filters.page + 1)}
            >
              Next
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;
