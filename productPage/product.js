//navigation bar in product page
import { navBarForSmallDevices } from "../mainPage/home.js";
navBarForSmallDevices();

let url='https://course-api.com/javascript-store-products';
let productDisplay=document.querySelector(".productDisplay")
let productList=document.querySelector(".productList");
let singleProduct=document.querySelector(".singleProductInformation");

let data;

//fetch products
async function getData(){
    let extractData=await fetch(url)
     data=await extractData.json();
     displayProducts(data);
     filterCompanyByName();
     showSpecificCompanyProduct();
     priceList();
     clickCartIcon();

}
getData();




//display products

  function displayProducts(item){ 
    let arrayOfData=item.map(function(d){
        return`
        <div class="product" data-id=${d.id}>
        <img src=  "${d.fields.image[0].url}">
        <div class="productInfo">
            <div>
            <p class="productName">${d.fields.name}</p>
            <p class="productPrice">NRP ${d.fields.price}</p>
            </div>
            <div>
            <i class="fa-solid fa-cart-shopping shopCart"></i>
            </div>
        </div>
    </div>
        `
    })
   let dataList= arrayOfData.join("");
    productList.innerHTML=dataList;
}



//search products
let filteredData=[];
let search=document.querySelector("#searchProduct")

search.addEventListener("input",function(){
   
    
    if(search.value!=""){
       
    for(let i=0;i<data.length;i++){
        if((data[i].fields.name).includes(search.value)){
            filteredData.push(data[i])
            
        }
    }
    if(filteredData.length<1){
      productList.innerHTML=" sorry, no products found of your choice"
      
       
            
    
    }else{
    displayProducts(filteredData);
    clickCartIcon();
    filteredData=[];
    }
    
}else{
    
    displayProducts(data)
}
})


//display all the company name
let companyName=[];
let companies=document.querySelector(".companies");

function filterCompanyByName(){
for(let i=0;i<data.length;i++){
    if(!companyName.includes(data[i].fields.company)){
        companyName.push(data[i].fields.company)

    }
}

companies.innerHTML=(
companyName.map(function(c){
    return` <p class="companyName" data-company="${c}">${c}</p>`
})).join("")
companies.insertAdjacentHTML("afterbegin",`<p class="companyName" data-company="all">all</p>`)
}


//filter data according to the company
function showSpecificCompanyProduct(){
    let brandName=document.querySelectorAll(".companyName")
    brandName.forEach(function(brand){
        brand.addEventListener("click",function(b){

            let targetElement=b.currentTarget.dataset.company;
            for(let m=0;m<data.length;m++){
                if(data[m].fields.company==targetElement){
                    filteredData.push(data[m])
                }else if(targetElement=="all"){
                    filteredData.push(data[m])
                }
            }
            displayProducts(filteredData);
            clickCartIcon();
            filteredData=[];
        })
    })
   

}


//find the maximum and minimum price of products in a list and filter the product according to the price
let valueProgressBar=document.querySelector('#valueProgressBar')
let priceValue=document.querySelector("#value")



//filter product by price
function priceList(){
let priceList=[];
for(let p=0;p<data.length;p++){
    priceList.push(data[p].fields.price)
}
let minimumPrice=Math.min(...priceList);
let maximumPrice=Math.max(...priceList);
valueProgressBar.min=minimumPrice;
valueProgressBar.max=maximumPrice;
valueProgressBar.value=maximumPrice;
priceValue.innerHTML=` NRP ${maximumPrice}`
valueProgressBar.addEventListener("change",function(){
    priceValue.innerHTML=` NRP ${valueProgressBar.value}`;
    for(let m=0;m<data.length;m++){
        if(data[m].fields.price<=valueProgressBar.value){
            filteredData.push(data[m])
        }
    }
    displayProducts(filteredData)
    clickCartIcon();
    filteredData=[];
    
})

}


//show cart
let cart=document.querySelector(".cart")
let purchaseList=document.querySelector(".purchaseList")
let hidePurchasedList=document.querySelector(".hidePurchasedList")
let purchasedItem=document.querySelector(".purchasedItem")
cart.addEventListener("click",function(){
    purchaseList.classList.add("showPurchaseList")
    productDisplay.style.pointerEvents="none";
    
    
})
hidePurchasedList.addEventListener("click",function(){
    purchaseList.classList.remove("showPurchaseList")
    productDisplay.style.pointerEvents="auto";
})



//purchased item list

function clickCartIcon(){
let cartIcon=document.querySelectorAll(".shopCart")
cartIcon.forEach(function(c){
    c.addEventListener("click",function(trgt){
        productDisplay.style.pointerEvents="none";
        let targetId=trgt.currentTarget.parentElement.parentElement.parentElement.dataset.id;
        for(let q=0;q<data.length;q++){
            if((data[q].id)==targetId){
                filteredData.push(data[q])
            }
        }

        //display the information about the item when it is clicked
        singleProduct.innerHTML=`
        <img src=${filteredData[0].fields.image[0].thumbnails.large.url}>
        <div class="singleProductInfo">
            <div class="nameQuantity">
            <p id="nameOfPurchasedItem">${filteredData[0].fields.name}</p>
            <div class="qty">
                <p id="decrease">-</p>
                <p id="quantity">1</p>
                <p id="increase">+</p>
            </div>
            </div>
            <p id="companyOfPurchasedItem">BY ${filteredData[0].fields.company}</p>
            <p id="priceOfPurchasedItem">NRP ${filteredData[0].fields.price}</p>
            <p id="informationOfPurchasedItem">Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge</p>
            <button id="addToCart">ADD TO CART</button>

        </div>
        `
        singleProduct.style.visibility="visible";
        productQuantities();


        //add an item to the cart
        document.querySelector("#addToCart").addEventListener("click",function(){
            singleProduct.style.visibility="hidden";
        const productPurchased=document.createElement("div");
        productPurchased.classList.add("purchasedProduct")
        productPurchased.innerHTML=`
        <div class="productPicName">
        <img src=${filteredData[0].fields.image[0].thumbnails.small.url} width="75px" height="50px" id="smallImage">
        <div class="productInformation">
            <div class="namePrice">
            <p class="name">${filteredData[0].fields.name}</p>
            <p class="priceOfProduct">NRP  <span id="priceOfProduct">${filteredData[0].fields.price}</span></p>
            </div>
            <p class="remove">remove</p>

        </div>
    </div>
    <div class="aboutQuantity">
        <p class="quantityItems">${quantity.innerHTML}</p>
    </div>
        
        `
    purchasedItem.appendChild(productPurchased)
   
        purchaseList.classList.add("showPurchaseList")

       quantitiesPriceCalculations()
        productPrice();
        removeItem();
        itemsNumberInCart();
        filteredData=[];
        })

    })
})
}

let quantityArray=[];
function productQuantities(){
    let quantity=document.querySelector("#quantity")
    let increase=document.querySelector("#increase")
    let decrease=document.querySelector("#decrease")
    increase.addEventListener("click",function(){
        quantity.innerHTML=quantity.innerHTML*1+1
    })
    decrease.addEventListener("click",function(){
        if((quantity.innerHTML)*1>1){
            quantity.innerHTML=quantity.innerHTML*1-1

        }else{
            decrease.style.pointerEvent="none";
        }
        
    })


}
function quantitiesPriceCalculations(){
    quantityArray=[];
    document.querySelectorAll(".quantityItems").forEach(function(q){
        quantityArray.push(q.innerHTML*1);
       
        
    })
}
function productPrice(){
    let price=[];
    document.querySelectorAll("#priceOfProduct").forEach(function(p){
        price.push(p.innerHTML*1)
    })
    
    
    let totalPrice=price.reduce(function(accumulator,currentValue,index){
        return(accumulator+currentValue*quantityArray[index])
    },0)
    document.querySelector("#price").innerHTML=totalPrice;
  
}

function removeItem(){
    let remove=document.querySelectorAll(".remove")
    remove.forEach(function(r){
        r.addEventListener("click",function(evt){
            evt.currentTarget.parentElement.parentElement.parentElement.remove();
            quantitiesPriceCalculations()
            productPrice();
            itemsNumberInCart();

        })
    })
}


//number of item in cart
let cartNumber=document.querySelector("#cartNumber")
function itemsNumberInCart(){
    cartNumber.innerHTML=document.querySelectorAll(".purchasedProduct").length;
    
 
    
}
window.addEventListener("resize",function(){
    console.log(window.innerWidth);
})














