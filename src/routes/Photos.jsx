import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = (id) => {
    fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      // Update photos array by removing the deleted photo
      setPhotos(photos.filter(photo => photo.id !== id));
    })
    .catch(error => {
      // Handle errors
    });
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(
        `https://gallery-app-server.vercel.app/photos?_sort=id&_order=${sort}`
      )
      const json = await response.json()
      setPhotos(json)
      console.log(json)
    }
    
    console.log(fetchData()); 
  }, [sort]);

  useEffect(() => {
    setLoading(true);
    async function fetcSearch() {
      const response = await fetch(
        `https://gallery-app-server.vercel.app/photos?q=${submited}`
      )
      const json = await response.json()
      setPhotos(json)
      console.log(json)
    }
    
    console.log(fetcSearch()); 
  }, [submited]);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  function handleOrderChange(event) {
    setSort(event.target.value)
  }

  useEffect(() => {
    setLoading(true);
    fetch('https://gallery-app-server.vercel.app/photos')
      .then(response => response.json())
      .then(photos => setPhotos(photos))
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={handleOrderChange}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={handleSearchChange}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {photos === null ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
