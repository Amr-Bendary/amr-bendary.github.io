document.addEventListener("DOMContentLoaded", () => {
  // Changing page title on content change
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      document.title = e.target.name;
      for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
        pages[e.target.id].classList.add("active");
      }
      pagesIndex = e.target.id;
      hideFooter();
      popupDismiss();
    }
  });

  // Setting up navigation buttons to change content
  let pages = document.getElementById("content").children;
  let projects = document.getElementById("works").children;
  let pagesIndex = 0;
  let projectsIndex = 0;

  let changeProject = () => {
    for (let i = 0; i < projects.length; i++) {
      projects[i].classList.remove("visible");
      projects[projectsIndex].classList.add("visible");
    }
  };
  let changePage = () => {
		document.title = pages[pagesIndex].id;
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("active");
      pages[pagesIndex].classList.add("active");
    }
  };

  let nextProject = () => {
    if (projectsIndex !== projects.length - 1) {
      projectsIndex++;
    }
    changeProject();
  };
  let prevProject = () => {
    if (projectsIndex !== 0) {
      projectsIndex--;
    }
    changeProject();
  };
  let nextPage = () => {
    if (pagesIndex !== pages.length - 1) {
      pagesIndex++;
    }
    changePage();
  };
  let prevPage = () => {
    if (pagesIndex !== 0) {
      pagesIndex--;
    }
    changePage();
  };
  (function () {
    if (window.innerWidth < 1025 && window.innerHeight < 1025) {
      document.querySelector(".links_right").style.transform = "scale(0)";
    }
		if (window.innerWidth < 1025) {
      document.querySelector(".links_right").classList.remove("custom_2", "slow_5");
		}
  })();
  let hideFooter = () => {
    if (
      window.innerWidth < 1025 &&
      (document.title === "About Me" || document.title === "Previous Work")
    ) {
      document.getElementById("footer").style.display = "none";
    } else if (document.title === "Amr Bendary" || document.title === "Contact Me"){
      document.getElementById("footer").style.display = "initial";
    }
  };

  document.body.onkeydown = function (event) {
    event = event || window.event;
    var keycode = event.charCode || event.keyCode;
    if (keycode === 40 && document.title === "Previous Work") {
      nextProject();
    } else if (keycode === 38 && document.title === "Previous Work") {
      prevProject();
    } else if (keycode === 39) {
      nextPage();
      hideFooter();
    } else if (keycode === 37) {
			prevPage();
      hideFooter();
    }
  };

  var poppy = localStorage.getItem("myPopup");

  if (!poppy && window.innerWidth > 1024) {
    function PopUp() {
      document.querySelector("#popup").classList.add("popup_view");
      let toBeBlurry = document.querySelector("#popup").nextElementSibling;
      while (toBeBlurry) {
        toBeBlurry.classList.add("blurry");
        toBeBlurry = toBeBlurry.nextElementSibling;
      }
    }

    setTimeout(function () {
      PopUp();
    }, 2000);

    let popupDismiss = () => {
      document.getElementById("nav_top").classList.remove("blurry");
      document.querySelector(".popup").classList.remove("popup_view");
      let toBeBlurry = document.querySelector("#popup").nextElementSibling;
      while (toBeBlurry) {
        toBeBlurry = toBeBlurry.nextElementSibling;
        toBeBlurry.classList.remove("blurry");
      }
    }
    document
      .querySelector("#popup_dismiss")
      .addEventListener("click", popupDismiss);
    localStorage.setItem("myPopup", "true");
  }
});
