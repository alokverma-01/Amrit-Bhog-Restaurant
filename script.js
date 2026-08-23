const menuItems=[
{name:"Samosa",cat:"fast",tag:"Fast Food",desc:"A crisp, classic favourite — one of the shop's praised snacks."},
{name:"Chole Bhature",cat:"north",tag:"North Indian",desc:"A hearty, popular North Indian combination."},
{name:"Special Dosa",cat:"south",tag:"South Indian",desc:"A listed customer favourite, especially the special dosa."},
{name:"Paneer Burger",cat:"fast",tag:"Fast Food",desc:"A satisfying paneer-filled burger for a quick bite."},
{name:"Manchurian",cat:"fast",tag:"Fast Food",desc:"One of the frequently recommended fast-food choices."},
{name:"Chowmein",cat:"fast",tag:"Fast Food",desc:"A popular quick meal option at the corner."},
{name:"French Fries",cat:"fast",tag:"Fast Food",desc:"Crispy fries, mentioned among recommended choices."},
{name:"Indian Sweets",cat:"sweets",tag:"Sweets",desc:"Traditional sweets and mithai from the sweets counter."},
{name:"Fresh Snacks",cat:"sweets",tag:"Sweets & Snacks",desc:"Daily snacks and sweet-shop favourites."}
];
const grid=document.getElementById("menuGrid");
function render(filter="all"){grid.innerHTML=menuItems.filter(x=>filter==="all"||x.cat===filter).map((x,i)=>`<article class="food-card"><span class="tag">${x.tag}</span><h3>${x.name}</h3><p>${x.desc}</p><button class="add" title="Add to order" onclick="addToCart('${x.name}')">+</button></article>`).join("")}
render();
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)}));
let cart=[];
function addToCart(name){let item=cart.find(x=>x.name===name);if(item)item.qty++;else cart.push({name,qty:1});updateCart();openOrder()}
function updateCart(){document.getElementById("cartList").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><span>${x.name}</span><strong>× ${x.qty}</strong></div>`).join(""):"<p style='font-size:12px;color:#7b705d'>No items selected yet. You can still send a general enquiry.</p>"}
function openOrder(){document.getElementById("orderModal").classList.add("open");document.getElementById("orderModal").setAttribute("aria-hidden","false");updateCart()}
function closeOrder(){document.getElementById("orderModal").classList.remove("open");document.getElementById("orderModal").setAttribute("aria-hidden","true")}
function sendOrder(){
 const name=document.getElementById("customerName").value.trim(),phone=document.getElementById("customerPhone").value.trim(),address=document.getElementById("customerAddress").value.trim(),notes=document.getElementById("orderNotes").value.trim();
 if(!name||!phone){alert("Please enter your name and phone number.");return}
 const items=cart.length?cart.map(x=>`${x.name} × ${x.qty}`).join(", "):"General enquiry / menu request";
 const msg=`Hello Amrit Bhog!%0A%0AI would like to place an order.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AItems: ${encodeURIComponent(items)}%0ADelivery address: ${encodeURIComponent(address||"Not provided")}%0ANotes: ${encodeURIComponent(notes||"None")}%0A%0APlease confirm availability, delivery area and final price.`;
 window.open(`https://wa.me/919410079470?text=${msg}`,"_blank");
}
document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("show"));
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav nav").classList.remove("show")));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
document.getElementById("orderModal").addEventListener("click",e=>{if(e.target.id==="orderModal")closeOrder()});
