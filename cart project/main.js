// template to print product card
// cart value calculation
// increment  on "+" and decrement on "-"
//local storage vale saved in our web page


// to show data which are in basket
let basket=JSON.parse(localStorage.getItem("data")) || []

// to grenrate product card
let generateshop=()=>
{
    return (Shop.innerHTML= shopitemdata.map((x)=>
    { 
        let {id,name,price,img}=x;
        //find from local storage
        let search=basket.find((x) => x.id === id) || []
        return `
            <div id=product-id-${id} class="card">
            <img src=${img} alt="">
            <div class="details"> 
                <h3>${name}</h3>
                <div class="price-Quantity">
                <span>MRP: &#8377; ${price}</span>
                
                <div class="button">
                <span onclick="increment(${id})" >+</span>
                <div id=${id} class="quantity-updt">
                ${search.item === undefined?0:search.item}
                </div>
                <span onclick="decrement(${id})" > -</span>
                </div>
                </div>
                </div>
            </div>
            </div>`;
     }).join(""));
   
};
 generateshop();

let increment = (id)=>{
    let selecteditem = id;
    // search for thing already seleded and increase its count
    let search=basket.find((x)=>x.id === selecteditem.id)
    if(search === undefined){  
         basket.push({
        id: selecteditem.id,
        item:1,
    });} 
    else{
           search.item+=1;
        }
  // console.log(basket); 
   update(selecteditem.id);
     //setting inside the item in local storage
     localStorage.setItem("data",JSON.stringify(basket));
};

let decrement=(id)=>{
    let selecteditem= id;
    // search for thing already seleded and increase its count
    let search=basket.find((x) => x.id === selecteditem.id);
    // if we find no data selected it will return empty
     if(search === undefined) return; 
    else if(search.item=== 0){  
       return;  
    }
    else{
           search.item -=1;
        }
    //console.log(basket); 
     update(selecteditem.id);
    //filter out  data on local storage
    basket = basket.filter((x)=>x.item !== 0);
   //through this we want our basket to save all of the data on local storage
   localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id)=>{
    let search= basket.find((x)=>x.id === id)
//console.log(search.item);
document.getElementById(id).innerHTML=search.item;
calculation()
};

let calculation=()=>{
    let carticon= document.getElementById("cart-amount")
    // to select only item 
    carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);

}
calculation();