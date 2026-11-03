document.addEventListener("DOMContentLoaded", function () {

    // Highlight the navigation link for the current page.
    var currentPage = window.location.pathname.split("/").pop().toLowerCase();
    var navigationLinks = document.querySelectorAll(".nav-link");

    navigationLinks.forEach(function (link) {
        var linkPage = link.getAttribute("href").toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });


    // Display the current year in every footer.
    var yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // Filter destination cards by category.
    var filterButtons = document.querySelectorAll("[data-filter]");
    var destinationItems = document.querySelectorAll(".destination-item");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var selectedCategory = button.getAttribute("data-filter");

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            destinationItems.forEach(function (item) {
                var categories = item.getAttribute("data-category") || "";
                var categoryList = categories.split(" ");

                if (
                    selectedCategory === "all" ||
                    categoryList.includes(selectedCategory)
                ) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });


    // Show a travel note when a destination button is clicked.
    var detailButtons = document.querySelectorAll(".details-btn");

    detailButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var placeName = button.getAttribute("data-place");
            var placeDescription = button.getAttribute("data-description");

            window.alert(placeName + "\n\n" + placeDescription);
        });
    });


    // Gallery image preview and navigation.
    var galleryTiles = document.querySelectorAll(".gallery-tile");
    var galleryImages = [];
    var currentGalleryIndex = 0;

    var lightbox = document.getElementById("galleryLightbox");
    var lightboxImage = document.getElementById("lightboxImage");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var lightboxClose = document.getElementById("lightboxClose");
    var lightboxPrevious = document.getElementById("lightboxPrevious");
    var lightboxNext = document.getElementById("lightboxNext");
    var galleryPrevious = document.getElementById("galleryPrevious");
    var galleryNext = document.getElementById("galleryNext");
    var galleryCounter = document.getElementById("galleryCounter");

    galleryTiles.forEach(function (tile) {
        galleryImages.push({
            source: tile.getAttribute("data-full"),
            caption: tile.getAttribute("data-caption"),
            alt: tile.querySelector("img").getAttribute("alt")
        });
    });

    function updateGalleryCounter() {
        if (galleryCounter) {
            if (galleryImages.length === 0) {
                galleryCounter.textContent = "0 / 0";
            } else {
                galleryCounter.textContent =
                    (currentGalleryIndex + 1) + " / " + galleryImages.length;
            }
        }
    }

    function showGalleryImage(index) {
        if (galleryImages.length === 0) {
            return;
        }

        if (index < 0) {
            index = galleryImages.length - 1;
        }

        if (index >= galleryImages.length) {
            index = 0;
        }

        currentGalleryIndex = index;

        if (lightboxImage && lightboxCaption) {
            lightboxImage.src = galleryImages[index].source;
            lightboxImage.alt = galleryImages[index].alt;
            lightboxCaption.textContent = galleryImages[index].caption;
        }

        updateGalleryCounter();
    }

    function openLightbox(index) {
        if (!lightbox) {
            return;
        }

        showGalleryImage(index);
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("show");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    galleryTiles.forEach(function (tile, index) {
        tile.addEventListener("click", function () {
            openLightbox(index);
        });
    });

    if (galleryPrevious) {
        galleryPrevious.addEventListener("click", function () {
            showGalleryImage(currentGalleryIndex - 1);
        });
    }

    if (galleryNext) {
        galleryNext.addEventListener("click", function () {
            showGalleryImage(currentGalleryIndex + 1);
        });
    }

    if (lightboxPrevious) {
        lightboxPrevious.addEventListener("click", function () {
            showGalleryImage(currentGalleryIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", function () {
            showGalleryImage(currentGalleryIndex + 1);
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (!lightbox || !lightbox.classList.contains("show")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showGalleryImage(currentGalleryIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showGalleryImage(currentGalleryIndex + 1);
        }
    });

    updateGalleryCounter();


    // Validate the contact form.
    var contactForm = document.getElementById("contactForm");
    var formMessage = document.getElementById("formMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            var firstName = document.getElementById("name").value.trim();

            if (formMessage) {
                formMessage.textContent =
                    "Thank you, " + firstName +
                    ". Your details are complete. This demonstration website " +
                    "does not have an email service connected, so your message " +
                    "has not been sent.";
            }

            contactForm.reset();
        });

        contactForm.addEventListener("reset", function () {
            if (formMessage) {
                formMessage.textContent = "";
            }
        });
    }

});
