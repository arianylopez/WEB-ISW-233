export const Router = {
  init: () => {
    document.querySelectorAll("a.nav__link").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        Router.go(href);
      });
    });

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Home";
        break;
      case "/element":
        pageElement = document.createElement("h1");
        pageElement.textContent = "Element 1";
        break;
      default:
        break;
    }
    if (pageElement) {
      let currentPage = document.querySelector("main").firstElementChild;
      if (currentPage) {
        currentPage.remove();
        document.querySelector("main").appendChild(pageElement);
      } else {
        document.querySelector("main").appendChild(pageElement);
      }
    }
  },
};
