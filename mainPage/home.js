 export function navBarForSmallDevices(){
let menuBar=document.querySelector("#bar");
let smallDevicesLinks=document.querySelector(".smallDevicesLinks")
let hideNavBar=document.querySelector(".hideNavBar")
menuBar.addEventListener("click",function(){
    smallDevicesLinks.style.visibility="visible";
    
})
hideNavBar.addEventListener("click",function(){
    smallDevicesLinks.style.visibility="hidden";
})
}

navBarForSmallDevices();

