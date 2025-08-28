// Utility: Debounce function to limit execution rate for scroll events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Navbar show/hide logic with optimized scroll event (debounced)
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");
    let hideTimeout = null;

    function showNavbar() {
        navbar.style.top = "0";
        // Uncomment if you want to adjust main's padding:
        // const main = document.getElementById("main");
        // if (main) main.style.paddingTop = "60px";
    }

    function hideNavbar() {
        navbar.style.top = "-60px"; // Adjust if your navbar height changes
        // Uncomment if you want to adjust main's padding:
        // const main = document.getElementById("main");
        // if (main) main.style.paddingTop = "0";
    }

    // Debounced scroll handling for navbar
    window.addEventListener("scroll", debounce(function() {
        showNavbar();
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideNavbar, 2000); // Hide after 2s of inactivity
    }, 50));

    // Popup logic using event delegation for efficiency and future dynamic elements
    document.body.addEventListener('click', function(e) {
        // Open popup
        if (e.target.classList.contains('open-popup')) {
            const popupId = e.target.getAttribute('data-popup-id');
            const popup = document.getElementById(popupId);
            if (popup) popup.style.display = 'block';
        }
        // Close popup
        if (e.target.classList.contains('close-popup')) {
            const popup = e.target.closest('.popup');
            if (popup) popup.style.display = 'none';
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
//     var openPopupBtns = document.querySelectorAll('.open-popup');
//     var closeBtns = document.querySelectorAll('.close-popup');


//     openPopupBtns.forEach(function(btn) {
//         btn.addEventListener('click', function() {
//             var popupId = btn.getAttribute('data-popup-id');
//             var popup = document.getElementById(popupId);
//             popup.style.display = 'block';
//         });
//     });

//     closeBtns.forEach(function(btn) {
//         btn.addEventListener('click', function() {
//             var popup = btn.closest('.popup');
//             popup.style.display = 'none';
//         });
//     });


    // When the user clicks anywhere outside of the popup, close it
    window.addEventListener('click', function(event) {
        var popups = document.querySelectorAll('.popup');
        popups.forEach(function(popup) {
            if (event.target == popup) {
                popup.style.display = 'none';
            }
        });
    });
});

let currentSlideIndex;
let currentPhotos;

function openFullscreen(image, popupId) {
    const fullscreenViewer = document.getElementById('fullscreenViewer');
    const fullscreenImg = document.getElementById('fullscreenImg');

    // Correctly select photos from the current pop-up using a valid selector
    currentPhotos = document.querySelectorAll(`#${popupId} .photo-item img`);
    
    fullscreenImg.src = image.src;
    fullscreenViewer.style.display = 'flex';
    currentSlideIndex = Array.from(currentPhotos).indexOf(image);
}

function closeFullscreen() {
    document.getElementById('fullscreenViewer').style.display = 'none';
}

function changeSlide(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = currentPhotos.length - 1;
    } else if (currentSlideIndex >= currentPhotos.length) {
        currentSlideIndex = 0;
    }

    const fullscreenImg = document.getElementById('fullscreenImg');
    fullscreenImg.src = currentPhotos[currentSlideIndex].src;
}






// document.addEventListener("DOMContentLoaded", function() {
//     var navbar = document.getElementById("navbar");
//     var main = document.getElementById("main");
//     var lastScrollTop = 0;
//     var scrollTimeout;

//     function showNavbar() {
//         navbar.style.top = "0";
//         // main.style.paddingTop = "60px";
//     }

//     function hideNavbar() {
//         navbar.style.top = "-60px"; // Adjust based on the height of your navbar
//         // main.style.paddingTop = "0";
//     }

//     window.addEventListener("scroll", function() {
//         clearTimeout(scrollTimeout);
//         var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//         if (scrollTop > lastScrollTop || scrollTop <= 0) {
//             // Scroll down or at the top
//             showNavbar();
//         } else {
//             // Scroll up
//             showNavbar();
//         }

//         lastScrollTop = scrollTop;

//         // Set timeout to hide the navbar after 2 seconds of no scrolling
//         scrollTimeout = setTimeout(hideNavbar, 2000);
//     });
// });
