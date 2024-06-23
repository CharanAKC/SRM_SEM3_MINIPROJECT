
// $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/2", function(response){
//     console.log(response);
// });

// if(localStorage.getItem("flag") === null || localStorage.getItem("flag") === "false"){
//     window.location.href = '/login.html';
// }

$(document).ready(function() {

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
    
    var productId = window.location.search.split('=')[1];
    var currentObj = null;

    function createProductImages(url, pos) {
        var image = document.createElement('img');
        image.src = url

        if(pos === 0) {
            image.classList.add("active");
        }

        image.onclick = function() {
            $('#preview-images img').removeClass("active")
            image.classList.add("active");
            $('#product-preview').attr('src', url);
        }

        return image;
    }
    //API call to get selected product data 
    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId, function(data, status) {
        currentObj = data;
        $('#product-preview').attr('src', data.preview)
        $('#product-title').html(data.name);
        $('#product-brand').html(data.brand);
        $('#description').html(data.description);
        $('#price').html(data.price);

        for(var i=0; i<data.photos.length; i++) {
            $('#preview-images').append(createProductImages(data.photos[i], i));
        }
    })

    $("#btn-add-to-cart").click(function() {
        $('#btn-add-to-cart').addClass('bigger');
        setTimeout(function() {
            $('#btn-add-to-cart').removeClass('bigger');
        }, 200)

        var productList = window.localStorage.getItem('product-list');
        productList = productList === null || productList === '' ? [] : productList;
        productList = productList.length > 0 ? JSON.parse(productList) : [];

        // productList.push(currentObj);
        // window.localStorage.setItem('product-list', JSON.stringify(productList));
        // console.log(productList);

        var foundAtPos = -1;
        for(var i=0; i < productList.length; i++) {
            // console.log(productList[i].id);
            if(parseInt(productList[i].id) == parseInt(currentObj.id)) {
                foundAtPos = i;
            }
        }

        if(foundAtPos > -1) {
            productList[foundAtPos].count = productList[foundAtPos].count + 1;
            // console.log(productList[foundAtPos].count);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        } else {
            currentObj.count = 1;
            productList.push(currentObj);
            // console.log(productList);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        }

        var totalCount = 0;
        for(var i=0; i<productList.length; i++) {
            totalCount = totalCount + productList[i].count;
        }
    
        $('#cart-count').html(totalCount);
    })

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