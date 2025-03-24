const navigateTo = url => {
    history.pushState(null, null, url);
    router();
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
        {path : "/bcNCkh", view: () => console.log("Viewing dkNCkh")},
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
};

const getTitle = (path) => {    
    switch(path) {
        case "/":
            return "Trang chủ";
        case "/news":
            return "Tin tức";
        case "/notifications":
            return "Thông báo";
        case "/dkDoan":
            return "Đăng ký đồ án | Tiện ích";
        case "/nDoan":
            return "Nộp đề án | Tiện ích";
        case "/bcDoan":
            return "Báo cáo đề án | Tiện ích";
        case "/dkNCkh":
                return "Đăng ký đề tài nghiên cứu khoa học | Tiện ích";
        case "/bcNCkh":
            return "Báo cáo đề tài nghiên cứu khoa học | Tiện ích";
        case "/profile":
            return "Thông tin cá nhân";
        case "/settings":
            return "Cài đặt";
        default:
            return "Tiện ích";
    }
};

const loadPageContent = (path) => {
    const pageContent = document.getElementById('page-content');
    const pageSpecificCss = document.getElementById('page-specific-css');

    switch(path) {
        case "/news":
            pageContent.innerHTML = "<h1>News Page</h1><br><p>This is the news page.</p>";
            pageSpecificCss.href = "";
            break;
        case "/notifications":
            pageContent.innerHTML = "<h1>Notifications</h1><p>This is the notifications page.</p>";
            pageSpecificCss.href = "";
            break;
        case "/settings":
            pageContent.innerHTML = "<h1>Settings</h1><p>This is the settings page.</p>";
            pageSpecificCss.href = "";
            break;
        case "/dkDoan":
            updatePage("/utilities/register_project.html", pageContent);
            pageSpecificCss.href = "/utilities/register_project.css";
            break;
        case "/profile":
            updatePage("/profile/profile_user.html", pageContent);
            pageSpecificCss.href = "/profile/profile_user.css";
            break;
        default:
            pageContent.innerHTML = "<h1>Home Page</h1><p>Welcome to the home page.</p>";
            pageSpecificCss.href = "";
            break;
    }
};

function updatePage(path, pageId) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            pageId.innerHTML = html; 
        })
        .catch(error => {
            console.error("Error loading /bcDoan.html:", error);
            pageId.innerHTML = "<h1>Error loading content</h1>";
        });
}

window.addEventListener("popstate", router);

const loadPage = () => {
    
    updatePage("/header.html", document.getElementById("header-container"));
    updatePage("/footer.html", document.getElementById("footer-container"));

    fetch("/sidebar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("sidebar-container").innerHTML = html;
            const sidebarLinks = document.querySelectorAll(".side-bar li");
            sidebarLinks.forEach(link => {
                link.addEventListener("click", e => {
                    e.preventDefault();
                    if ( link.getAttribute("class") !== "menu"){
                        const eleMent = link.querySelector("a");
                        navigateTo(eleMent.getAttribute("href"));
                    }
                });
            });
        })
        .catch(error => console.error("Error loading sidebar:", error));
};

document.addEventListener("DOMContentLoaded", () => {
    loadPage();

    router();
})