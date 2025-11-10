import React, { useState } from "react";
import "../styles/EquipmentTable.css";

const CHESearchBar = ({ onSearch, onClear, onFetch, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const handleDeleteCHE = (e) => {
    e.preventDefault();
    onDelete(deleteId);
  };
  const handleFetchAllCHEs = (e) => {
    e.preventDefault();
    onFetch();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSearch}>
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search CHE by ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                //onChange={(e) => setDeleteId(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleFetchAllCHEs}
              >
                Fetch All CHEs
              </button>

              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleDeleteCHE}
              >
                Delete CHE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CHESearchBar;
