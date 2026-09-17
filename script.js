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


// The Original — 8-frame interactive product spin
(() => {
  const viewer = document.getElementById('originalSpinViewer');
  const image = document.getElementById('originalSpinImage');
  const progress = document.getElementById('originalSpinProgress');
  if (!viewer || !image) return;

  const frames = Array.from({ length: 8 }, (_, i) =>
    `assets/spin/the-original/frame-${String(i + 1).padStart(2, '0')}.webp`
  );

  // Preload the full spin so dragging feels immediate after the page loads.
  frames.forEach(src => { const preload = new Image(); preload.src = src; });

  let frame = 0;
  let dragging = false;
  let lastX = 0;
  let carry = 0;
  const pixelsPerFrame = 28;

  const render = () => {
    image.src = frames[frame];
    image.alt = `The Original Homegrown hat — view ${frame + 1} of ${frames.length}`;
    if (progress) progress.style.transform = `scaleX(${frame + 1})`;
  };

  const stepBy = delta => {
    frame = (frame + delta + frames.length) % frames.length;
    viewer.classList.add('has-spun');
    render();
  };

  viewer.addEventListener('pointerdown', e => {
    dragging = true;
    lastX = e.clientX;
    carry = 0;
    viewer.setPointerCapture?.(e.pointerId);
  });

  viewer.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    carry += dx;

    while (carry >= pixelsPerFrame) { stepBy(-1); carry -= pixelsPerFrame; }
    while (carry <= -pixelsPerFrame) { stepBy(1); carry += pixelsPerFrame; }
  });

  const stop = () => { dragging = false; carry = 0; };
  viewer.addEventListener('pointerup', stop);
  viewer.addEventListener('pointercancel', stop);
  viewer.addEventListener('lostpointercapture', stop);

  // Keyboard accessibility: focus the viewer and use left/right arrows.
  viewer.tabIndex = 0;
  viewer.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); stepBy(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepBy(-1); }
  });

  // Trackpad / mouse wheel while hovering. Keep vertical page scrolling untouched.
  viewer.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
      e.preventDefault();
      stepBy(e.deltaX > 0 ? 1 : -1);
    }
  }, { passive: false });

  render();
})();
