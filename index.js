
const divid = document.getElementById("flexx");
const favoriteItems = document.getElementById("favoriteItems");
let s=0;

const searchin = document.getElementById("searchin");

let favMeal = [];
loadLocalStorage();
function loadLocalStorage(){
    let retString = localStorage.getItem("favmeal");
    if(retString !=null){
        let retArray = JSON.parse(retString);
        favMeal = retArray;
        for(let x=0;x<retArray.length;x++){
            let loaddiv = document.createElement("div");
                loaddiv.className= "favDiv";
                loaddiv.id = `load${retArray[x]["idMeal"]}`;
                let loadMealId = document.createElement("p");
                let loadMealImg = document.createElement("img");
                loadMealImg.setAttribute("src",`${[x].strMealThumb}`);
                loadMealImg.setAttribute("alt", "Image not Found");
                loadMealId.textContent = `Meal Name ${retArray[x].strMeal}`;
                let loadrembtn = document.createElement("button");
                loadrembtn.innerText= "Remove from Favourites";
                loadrembtn.id = `${retArray[x]["idMeal"]}`;
                loaddiv.appendChild(loadMealId);
                loaddiv.appendChild(loadrembtn);
                favoriteItems.appendChild(loaddiv);
    
                loadrembtn.addEventListener("click",()=>{
                    const loadremdiv = document.getElementById(loadrembtn.id);
                    // for(let a=0;a<retArray.length;a++){
                    //     if(retArray[a]["idMeal"]==retArray[x]["idMeal"]){
                    //         retArray[a] = '';
                    //     }
                    // }
                    favoriteItems.removeChild(document.getElementById(`load${retArray[x]["idMeal"]}`));
                    for(let a=0;a<retArray.length;a++){
                        if(retArray[a]["idMeal"]==retArray[x]["idMeal"]){
                            retArray.splice(a,1);
                            break;
                        }

                    }
                    let string1  = JSON.stringify(retArray);
                    localStorage.setItem("favmeal",string1);
                    console.log("Remove button clicked for first time");
    
    
                },false);
    }
   
    }
    
}

searchin.addEventListener("keyup", (e)=>{
    if (e.target.value.length > 0) {
        fetchData(e.target.value);
      }
});

async function fetchData(mealid){
    divid.textContent= "";
   
    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealid}`);
        if(res.ok==false){
            throw new Error("Request Failed");
        }
        
        const data = await res.json();
        const arr = data.meals;

        for(let i =0;i<arr.length;i++){
            
            //Add items to the search box-----------------------------
            //---------------------------------------------------------
            let newdiv = document.createElement("div");
           
            let favbtn = document.createElement("button");
       
            favbtn.innerText= "Add to Favourites";
            favbtn.id = `${i}`;
            
            newdiv.className= "newdiv";
            newdiv.id = `newdiv${i}`;
            let link = document.createElement("a");
            link.href= "#container-div";
            link.onclick = detailedDiv;
            let mealid = document.createElement("p");

            //Add image to another div
            let addimage = document.createElement("img");
            addimage.setAttribute("src",`${arr[i].strMealThumb}`);
            addimage.setAttribute("alt", "Image not Found");
            const imgdiv = document.createElement("div");
            imgdiv.className = "cover";
            imgdiv.appendChild(addimage);

            divid.className = "imageClass";
            mealid.textContent = `${arr[i].strMeal}`;

            newdiv.appendChild(imgdiv);
            link.appendChild(mealid);
            newdiv.appendChild(link);
            newdiv.appendChild(favbtn);
            divid.appendChild(newdiv);
            

            //add code for the detailed page
            function detailedDiv(){
            
            const contentbox = document.getElementById("content-box");
                
            // contentbox.innerHTML = "";
            var elements = contentbox.getElementsByClassName("deleteme");

                while (elements[0]) {
                    elements[0].parentNode.removeChild(elements[0]);
                }


                let popdiv = document.createElement("div");
                popdiv.id = `popdiv${i}`;
                popdiv.className = "deleteme";
                let popimg = document.createElement("img");
                let popname = document.createElement("h3");
                popname.innerText = `${arr[i].strMeal}`;
                let desc = document.createElement("p");
                popimg.src = `${arr[i].strMealThumb}`;
                desc.innerText = `${arr[i].strInstructions}`;
                popdiv.appendChild(popname);
                popdiv.appendChild(popimg);
                popdiv.appendChild(desc);
                contentbox.appendChild(popdiv);
            }
            //-------------------------------------------------------------

            favbtn.addEventListener("click",()=>{
                const index = favbtn.id;
                //push item to favourite list
                favMeal.push(arr[index]);

                //Add fav meal to local storage
                let string  = JSON.stringify(favMeal);
                localStorage.setItem("favmeal",string);


                let favDiv = document.createElement("div");
                favDiv.className= "favDiv";
                favDiv.id = `fav${index}`;
                let favMealId = document.createElement("p");
                let favMealImg = document.createElement("img");
                favMealImg.setAttribute("src",`${arr[index].strMealThumb}`);
                favMealImg.setAttribute("alt", "Image not Found");
                favMealId.textContent = `Meal Name ${arr[index].strMeal}`;
                let rembtn = document.createElement("button");
                rembtn.innerText= "Remove from Favourites";
                rembtn.id = `${index}`;
                favDiv.appendChild(favMealId);
                favDiv.appendChild(rembtn);
                // favDiv.appendChild(favMealImg);
                favoriteItems.appendChild(favDiv);

                rembtn.addEventListener("click",()=>{
                   const remdiv = document.getElementById(rembtn.id);
                    favoriteItems.removeChild(document.getElementById(`fav${index}`));

                    let retString1 = localStorage.getItem("favmeal");
                    let retArray1 = JSON.parse(retString1);
                    //Remove from local storage
                    let va = arr[index]["idMeal"];
                    for(let b=0;b<retArray1.length;b++){
                        
                        if(retArray1[b]["idMeal"]==va){
                            retArray1.splice(b,1);
                            break;
                        }

                    }
                    let string1  = JSON.stringify(retArray1);
                    localStorage.setItem("favmeal",string1);

                    //searchmeal id in favMeal array and remove it
                    let s=0;
                    for( s;s<favMeal.length;s++){
                        if(favMeal[s]["idMeal"]==va){
                            break;
                        }
                    }
                    favMeal.splice(s,1);


                    console.log("Remove button clicked");


                },false);
                console.log(`button ${index} clicked`);
            },false);
        }
            
}catch(err){
        console.log(err);
    }
}


        


