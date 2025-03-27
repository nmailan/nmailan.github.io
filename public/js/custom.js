document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".banner.onload-image-fade-in .image img, .banner.onload-content-fade-right").forEach(el => {
      el.classList.add("loaded");
    });
  });

document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.getElementById("navbar");
    var main = document.getElementById("main");
    var lastScrollTop = 0;
    var scrollTimeout;

    function showNavbar() {
        navbar.style.top = "0";
        // main.style.paddingTop = "60px";
    }

    function hideNavbar() {
        navbar.style.top = "-60px"; // Adjust based on the height of your navbar
        // main.style.paddingTop = "0";
    }

    window.addEventListener("scroll", function() {
        clearTimeout(scrollTimeout);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop || scrollTop <= 0) {
            // Scroll down or at the top
            showNavbar();
        } else {
            // Scroll up
            showNavbar();
        }

        lastScrollTop = scrollTop;

        // Set timeout to hide the navbar after 2 seconds of no scrolling
        scrollTimeout = setTimeout(hideNavbar, 2000);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var openPopupBtns = document.querySelectorAll('.open-popup');
    var closeBtns = document.querySelectorAll('.close-popup');
    // console.log("Open Popup Buttons:", openPopupBtns);

    openPopupBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var popupId = btn.getAttribute('data-popup-id');
            var popup = document.getElementById(popupId);
            popup.style.display = 'block';
        });
    });

    closeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var popup = btn.closest('.popup');
            popup.style.display = 'none';
        });
    });


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
    // console.log("popup id:", popupId)
    // console.log("open index: ", currentSlideIndex)
    const fullscreenViewer = document.getElementById('fullscreenViewer');
    const fullscreenImg = document.getElementById('fullscreenImg');

    // Correctly select photos from the current pop-up using a valid selector
    currentPhotos = document.querySelectorAll(`#${popupId} .photo-item img`);
    // console.log(currentPhotos)
    
    // console.log("src; ", image.src)
    fullscreenImg.src = image.src;
    fullscreenViewer.style.display = 'flex';
    currentSlideIndex = Array.from(currentPhotos).indexOf(image);
    // console.log(currentSlideIndex)
}

function closeFullscreen() {
    document.getElementById('fullscreenViewer').style.display = 'none';
}

function changeSlide(direction) {
    // console.log(currentPhotos.length)
    // console.log("sliding:", currentSlideIndex)
    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        // console.log("here in this case")
        currentSlideIndex = currentPhotos.length - 1;
    } else if (currentSlideIndex >= currentPhotos.length) {
        // console.log("reset", currentSlideIndex)
        currentSlideIndex = 0;
    }

    const fullscreenImg = document.getElementById('fullscreenImg');
    fullscreenImg.src = currentPhotos[currentSlideIndex].src;
}

