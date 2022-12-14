import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://gallery-app-server.vercel.app/photos')
    .then((res) => res.json())
    .then((json) => setData(json))
  }, [data])

  const addPhoto = async (e) => {
    e.preventDefault();
  
    if (secret === "password") {
      // Tambahkan kata kunci "async" di depan fungsi
      try {
        // Tambahkan kata kunci "await" di depan setiap pemanggilan fungsi yang menggunakan Promise
        const response = await fetch('https://gallery-app-server.vercel.app/photos', {
          method : "POST",
          headers: { 'Content-Type': 'application/json' },
          body : JSON.stringify({
            imageUrl: imageUrl,
            captions: captions,
            createdAt: new Date(),
            updatedAt: new Date(),
            secret: secret,
          }),
        });
        const data = await response.json();
        setData(data);
        navigate("/photos");
      } catch (error) {
        // Tambahkan blok catch untuk menangkap error
        setError(error.message);
      }
    } else {
      navigate("/notFound");
    }
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
