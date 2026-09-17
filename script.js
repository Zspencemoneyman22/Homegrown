const cart = [];
const cartButton = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const cartClose = document.getElementById('cartClose');
const scrim = document.getElementById('scrim');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

function openCart(){
  cartDrawer.classList.add('open');
  scrim.classList.add('show');
  cartDrawer.setAttribute('aria-hidden','false');
}
function closeCart(){
  cartDrawer.classList.remove('open');
  scrim.classList.remove('show');
  cartDrawer.setAttribute('aria-hidden','true');
}
function renderCart(){
  cartCount.textContent = cart.length;
  if(!cart.length){
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
    cartTotal.textContent = '$0';
    return;
  }
  cartItems.innerHTML = cart.map((item,i)=>`<div class="cart-line"><div><strong>${item.name}</strong><small>Drop 001</small></div><div>$${item.price} <button aria-label="Remove ${item.name}" onclick="removeItem(${i})" style="border:0;background:none;cursor:pointer;margin-left:8px">×</button></div></div>`).join('');
  cartTotal.textContent = '$' + cart.reduce((sum,item)=>sum+item.price,0);
}
window.removeItem = (i)=>{cart.splice(i,1);renderCart();};

document.querySelectorAll('.quick-add').forEach(btn=>{
  btn.addEventListener('click',()=>{
    cart.push({name:btn.dataset.product,price:Number(btn.dataset.price)});
    renderCart();
    openCart();
  });
});
cartButton.addEventListener('click',openCart);
cartClose.addEventListener('click',closeCart);
scrim.addEventListener('click',closeCart);

document.getElementById('checkoutButton').addEventListener('click',()=>{
  alert('This is a front-end demo. Connect Shopify, Stripe Checkout, or another commerce backend when you are ready to sell.');
});

document.getElementById('newsletterForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const email = document.getElementById('email');
  document.getElementById('formMessage').textContent = `You're on the list — ${email.value}`;
  email.value = '';
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('visible');});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
