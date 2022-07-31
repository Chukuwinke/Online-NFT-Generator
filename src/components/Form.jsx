import React, { useState, useContext} from "react";

import { UserContext } from "./Context/Mycontext";
function Form() {
  const { ref, uploadBytes, storage, layersArr, setLayersArr } = useContext(UserContext);

  const [imageUpload, setImageupload] = useState([]);
  const [layerName, setLayername] = useState(null);

  const addLayer = () => {
    const rawImageData = [];
    if (!imageUpload.length || layerName == null) return;
    console.log("Before: ", imageUpload[0]);
    imageUpload.forEach((image) => {
      const imageRef = ref(
        storage,
        `project-name/layers/${layerName}/${image.name}`
      );

      rawImageData.push({ imageRef, image });
    });

    setLayersArr((prev) => [...prev, { layerName, rawImageData }]);
  };

  const uploadAll = async () => {
    const uploadData = layersArr.map((addedLayer) => {
      const { rawImageData } = addedLayer;

      rawImageData.forEach((rawData) => {
        const { imageRef, image } = rawData;
        uploadBytes(imageRef, image);
      });
    });
    await Promise.all(uploadData);
    
  };
  
  const insertImage = (e) => {
    if (e.target.className == "layer-folder") {
      setLayername(e.target.value);
    } else {
      setImageupload([...e.target.files]);
    }
  };

  return (
    <>
      <div>
        <input className="layer-folder" type="text" onChange={insertImage} />
        <input
          className="layer-name"
          type="file"
          onChange={insertImage}
          multiple
        />
        <button onClick={addLayer}> ADD </button>
        <button onClick={uploadAll}> show all </button>
      </div>
    </>
  );
}

export default Form;
