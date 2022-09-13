/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date().toDateString();
let baseUrl= "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey="&appid=eacd2b7331d0bbbad46b5817913837db";
const serverHost = "http://localhost:5050";

// making an event when clicking on generate button 
document.getElementById("generate").addEventListener('click', mainFunction);
// mainFunction that excuted when an event happens and it get the weather api 
function mainFunction(e){
    let zipCode = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;
    // excurte getWeather function that get the weather 
    getWeather(baseUrl,zipCode,apiKey).then((data)=>{
        console.log(data.name);
        // post data to the server 
        postData2Server('/add',{cityName:data.name,date:d,temp:data.main.temp, content:feelings}).then(()=>{
            getData4mServer('/all').then((dataa)=>{
                // update ui of the website 
                updateUI(dataa);
    
            })
        });
       
        
    });
    
}
// getweather syntx 
let getWeather = async (baseurl, zip, apikey)=>{
    if(zip==""){
        // in case of empty zip code show an error 
        document.getElementById("zipError").innerHTML="zip code cannot be empty"
        document.getElementById("zipError").style.backgroundColor="red";
        setTimeout(()=>{
        document.getElementById("zipError").innerHTML=""
        document.getElementById("zipError").style.backgroundColor="transparent";

        },3000);
    }else{
        let weatherResponse = await fetch(baseurl+zip+apikey);
        try{
            if(weatherResponse.status==200){
                let weatherData = await weatherResponse.json();
                return weatherData ;
            }else{
                document.getElementById("zipError").innerHTML=weatherResponse.message;
                document.getElementById("zipError").style.backgroundColor="red";

                setTimeout(()=>{
                    document.getElementById("zipError").innerHTML=""
                document.getElementById("zipError").style.backgroundColor="transparent";
        
                },3000);
            }
        }
        catch(error){
            console.log(`error ${error}`)
        }
    }
  
}
// post data to the server 
let postData2Server= async (url='', data={})=>{
    let res= await fetch(serverHost+url,{
        method:'POST',
        credentials:"same-origin",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)


    })
    try{
        if(res.status==200){
            let dataResponse4mServer= res.json();
            return dataResponse4mServer;
        }else{
            console.log(res.message)
        }

    }catch(error){
        console.log(`error: ${error}`);
    }
}
// get data from the server after posting it 
let getData4mServer = async (url='')=>{
    let res= await fetch(serverHost+url);
    try{
        if(res.status==200){
            let data= await res.json();
            return data;
        }else{
            console.log(res.message);
        }
        
    }catch(error){
       console.log(`error is : ${error}`);
    }
}
// update ui of the website 
function updateUI(data){
    document.getElementById("cityName").innerHTML=`City Name:  ${data[0].cityName}`
    document.getElementById("date").innerHTML=`Data:   ${data[0].date}`;
    document.getElementById("temp").innerHTML=`Temperature:   ${Math.round(((data[0].temp)-273))} Deg C`;
    document.getElementById("content").innerHTML=`Feelings:   ${data[0].content}`;
}
