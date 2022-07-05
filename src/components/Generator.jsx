import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from './Context/Mycontext';
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'

function Generator() {
    const [imageData, setImageData] = useState([])
    const { addedLayers } = useContext(UserContext)
    

    //console.log(addedLayers)
    // const getUrls = async (addedLayer) => {
    //         //const urlArr = []
    //         const {layerName} = addedLayer;
    //         const imageListRef = ref(storage, `project-name/layers/${layerName}`);
      
    //         const res = await listAll(imageListRef)

            
    //         const request = res.items.map(item => getDownloadURL(item))
    //         console.log(request)
    //         const urls = await Promise.all(request)
            
    //         console.log(urls)
    //         //urlArr.push(urls)
    //          //setImageData(name => ([...name, {layerName, urls}]))
    //         //console.log(`${layerName}: ${urls}`)
            
    //       // console.log("middle: ",imageData)
    // }
    

   // useEffect(() => {
     // addedLayers.forEach(addedLayer => getUrls(addedLayer))
   // }, [addedLayers])
    
    console.log("outside: ",addedLayers)
    //console.log("imageDta: ",imageData)
      
    
  return (
    <>
        <div>Generator</div>
        <h2> Nothing added</h2>
        
        
    </>
    
  )
}

export default Generator

/**
 * 
 *  const getUrls = () => {
        addedLayers.forEach(addedLayer => {
            const urlArr = []
            const {layerName} = addedLayer;
            const imageListRef = ref(storage, `project-name/layers/${layerName}`);
      
            listAll(imageListRef)
            .then(response => {
              response.items.map(item => {
                getDownloadURL(item)
                .then(url => {
                  //console.log(`${layerName} : ${url}`)
                  urlArr.push(url)
                  //return;
                })
                
              })
            })
            .then(() =>{
              setImageData(name => ([...name, {layerName, urlArr}]))
            })
            .then(() => console.log("inside: ",imageData))
          })
          console.log("middle: ",imageData)
    }
 */