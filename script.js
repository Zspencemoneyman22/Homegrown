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

const spinFrames = [
  { src: 'assets/spin/frame-01-front.png', label: 'Front view' },
  { src: 'assets/spin/frame-02-front-right.png', label: 'Front-right view' },
  { src: 'assets/spin/frame-03-right.png', label: 'Right-side view' },
  { src: 'assets/spin/frame-04-back-right.png', label: 'Back-right view' },
  { src: 'assets/spin/frame-05-back.png', label: 'Back view' },
  { src: 'assets/spin/frame-06-back-left.png', label: 'Back-left view' },
  { src: 'assets/spin/frame-07-front-left.png', label: 'Front-left view' }
];

const spinImage = document.getElementById('spinImage');
const spinViewer = document.getElementById('spinViewer');
const spinAngle = document.getElementById('spinAngle');
const spinCount = document.getElementById('spinCount');
const spinPrev = document.getElementById('spinPrev');
const spinNext = document.getElementById('spinNext');
const spinThumbs = Array.from(document.querySelectorAll('.spin-thumb'));

if (spinImage && spinViewer) {
  spinFrames.forEach(frame => {
    const img = new Image();
    img.src = frame.src;
  });

  let currentFrame = 0;
  let dragStartX = 0;
  let dragging = false;

  const updateSpin = (index) => {
    currentFrame = (index + spinFrames.length) % spinFrames.length;
    spinImage.src = spinFrames[currentFrame].src;
    spinAngle.textContent = spinFrames[currentFrame].label;
    spinCount.textContent = `${currentFrame + 1} / ${spinFrames.length}`;
    spinThumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle('active', thumbIndex === currentFrame);
    });
  };

  const stepSpin = (direction) => {
    updateSpin(currentFrame + direction);
  };

  spinPrev.addEventListener('click', () => stepSpin(-1));
  spinNext.addEventListener('click', () => stepSpin(1));

  spinThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => updateSpin(Number(thumb.dataset.index)));
  });

  const dragThreshold = 24;

  spinViewer.addEventListener('mousedown', (event) => {
    dragging = true;
    dragStartX = event.clientX;
    spinViewer.classList.add('dragging');
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    spinViewer.classList.remove('dragging');
  });

  window.addEventListener('mousemove', (event) => {
    if (!dragging) return;
    const deltaX = event.clientX - dragStartX;
    if (Math.abs(deltaX) >= dragThreshold) {
      stepSpin(deltaX < 0 ? 1 : -1);
      dragStartX = event.clientX;
    }
  });

  spinViewer.addEventListener('touchstart', (event) => {
    dragStartX = event.touches[0].clientX;
  }, { passive: true });

  spinViewer.addEventListener('touchmove', (event) => {
    const deltaX = event.touches[0].clientX - dragStartX;
    if (Math.abs(deltaX) >= dragThreshold) {
      stepSpin(deltaX < 0 ? 1 : -1);
      dragStartX = event.touches[0].clientX;
    }
  }, { passive: true });

  spinViewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') stepSpin(-1);
    if (event.key === 'ArrowRight') stepSpin(1);
  });

  updateSpin(0);
}
