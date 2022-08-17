import React, { useState, useContext, useEffect} from "react";

import { UserContext } from "./Context/Mycontext";
function Form() {
  const { ref, uploadBytes, storage, layersArr, setLayersArr } = useContext(UserContext);

  const [imageUpload, setImageupload] = useState([]);
  const [layerName, setLayername] = useState(null);
  const [imagePackage, setImagePackage] = useState([]);


//
  const addLayer = () => {
    // const rawImageData = [];
    const selectedImageData = []
    if (!imageUpload.length || layerName == null) return;
    //console.log("Before: ", imageUpload[0]);
    setImagePackage(prev => [...prev, {layerName, imageUpload}])

  };


// CREATES PACKAGE FROM SELECTED IMAGES AND FOLDER NAME TO BE STORED IN FIREBASE STORAGE
  const createPackage = async () => {
    const layersPackage = [];
    for(let i =0; i <imagePackage.length; i++){
      //console.log(imagePackage[i])
      const {layerName, imageUpload} = imagePackage[i];

      console.log(layerName, imageUpload)
      const rawImageData = [];

      for(let j = 0; j < imageUpload.length; j++){
        const image = imageUpload[j]
        const imageRef = ref(
          storage,
          `project-name/layers/${layerName}/${image.name}`
        );
 
        rawImageData.push({ imageRef, image });
      }
      layersPackage.push({layerName, rawImageData})
    }
   
    setLayersArr([...layersPackage])
  };


  
  const insertImage = (e) => {
    if (e.target.className == "layer-folder") {
      setLayername(e.target.value);
    } else {
      setImageupload([...e.target.files]);
    }
  };

  //console.log(layersArr)

  // USEEFFECTS ACTIVATES WHEN LAYERS PACKAGE HAS BEEN CREATED AND THEN UPLOADS THE DATA TO STORAGE
  useEffect(() =>{
    async function uploadAll(){
      const uploadData = layersArr.map((layer) => {
        const { rawImageData } = layer;

        rawImageData.forEach((rawData) => {
          const { imageRef, image } = rawData;
          uploadBytes(imageRef, image);
        });
      });
      await Promise.all(uploadData);
    }

    if(layersArr.length !== 0){
      //console.log(layersArr)
      uploadAll();
    }
  })
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
        <button onClick={createPackage}> show all </button>
      </div>
    </>
  );
}

export default Form;
