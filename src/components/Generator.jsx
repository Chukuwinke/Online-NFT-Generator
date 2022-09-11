
import React, { useContext, useRef} from 'react'
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
    const { ref, addedLayers, layersArr, listAll, storage, getDownloadURL } = useContext(UserContext);
    
    // PROBLEM STARTS.... PROBLEM WITH THE CANVAS ELEMENT 
    const canvas = useRef(null);
    const ctx = canvas.current.getContext("2d")
    //PROBLEM END

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

    const loadLayerImg = (_layer) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        console.log(image)
        image.onload = () => resolve({ layer: _layer, loadedImage: image });
        image.onerror = reject;
        image.src = `${_layer.selectedElement}`;

      })
    }
    
    const startCreating = async (_layersOrder, _layerUrlObjects) =>{
      let editionCount = 1;
      let failedCount = 0;
      
      // INCOMPLETE LOGIC
      const layers = layersSetup(_layersOrder, _layerUrlObjects);

      // while (editionCount <= editionSize){
         let newDna = createDna(layers)
        
        if (isDnaUnique(dnaList, newDna)) {
          let results = constructLayerToDna(newDna, layers);
          let loadedElements = [];
          //console.log(results)

          for(let result of results){
            const data = await loadLayerImg(result);
            //console.log(data)
            loadedElements.push(data);
          }
          //console.log(loadedElements);
          await Promise.all(loadedElements)
          .then((elementArray) => {
            ctx.clearRect(0, 0, format.width, format.height);
            if(background.generate){

            }
          })
         }
      // }
      
      // INCOMPLETE LOGIC
    }
  return (
    <>
        <div>Generator</div>
        <h2> Nothing added</h2>
        <button onClick={() => getUrls() }> getUrls</button>
        <canvas ref={canvas}/>
    </>
    
  )
}

export default Generator;