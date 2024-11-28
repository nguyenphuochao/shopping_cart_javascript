// lắng nghe sự kiện click vào nút button add to cart
const btn = document.querySelectorAll('button'); // lấy tất cả nút button
btn.forEach(function (button, index) {
    button.addEventListener('click', function (event) {
        var btnItem = event.target;
        var product = btnItem.parentElement;
        var productImage = product.querySelector('img').src;
        var productName = product.querySelector('h1').innerText;
        var productPrice = product.querySelector('span').innerText;
        addCart(productImage, productName, productPrice);
    });
});

// thêm giỏ hàng
function addCart(productImage, productName, productPrice) {
    var cartItem = document.querySelectorAll('table tbody tr');
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll('.title');
        if (productT[i].innerHTML == productName) {
            alert('Sản phẩm ' + productName + ' đã có trong giỏ hàng');
            return;
        }
    }
    var addtr = document.createElement('tr');
    var trcontent = '<tr><td style="display: flex;align-items: center;"><img src="' + productImage + '" width="100" alt=""><span class="title">' + productName + '</span></td><td><span class="price">' + productPrice + '</span><sup>đ</sup></td><td><input style="width: 40px;" type="number" value="1" min="1"></td><td style="cursor: pointer;"><span class="cart-delete">Xóa</span></td></tr>';
    addtr.innerHTML = trcontent;
    var cartTable = document.querySelector('table tbody');
    cartTable.append(addtr);
    cartTotal();
    deleteCart();
    inputChange();
}

// tổng tiền
function cartTotal() {
    var cartItem = document.querySelectorAll('table tbody tr');
    var total = 0;

    // cartItem.forEach(function(item, index) {
    //     var price = item.querySelector('span').innerText;
    //     var quantity = item.querySelector('input').value;
    //     total += Number(price) * Number(quantity);
    // });

    for (var i = 0; i < cartItem.length; i++) {
        var price = cartItem[i].querySelector('.price').innerText;
        var quantity = cartItem[i].querySelector('input').value;
        total += Number(price) * Number(quantity);
    }

    var priceTotal = document.querySelector('.price-total span');
    var cartIcon = document.querySelector('.cart-icon span');
    priceTotal.innerText = (total * 1000).toLocaleString('de-DE'); // chuyển đổi số VNĐ và tính tiền vào html
    cartIcon.innerText = (total * 1000).toLocaleString('de-DE'); // chuyển đổi số VNĐ và tính tiền vào html
}

// xóa giỏ hàng
function deleteCart() {
    var cartItem = document.querySelectorAll('table tbody tr');
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll('.cart-delete');
        productT[i].addEventListener('click', function (event) {
            var cartDelete = event.target;
            var cartItem = cartDelete.parentElement.parentElement;
            cartItem.remove(); // xóa element
            cartTotal(); // gọi lại hàm tính tổng tiền
        });
    }
}

// thay đổi input số lượng
function inputChange() {
    var cartItem = document.querySelectorAll('table tbody tr');
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector('input');

        inputValue.addEventListener('change', function (event) {
            cartTotal();
        });
    }
}

// ẩn/hiển giỏ hàng
var cartShow = document.querySelector('.fa-cart-shopping');
var cartClose = document.querySelector('.fa-xmark');
cartShow.addEventListener('click', function () {
    document.querySelector('.cart').style.right = "0";
});

cartClose.addEventListener('click', function () {
    document.querySelector('.cart').style.right = "-100%";
});



