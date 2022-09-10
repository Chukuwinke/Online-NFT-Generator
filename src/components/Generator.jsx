// import React, { useContext } from 'react'
// import { UserContext } from './Context/Mycontext';
// import {layersOrder,
//   format,
//   editionSize,
//   baseUri,
//   description,
//   background,
//   uniqueDnaTorrance,
// } from './experimental/config'


// function Generator() {
//     const { ref, addedLayers, layersArr, listAll, storage, getDownloadURL } = useContext(UserContext)
    

//     const getUrls = async () => {
//       const layerUrlObjects =[];
//       for(let layer of layersArr ){
//         const urlArrs =[];
//         const { layerName } = layer;
        
//         const imageListRef = ref(storage, `project-name/layers/${layerName}`);
//         console.log(imageListRef)
  
//         const res = await listAll(imageListRef);
  
        
//         console.log("list all: ", res);
        
//         for(let item of res.items){
//           const urls = await getDownloadURL(item)
//          urlArrs.push(urls);
//          //console.log(ans)
//         }
//         layerUrlObjects.push({layerName, urlArrs})
        
//       }
//       console.log(layerUrlObjects);

//       // INCOMPLETE LOGIC
//       const layers = layersSetup(layersOrder, layerUrlObjects);
//       let newDna = createDna(layers)
//       console.log(newDna)
//       // INCOMPLETE LOGIC
//     };

//     const layersSetup = (layersOrder, layerUrlObjects) => {
//       const layers = layersOrder.map((layerObj, index) => {
//         const {urlArrs} = layerUrlObjects.find(item => item.layerName == layerObj.name);
//         return{
//               id: index,
//               name: layerObj.name,
//               elements: [...urlArrs],
            
//           } 
//        });
      
//       return layers;
//     };

//     // WIP BEGIN
//     const isDnaUnique = (_DnaList = [], _dna = []) => {
//       let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
//       return foundDna == undefined ? true : false;
//     };
//     // WIP END
      
//     const createDna = (_layers) => {
//       let randNum = [];
//       _layers.forEach((layer) => {
//         let num = Math.floor(Math.random() * layer.elements.length);
//         randNum.push(num);
//       });
//       return randNum;
//     };


    
//   return (
//     <>
//         <div>Generator</div>
//         <h2> Nothing added</h2>
//         <button onClick={() => getUrls() }> getUrls</button>
//     </>
    
//   )
// }

// export default Generator;





import React, { useContext } from 'react'
import { UserContext } from './Context/Mycontext';
import {layersOrder,
  format,
  editionSize,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
} from './experimental/config'
let metadataList = [];
let attributesList = [];
let dnaList = [];

function Generator() {
    const { ref, addedLayers, layersArr, listAll, storage, getDownloadURL } = useContext(UserContext)
    

    const getUrls = async () => {
      const layerUrlObjects =[];
      for(let layer of layersArr ){
        const urlArrs =[];
        const { layerName } = layer;
        
        const imageListRef = ref(storage, `project-name/layers/${layerName}`);
        console.log(imageListRef)
  
        const res = await listAll(imageListRef);
  
        
        console.log("list all: ", res);
        
        for(let item of res.items){
          const urls = await getDownloadURL(item)
         urlArrs.push(urls);
         //console.log(ans)
        }
        layerUrlObjects.push({layerName, urlArrs})
        
      }
      console.log(layerUrlObjects);
      startCreating(layersOrder, layerUrlObjects);
      //const layers = layersSetup(layersOrder, layerUrlObjects);

      //console.log(layers)
      
    };

    const layersSetup = (layersOrder, layerUrlObjects) => {
      const layers = layersOrder.map( (layerObj, index) => {
        const {urlArrs} = layerUrlObjects.find(item => item.layerName == layerObj.name);
        return{
              id: index,
              name: layerObj.name,
              elements: [...urlArrs],
            
          } 
       });
      
      return layers;
    };

    
      
    const createDna = (_layers) => {
      let randNum = [];
      _layers.forEach((layer) => {
        let num = Math.floor(Math.random() * layer.elements.length);
        randNum.push(num);
      });
      return randNum;
    };

    
    const isDnaUnique = (_DnaList = [], _dna = []) => {
      let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
      return foundDna == undefined ? true : false;
    };
    

    const constructLayerToDna = (_dna = [], _layers = []) => {
      let mappedDnaToLayers = _layers.map((layer, index) => {
        let selectedElement = layer.elements[_dna[index]];
        return {
          name: layer.name,
          selectedElement: selectedElement,
        };
      });
      return mappedDnaToLayers;
    };

    // WIP BEGIN
    // const loadLayerImg = async (_layer) => {
    //   console.log(_layer)
    //   return new Promise(async (resolve) => {
    //     const image = await loadImage(`${_layer.selectedElement.path}`);
        
    //     resolve({ layer: _layer, loadedImage: image });
    //   });
    // };
    const loadLayerImg = (_layer) => {
      let result;
      const image = new Image();

      console.log(image)
      image.onload = () => result = { layer: _layer, loadedImage: image };
      image.src = `${_layer.selectedElement}`;
      return result;
    }
    // WIP END
    
    const startCreating = async (_layersOrder, _layerUrlObjects) =>{
      let editionCount = 1;
      let failedCount = 0;
      
      // INCOMPLETE LOGIC
      const layers = layersSetup(_layersOrder, _layerUrlObjects);

      //console.log(layers)
      // PROBLEM START
      // while (editionCount <= editionSize){
         let newDna = createDna(layers)
        
        if (isDnaUnique(dnaList, newDna)) {
          let results = constructLayerToDna(newDna, layers);
          let loadedElements = [];
          console.log(results)
          for(let result of results){
            loadedElements.push(loadLayerImg(result));
          }
          console.log(loadedElements);
         }
      // }
      
      // INCOMPLETE LOGIC
      //PROBLEM END
    }
  return (
    <>
        <div>Generator</div>
        <h2> Nothing added</h2>
        <button onClick={() => getUrls() }> getUrls</button>
    </>
    
  )
}

export default Generator;




      
      // layersArr.forEach( async item => {
      //   const urlArrs =[]
      //   const { layerName } = item;
        
      //   const imageListRef = ref(storage, `project-name/layers/${layerName}`);
      //   console.log(imageListRef)
  
      //   // problem
      //   const res = await listAll(imageListRef);
  
        
      //   console.log("list all: ", res);
  
      //   // problem
        
      //   res.items.forEach((item) => {urlArrs.push(getDownloadURL(item))});

      //   let temp = await Promise.all(urlArrs);

      //   console.log(temp)
      //   //await Promise.all(request)
      //   //console.log(request)
      //   //await setAddedLayers((prev) => [...prev, { layerName, urls }]);
      //   // problem
      // })