import React, {useState, useContext} from 'react'

import { UserContext } from './Context/Mycontext';
function Form() {
  const { addedLayers, setAddedLayers, ref, uploadBytes, storage, listAll, getDownloadURL } = useContext(UserContext)
  const [imageUpload, setImageupload] = useState([]);
  const [layerName, setLayername] = useState(null);
  const [layersArr, setLayersArr] = useState([])

  const addLayer = () =>{

    const rawImageData = []
    if (!imageUpload.length||layerName == null) return;
    console.log("Before: ",imageUpload[0])
    imageUpload.forEach(image => {
    
      const imageRef = ref(storage, `project-name/layers/${layerName}/${image.name}`);

      rawImageData.push({imageRef, image});
    });

    setLayersArr((prev) => [...prev, {layerName, rawImageData}])

  }

  
  const uploadAll = async () => {

    const uploadData = layersArr.map( addedLayer => {
      const {rawImageData} = addedLayer
      
      rawImageData.forEach(rawData => {
        const {imageRef, image} = rawData
        uploadBytes(imageRef, image)
      })
      
    })
    await Promise.all(uploadData)

    layersArr.forEach((item) => getUrls(item))
    //await Promise.all(uploadData)

  }
  //  setAddedLayers((prev) => [...prev, item])
  const getUrls = async (addedLayer) => {

    
      const {layerName} = addedLayer;
      const imageListRef = ref(storage, `project-name/layers/${layerName}`);

      const res = await listAll(imageListRef)

    
      const request = res.items.map(item => getDownloadURL(item))
      console.log(request)
      const urls = await Promise.all(request)
    
      setAddedLayers((prev) => [...prev, {layerName, urls}])
    
}


  /**
   * 
   * const uploadData = layersArr.map( addedLayer => {
      const {rawImageData} = addedLayer
      
      rawImageData.forEach(rawData => {
        const {imageRef, image} = rawData
        uploadBytes(imageRef, image)
      })
      
    })
    await Promise.all(uploadData)

    layersArr.forEach((item) => {
           setAddedLayers((prev) => [...prev, item])
    })
   */

 //console.log(addedLayers)

  
  const insertImage = (e) => {
    if(e.target.className == "layer-folder"){
      setLayername(e.target.value)
    }
    else{
      setImageupload([...e.target.files])
    }
  }
  
  return (
    <>
        <div>
            <input className='layer-folder' type="text" onChange={insertImage} />
            <input className='layer-name'type="file" onChange={insertImage} multiple />
            <button onClick={addLayer}> ADD </button>
            <button onClick={uploadAll}> show all </button>
        </div>
    </>
  )
}

export default Form