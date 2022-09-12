let lable = document.getElementById('lable')
let shoppingCart = document.getElementById('shopping-cart')

let basket=JSON.parse(localStorage.getItem("data")) || []
//console.log(basket);
let calculation=()=>{
    let carticon= document.getElementById("cart-amount")
    // to select only item 
    carticon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);

}
calculation();
let generateCartItems = () => {
 if(basket.length !== 0){
    //alert('bastet is not empty');
    return (shoppingCart.innerHTML=basket.map((x) => {
        console.log(x);
        let {id,item} = x;
        console.log(item)
        let search =shopitemdata.find((y)=>y.id === id) || [];
        let {img,name,price}= search
        return` 
        <div class ="cart-item">
        <img width="100" src=${img} alt=""/>
        <div class="details">

           <div class="title-price-x">
            <h4 class"title-price">
             <p>${name}</p>
             <p class = "cart-item-price" >${price}</p>
            </h4> 
            <p class="bi-x-lg" onclick="removeItem(${id})"> &#9932;</p>
        </div>

        <div class="button">
            <span onclick="increment(${id})" >+</span>
            <div id=${id} class="quantity-updt">${item}</div>
            <span onclick="decrement(${id})" > -</span>
            </div>
 
        <h3> MRP: &#8377; ${item * search.price}</h3>
        </div>
        </div>
        
        
        
        `
    }).join(" "));
 }
 
 else{
   // alert(" bastet is empty")
   shoppingCart.innerHTML=``
   lable.innerHTML=`
   <h2> Your Cart is Empty!!</h2>
    <a href="index.html">
    <button class="bckbtn"> Back to Home</button>
    </a>
   `;
 }
};
generateCartItems();
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
 //
   generateCartItems()  
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
    // to decrement item in card
    generateCartItems();
   //through this we want our basket to save all of the data on local storage
   localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id)=>{
let search= basket.find((x)=>x.id === id)
//console.log(search.item);
document.getElementById(id).innerHTML=search.item;
calculation();
totalAmount();
removeItem()
};

let removeItem=(id)=>{
 let selecteditem = id;
//  console.log(selecteditem.id);
// remove the item from our cart
 basket=basket.filter((x) => x.id !== selecteditem.id)
 generateCartItems()
 totalAmount()
 calculation();
 localStorage.setItem("data",JSON.stringify(basket));
 
}
let clearAll=(id)=>{
    basket=[]
    generateCartItems()
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
}
let totalAmount=()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
          // destructure the x 
           let{item,id} = x
           let search =shopitemdata.find((y)=>y.id === id) || [];
           return item * search.price;  
        }).reduce((x,y)=>x+y,0)
    // console.log(amount)
    generateCartItems()
    lable.innerHTML=`
    <h2> TOTAL BILL : MRP: &#8377; ${amount}</h2>
    <button class="checkout">CHECKOUT</button>
    <button class="removeAll" onclick="clearAll()"> CLEAR CART</button>
    `
     console.log(amount)
    }else return;
    generateCartItems()
}
totalAmount();