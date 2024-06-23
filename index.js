if(localStorage.getItem("flag") === null || localStorage.getItem("flag") === "false"){
    window.location.href = 'login.html';    
}

$(document).ready(function(){
    // Carousel
    $('.center').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
            //   centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
            //   centerPadding: '10px',
              slidesToShow: 1
            }
          }
        ]
    });
 
    // Product Card Section
    
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function(response){
        // console.log(response)
        var productData = response;
        // <div class="product" id="clothing">
        //         <div class="product-card">
        //             <a href="">
        //                 <img class="product-img" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg" alt="">
        //             </a>
        //             <div class="product-details">
        //                 <h4>Men Navy Blue Solid Sweatshirt</h4>
        //                 <h5>United Colors of Benetton</h5>
        //                 <p>Rs 2599</p>
        //             </div>
        //         </div>
        //     </div>
        for(let i = 0; i < productData.length; i++){
            addProductCard(productData[i]);
        }

    })

    function addProductCard(product){
        var productDiv;
        if(product.isAccessory){
            productDiv = document.getElementById("accessory");
        }else{
            productDiv = document.getElementById("clothing");
        }
        // console.log(section);
    
        productDiv.innerHTML += `
            <div class="product-card">
                <a href="product/product.html?p=${product.id}">
                    <img class="product-img" src="${product.preview}" alt="">
                </a>
                <div class="product-details">
                    <h4>${product.name}</h4>
                    <h5>${product.brand}</h5>
                    <p>Rs ${product.price}</p>
                </div>
            </div>
        `;        
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
        window.location.href = 'login.html';
    })
    
});