import './App.css';
import Main from './components/Main';



function App() {

  return (
    <div className="App">
     <Main />
    </div>
  );
}

export default App;


/**
 * import { useState } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
 * 
 * 
 * 
  const [imageUpload, setImageupload] = useState([]);
  const [layerName, setLayername] = useState(null);
  const [folderNames, setFolderNames] = useState([])
  //const [imagePathRef, setImagePathRef] = useState([])
  const [imageData, setImageData] = useState([])

  //console.log(folderNames)
  
  const uploadImage = () =>{
    //console.log(imageUpload)
    
    if (!imageUpload.length||layerName == null) return;
    imageUpload.forEach(image => {
      const imageRef = ref(storage, `project-name/layers/${layerName}/${image.name}`);
      //console.log(imageRef);
      
      uploadBytes(imageRef, image).then(() => {
      console.log("image uploaded")
     })
    });

    setFolderNames((prev) => [...prev, layerName])
    //console.log("Array: ", imageRefArr)
    // const imageRef = ref(storage, `project-name/layers/${layerName}/${imageUpload.name}`);
    // setFolderNames(folderNames => ({...folderNames, ...{layerName:layerName, }}))
    // //setImagePathRef((prev) => [...prev, imageRef])
    // //console.log("this",imageRef["_location"])
    // uploadBytes(imageRef, imageUpload).then(() => {
    //   alert("image uploaded")
    // })
    
  }
  
  console.log(folderNames)
  

  const showAll = () => {
    folderNames.forEach( folderName => {
      const urlArr = []
      
      const imageListRef = ref(storage, `project-name/layers/${folderName}`);
      listAll(imageListRef).then((response) => {
        //console.log(response)

        response.items.forEach(item => {
          getDownloadURL(item).then(url => {
           //console.log(`${folderName} URL: ${url}`)
           //setImageData(name => ([...name, {layerTittle:folderName, urls:[]}]))
           urlArr.push(url)
            
          })
        })
      })
      setImageData(name => ([...name, {layerTittle:folderName, urls:urlArr}]))
    })
  }
  console.log(imageData)
  
  const insertImage = (e) => {
    //setImageupload(e.target.files[0]);
    if(e.target.className == "layer-folder"){
      setLayername(e.target.value)
    }
    else{
      setImageupload([...e.target.files])
    }
  }
  //console.log(layerName)
  //console.log(imageUpload)
 */