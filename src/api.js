import axios from "axios";
export let getPlaceData=async(type,ne,sw)=>{
  try{
    const options = {
      params: {
      bl_latitude:sw.lat ,
      tr_latitude:ne.lat ,
      bl_longitude: sw.lng,
      tr_longitude: sw.lat,
   
    },
    headers: {
      'X-RapidAPI-Key': '79b3f9c9e1msh8e55ad2195d1085p1a8965jsndd67da59f540',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  
  };
let URL=`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`

let res=await axios.get(URL,options);
let info=await res.data;
let data=info.data
console.log("the data from travelvistor api is :",data);
return data;}
  catch(error){
console.log(error);
  }
}
