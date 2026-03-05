import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './Spinner'

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Random = () => {

  const [gif, setGif] = useState("");
  const [tag, setTag] = useState("");
  const [loader, setLoader] = useState(false);

  async function random() {
    try {
      setLoader(true);

      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
      const { data } = await axios.get(url);

      const imageUrl = data.data.images.downsized_large.url;
      setGif(imageUrl);

      setLoader(false);

    } catch (error) {
      console.log("Error:", error);
      setLoader(false);
    }
  }

  useEffect(() => {
    random();
  }, []);

  function clickHandler() {
    random();
  }

  function changeHandler(event) {
    setTag(event.target.value);
  }

  return (
    <div className="flex justify-center items-center min-h-[400px] ">

      <div className="w-[700px] bg-white rounded-2xl shadow-2xl flex flex-col items-center gap-6 p-6 ">

        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
          Search GIF by Tag
        </h1>

        <div className="w-full h-[300px] flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">

          {
            loader
              ? <Spinner />
              : <img
                  src={gif}
                  alt="Tag Gif"
                  className="h-full object-contain"
                />
          }

        </div>

        <input
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-lg text-center focus:outline-none focus:border-blue-500 transition"
          placeholder="Enter GIF Tag (e.g. cat, meme, dance)"
          onChange={changeHandler}
          value={tag}
          onKeyDown={(event) => {
           if (event.key === "Enter") {
            clickHandler();
            }
          }}
        />

        <button
          onClick={clickHandler}
          className="w-full bg-blue-600 text-white text-lg py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Generate GIF
        </button>

      </div>

    </div>
  )
}

export default Random