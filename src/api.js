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
      'X-RapidAPI-Key': '43f92da55amsh54f6707ad26e8ebp12f263jsnc7a7fd7ccef1',
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
