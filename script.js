// Dados dos produtos da vitrine (8 itens = 2 fileiras de 4)
const products = [
    { id: 1, name: "Planner Anual Focus 2027", category: "Planners", price: 89.90, img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Caderno Pontilhado Premium", category: "Cadernos", price: 45.00, img: "https://images.unsplash.com/photo-1531346878377-244cb1754d58?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Kit Canetas Gel Pastel", category: "Escrita", price: 34.50, img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Blocos Adesivos Org.", category: "Organização", price: 12.90, img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Estojo Minimalista Algodão", category: "Organização", price: 55.00, img: "https://images.unsplash.com/photo-1580569214296-5cf2bffc5ce3?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Marcadores Tons Terrosos", category: "Escrita", price: 28.90, img: "https://images.unsplash.com/photo-1527736947477-2790e28f3443?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Agenda Semanal Clean", category: "Planners", price: 59.90, img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Caderno Kraft A5", category: "Cadernos", price: 32.00, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" }
];

// Imagem reserva: usada automaticamente se a foto não carregar
function fallbackImg(el, name) {
    el.onerror = null;
    el.src = `https://placehold.co/600x400/E9E1FA/4B286D?text=${encodeURIComponent(name)}`;
}

// Estado da Aplicação
let cart = [];
let isCartOpen = false;
let currentCategory = 'Todos';

// Formata preço em R$
function formatPrice(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Filtro por categoria
function filterCategory(categoryName) {
    currentCategory = categoryName;

    const label = document.getElementById('current-category-label');
    if (label) {
        label.innerText = categoryName === 'Todos' ? 'Todos os Produtos' : categoryName;
    }

    renderProducts();
    scrollToProducts();
}

// Renderiza a vitrine (grid 4 colunas em telas grandes)
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.removeAttribute('style');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4';

    const filteredProducts = currentCategory === 'Todos'
        ? products
        : products.filter(p => p.category === currentCategory);

    if (filteredProducts.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center py-16 text-gray-400">Nenhum produto encontrado nesta categoria.</p>`;
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div onclick="openModal(${product.id})" class="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100 cursor-pointer">
            <div class="h-56 w-full overflow-hidden relative bg-[#E9E1FA]">
                <img src="${product.img}" alt="${product.name}" onerror="fallbackImg(this, '${product.name}')" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#4B286D] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">${product.category}</div>
            </div>
            <div class="p-5 flex flex-col flex-grow items-center text-center">
                <h3 class="font-semibold text-gray-800 mb-1 line-clamp-2">${product.name}</h3>
                <p class="text-[#4B286D] font-bold text-lg mb-4 mt-auto">${formatPrice(product.price)}</p>
                <button onclick="event.stopPropagation(); addToCart(${product.id})" class="w-full bg-[#E9E1FA] hover:bg-[#4B286D] text-[#4B286D] hover:text-white py-3 rounded-xl font-medium transition duration-200">Adicionar à sacola</button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// MODAL DE DETALHES
// ==========================================

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-modal-content');

    content.innerHTML = `
        <button onclick="closeModal()" class="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur text-gray-500 hover:text-[#4B286D] rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-sm">✖</button>

        <div class="w-full md:w-1/2 h-64 md:h-auto relative bg-[#E9E1FA]">
            <img src="${product.img}" alt="${product.name}" onerror="fallbackImg(this, '${product.name}')" class="w-full h-full object-cover">
        </div>

        <div class="p-8 md:p-10 md:w-1/2 flex flex-col justify-center bg-white">
            <span class="text-xs font-bold text-[#E98373] uppercase tracking-widest mb-2">${product.category}</span>
            <h3 class="text-2xl md:text-3xl font-bold font-serif text-[#4B286D] mb-4 leading-tight">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-6 leading-relaxed">
                Este é um item da nossa coleção demonstrativa. Em um e-commerce real, este espaço seria destinado a uma descrição detalhada do produto, contendo materiais, medidas, quantidade de páginas, gramatura do papel e outras especificações técnicas relevantes.
            </p>
            <p class="text-[#4B286D] font-bold text-3xl mb-8">${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id}); closeModal()" class="w-full bg-[#E98373] hover:bg-[#d67262] text-white py-4 rounded-xl font-bold text-lg transition shadow-md flex items-center justify-center gap-2">
                Adicionar à sacola
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
});

// ==========================================
// CARRINHO
// ==========================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    if (!isCartOpen) toggleCart();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-400 gap-4 mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-16 h-16 opacity-50"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>
                <p>Sua sacola está vazia.</p>
            </div>`;
    } else {
        container.innerHTML = cart.map(item => {
            total += item.price * item.qty;
            count += item.qty;
            return `
                <div class="cart-item flex gap-4 items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <div class="w-16 h-16 overflow-hidden rounded-lg border border-gray-50 flex-shrink-0 bg-[#E9E1FA]">
                        <img src="${item.img}" alt="${item.name}" onerror="fallbackImg(this, '${item.name}')" class="cart-item-img w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-semibold text-gray-800 leading-tight mb-1 truncate">${item.name}</h4>
                        <p class="text-[#4B286D] font-bold text-sm">${formatPrice(item.price * item.qty)}</p>
                    </div>
                    <div class="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#4B286D] hover:bg-white rounded font-bold transition-colors">-</button>
                        <span class="w-4 text-center text-sm font-medium text-gray-700">${item.qty}</span>
                        <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#4B286D] hover:bg-white rounded font-bold transition-colors">+</button>
                    </div>
                </div>`;
        }).join('');
    }

    countBadge.innerText = count;
    totalEl.innerText = formatPrice(total);
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    isCartOpen = !isCartOpen;

    if (isCartOpen) {
        overlay.classList.remove('hidden');
        setTimeout(() => sidebar.classList.replace('cart-closed', 'cart-open'), 10);
    } else {
        sidebar.classList.replace('cart-open', 'cart-closed');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

function checkout() {
    if (cart.length === 0) return alert('Sua sacola está vazia! Adicione alguns itens primeiro.');
    alert('Atenção: Este é um ambiente demonstrativo da Prisma. A funcionalidade de checkout real, cálculo de frete e pagamentos está inativa nesta versão.');
}

function scrollToProducts() {
    const section = document.getElementById('mais-vendidos');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// Inicializa
renderProducts();
updateCartUI();
