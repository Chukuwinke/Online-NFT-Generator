import React, { useContext } from 'react'
import { UserContext } from './Context/Mycontext';


function Generator() {
    const { ref, addedLayers, layersArr, listAll, storage, getDownloadURL } = useContext(UserContext)
    

    const getUrls = () => {
      layersArr.forEach( async item => {
        const urlArrs =[]
        const { layerName } = item;
        
        const imageListRef = ref(storage, `project-name/layers/${layerName}`);
        console.log(imageListRef)
  
        // problem
        const res = await listAll(imageListRef);
  
        
        console.log("list all: ", res);
  
        // problem
        
        res.items.forEach((item) => {urlArrs.push(getDownloadURL(item))});

        let temp = await Promise.all(urlArrs);

        console.log(temp)
        //await Promise.all(request)
        //console.log(request)
        //await setAddedLayers((prev) => [...prev, { layerName, urls }]);
        // problem
      })
      
    };
  
      
    
  return (
    <>
        <div>Generator</div>
        <h2> Nothing added</h2>
        <button onClick={() => getUrls() }> getUrls</button>
    </>
    
  )
}

export default Generator;