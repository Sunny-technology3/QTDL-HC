const navigateTo = url => {
    console.log("Navigating to:", url);
    history.pushState(null, null, url);
    router();
    // window.location.href = url;
}

const router = async () => {
    const routes = [
        {path : "/", view: () => console.log("Viewing home")},
        {path : "/news", view: () => console.log("Viewing news")},
        {path : "/notifications", view: () => console.log("Viewing notifications")},
        {path : "/dkDoan", view: () => console.log("Viewing dkDoan")},
        {path : "/nDoan", view: () => console.log("Viewing nDoan")},
        {path : "/bcDoan", view: () => console.log("Viewing bcDoan")},
        {path : "/dkNCkh", view: () => console.log("Viewing dkNCkh")},
        {path : "/profile", view: () => console.log("Viewing profile")},
        {path : "/settings", view: () => console.log("Viewing settings")},
    ];

    const potentialMatches = routes.map(route => {
        return{
            route : route,
            isMatch : location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);

    if ( !match){
        match = {
            route : routes[0],
            isMatch : true
        }
    }

    match.route.view();
    loadPageContent(match.route.path);
    document.title = getTitle(match.route.path); 
    // updateActiveLink(match.route.path);
};

// const updateActiveLink = (path) => {
//     const links = document.querySelectorAll('a[data-page]');
//     links.forEach(link => {
//       if (link.getAttribute('href') === path) {
//         link.classList.add('active');
//       } else {
//         link.classList.remove('active');
//       }
//     });
// };

const getTitle = (path) => {    
    switch(path) {
        case "/":
            return "Trang chủ";
        case "/news":
            return "Tin tức";
        case "/notifications":
            return "Thông báo";
        case "/settings":
            return "Cài đặt";
        case "/profile":
            return "Thông tin";
        default:
            return "Tiện ích";
    }
};

const loadPageContent = (path) => {
    const pageContent = document.getElementById('page-content');
    
    switch(path) {
        case "/news":
            pageContent.innerHTML = "<h1>News Page</h1><br><p>This is the news page.</p>";
            break;
        case "/notifications":
            pageContent.innerHTML = "<h1>Notifications</h1><p>This is the notifications page.</p>";
            break;
        case "/settings":
            pageContent.innerHTML = "<h1>Settings</h1><p>This is the settings page.</p>";
            break;
        default:
            pageContent.innerHTML = "<h1>Home Page</h1><p>Welcome to the home page.</p>";
            break;
    }
};

window.addEventListener("popstate", router);

const loadSidebar = () => {
    const sidebarContainer = document.getElementById("sidebar-container");
    
    // Sử dụng fetch để nạp sidebar
    fetch("/sidebar.html")
        .then(response => response.text())
        .then(html => {
            sidebarContainer.innerHTML = html;
            const sidebarLinks = document.querySelectorAll(".side-bar li");
            sidebarLinks.forEach(link => {
                link.addEventListener("click", e => {
                    e.preventDefault();
                    const eleMent = link.querySelector("a");
                    navigateTo(eleMent.getAttribute("href"));
                });
            });
        })
        .catch(error => console.error("Error loading sidebar:", error));
};

// Nạp footer và header
const loadHeaderAndFooter = () => {
    fetch("/header.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("header-container").innerHTML = html;
        })
        .catch(error => console.error("Error loading header:", error));

    fetch("/footer.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("footer-container").innerHTML = html;
        })
        .catch(error => console.error("Error loading footer:", error));
};

document.addEventListener("DOMContentLoaded", () => {
    // document.body.addEventListener("click", e => {
    //     const target = e.target;
    //     console.log("Link clicked:", target.getAttribute('href'));
    //     console.log("Data-page clicked:", target.getAttribute('data-page'));
    //     e.preventDefault(); 
    //     navigateTo(target.getAttribute("href")); 
    // })
    
    loadHeaderAndFooter();
    loadSidebar(); 

    const sidebarLinks = document.querySelectorAll(".side-bar li");
    console.log(sidebarLinks);
    
    sidebarLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const eleMent = link.querySelector("a");
            navigateTo(eleMent.getAttribute("href"));
        });
    });

    router();
})