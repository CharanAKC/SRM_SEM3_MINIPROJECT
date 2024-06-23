// if(localStorage.getItem("flag") === null || localStorage.getItem("flag") === "false"){
//     window.location.href = '/login.html';
// }

$(document).ready(function () {

    if(localStorage.getItem("flag") === null || localStorage.getItem("flag") === "false"){
        // window.location.href = '/login.html';
        var rootPath = window.location.pathname.split('/')[1];
        var logoutLink = document.getElementById('logout-link');
        
        if (rootPath && rootPath !== 'Shoplane_ShoppingApp') {
            // If not in the root directory, prepend the root path
            logoutLink.href = '/' + rootPath + '/login.html';
        } else {
            // If in the root directory or no root path detected
            logoutLink.href = '/login.html';
        }
    }
    
    var productListJSON = localStorage.getItem("product-list");
    var productList = [];

    if (productListJSON) {
        productList = JSON.parse(productListJSON);
    }

    var itemList = document.getElementById("item-list");
    var total = document.getElementById("total-amt");
    var totalItems = 0;
    var grandTotal = 0;

    for (let i = 0; i < productList.length; i++) {
        createCheckoutItem(productList[i]);

        var totalForCurrentProd = productList[i].count * productList[i].price;
        grandTotal += totalForCurrentProd;

        totalItems += productList[i].count
    }

    // console.log(total);
    $("#total").html(totalItems)
    $("#total-amt").html(grandTotal);


    function createCheckoutItem(product) {
        itemList.innerHTML += `
            <div class="item-card">
                <div>
                    <img class="checkout-product-img" src="${product.preview}" alt="">
                </div>
                <div>
                    <h4>${product.name}</h4>
                    <p>x${product.count}</p>
                    <p><span>Amount: Rs </span><span class="product-price">${product.price}</span> </p>
                    <button class="btn-remove" id="${product.id}">Remove</button>
                </div>
            </div>
        `;
    }

    $("#btn-order").click(function () {
        if(totalItems == 0){
            alert("Your cart is empty!! Not able to place order");
        }else{
            $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', productList, function() {
                alert('Order Placed Successfully')
                // localStorage.setItem('product-list', []);

                location.assign('../confirm.html');
            })
            localStorage.setItem('product-list', JSON.stringify([])); // Set to an empty JSON array
            location.assign("../confirm.html");
        }
    });
	
	$(".btn-remove").click(function () {
        var productId = $(this).attr('id'); // Get the product ID from data attribute
        // console.log("Clicked")
        removeItem(productId);
    });
    
    function removeItem(id){
        
        for(let i = 0; i < productList.length; i++){
            console.log("removed", id, productList[i].id)
            if(productList[i].id === id){
                productList.splice(i, 1);
            }
        }

        localStorage.setItem("product-list", JSON.stringify(productList));
        location.reload();
    }

    // Humburger Navigation Links
    if(window.innerWidth <= 400){
        // JavaScript to handle menu toggle and navigation
        const menuIcon = document.getElementById("menu-icon");
        const leftMenuList = document.getElementById("left-menu-list");

        // Add a click event listener to the menu icon
        menuIcon.addEventListener("click", function () {
            if (leftMenuList.style.display === "block") {
                leftMenuList.style.display = "none";
            } else {
                leftMenuList.style.display = "block";
            }
        });

        // Add click event listeners to each menu item to navigate
        const menuItems = leftMenuList.querySelectorAll("a");
        menuItems.forEach(function (menuItem) {
            menuItem.addEventListener("click", function () {
                leftMenuList.style.display = "none"; // Hide the menu
                // You can add more logic here to navigate to the clicked URL
            });
        });
    }
    $("#logout-btn").click(()=>{
        localStorage.setItem('flag', false);
        // window.location.href = '/login.html';
        location.reload();
    })
});
