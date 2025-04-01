// 🟢 1. Lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        let response = await fetch('/api/products');
        let products = await response.json();

        let tableBody = document.getElementById('productTable');
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ

        products.forEach(product => {
            let row = `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} VND</td>
                <td>
                    <button onclick="editProduct(${product.id})">Sửa</button>
                    <button onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

// 🟢 2. Thêm sản phẩm mới
async function addProduct() {
    const product = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };

    let response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert('Thêm sản phẩm thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi thêm sản phẩm.');
    }
}

// 🟢 3. Xóa sản phẩm
async function deleteProduct(id) {
    if (!confirm('Bạn có chắc muốn xóa?')) return;

    let response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

    if (response.ok) {
        alert('Xóa thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi xóa sản phẩm.');
    }
}

// 🟢 4. Sửa sản phẩm (lấy thông tin cũ)
async function editProduct(id) {
    let response = await fetch(`/api/products/${id}`);
    let product = await response.json();

    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
}

// 🟢 5. Cập nhật sản phẩm
async function updateProduct() {
    const id = document.getElementById('productId').value;
    const product = {
        id: id,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };

    let response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert('Cập nhật thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi cập nhật sản phẩm.');
    }
}
// 🟢 6. Xem chi tiết sản phẩm
async function viewProductDetails(id) {
    try {
        let response = await fetch(`/api/products/details/${id}`);
        if (!response.ok) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        let product = await response.json();

        // Hiển thị modal hoặc trang chi tiết
        showProductModal(product);
    } catch (error) {
        console.error('Lỗi:', error);
        alert(error.message);
    }
}

// Hiển thị modal chi tiết sản phẩm
function showProductModal(product) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.zIndex = '1000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    modal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 5px; max-width: 500px;">
            <h2>Chi tiết sản phẩm</h2>
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Tên:</strong> ${product.name}</p>
            <p><strong>Giá:</strong> ${product.price} VND</p>
            <button onclick="this.parentElement.parentElement.remove()">Đóng</button>
        </div>
    `;

    document.body.appendChild(modal);
}

// Cập nhật hàm fetchProducts để thêm nút xem chi tiết
async function fetchProducts() {
    try {
        let response = await fetch('/api/products');
        let products = await response.json();

        let tableBody = document.getElementById('productTable');
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ

        products.forEach(product => {
            let row = `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} VND</td>
                <td>
                    <button onclick="viewProductDetails(${product.id})">Xem</button>
                    <button onclick="editProduct(${product.id})">Sửa</button>
                    <button onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Lỗi:', error);
    }
}
// 🟢 Khi tải trang, tự động tải danh sách sản phẩm
window.onload = fetchProducts;