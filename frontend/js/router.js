function initRouter() {
    // Xác định trang từ URL hiện tại
    const currentPath = window.location.pathname;
    let pageId = "home"; // Mặc định là trang chủ
    
    // Phân tích URL để xác định trang
    if (currentPath.includes("profile.html")) {
        pageId = "profile";
    } else if (currentPath.includes("settings.html")) {
        pageId = "settings";
    } else if (currentPath.includes("register_project.html")) {
        pageId = "utilities";
    } else if (currentPath.includes("news.html")) {
        pageId = "news";
    } else if (currentPath.includes("notifications.html")) {
        pageId = "notifications";
    }
    
    // Đăng ký sự kiện cho các liên kết sidebar
    document.addEventListener("click", function(e) {
        // Tìm thẻ a gần nhất có thuộc tính data-page
        const link = e.target.closest(".sidebar a[data-page]");
        if (link) {
            e.preventDefault();
            const pageId = link.getAttribute("data-page");
            navigateTo(pageId);
        }
    });
    
    // Tải trang ban đầu
    loadPage(pageId);
    
    // Xử lý nút back/forward của trình duyệt
    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId, false);
        }
    });
}

// Điều hướng đến trang có ID tương ứng
function navigateTo(pageId) {
    // Cập nhật URL bằng History API
    const pageTitle = getPageTitle(pageId);
    const pageUrl = getPageUrl(pageId);
    
    window.history.pushState({pageId: pageId}, pageTitle, pageUrl);
    
    // Tải nội dung trang
    loadPage(pageId);
}

// Tải nội dung trang từ file HTML riêng biệt
async function loadPage(pageId, updateMenu = true) {
    document.getElementById("page-content").innerHTML = '<div class="loading">Đang tải...</div>';
    
    if (updateMenu) {
        // Cập nhật trạng thái active cho menu
        document.querySelectorAll(".sidebar li").forEach(li => {
            li.classList.remove("active");
        });
        
        // Tìm và đánh dấu active cho menu tương ứng dựa vào data-page
        const activeLink = document.querySelector(`.sidebar a[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.closest("li").classList.add("active");
        }
    }
    
    try {
        // Xác định đường dẫn đến file HTML tương ứng
        const baseApiPath = "pages/";
        let pagePath;
        
        switch(pageId) {
            case "home":
                pagePath = baseApiPath + "home/home.html";
                break;
            case "news":
                pagePath = baseApiPath + "news/news.html";
                break;
            case "notifications":
                pagePath = baseApiPath + "notifications/notifications.html";
                break;
            case "utilities":
                pagePath = baseApiPath + "utilities/register_project.html";
                break;
            case "profile":
                pagePath = baseApiPath + "profile/profile.html";
                break;
            case "settings":
                pagePath = baseApiPath + "settings/settings.html";
                break;
            default:
                pagePath = baseApiPath + "404.html";
        }
        
        // Tải nội dung trang từ file HTML
        const response = await fetch(pagePath);
        
        if (!response.ok) {
            throw new Error(`Không thể tải trang ${pageId}`);
        }
        
        const html = await response.text();
        document.getElementById("page-content").innerHTML = html;
        
        // Tải CSS riêng cho trang
        loadPageCSS(pageId);
        
        // Cập nhật tiêu đề trang
        document.title = getPageTitle(pageId);
        
        // Thêm xử lý đặc biệt cho từng trang nếu cần
        if (pageId === "utilities") {
            setupUtilitiesPage();
        }
        
    } catch (error) {
        console.error("Lỗi khi tải trang:", error);
        document.getElementById("page-content").innerHTML = `
            <div class="error-container">
                <h2>Không thể tải trang</h2>
                <p>${error.message}</p>
                <button onclick="navigateTo("home")">Quay về trang chủ</button>
            </div>
        `;
    }
}

function setupUtilitiesPage() {
    const submitButton = document.querySelector(".submit-button");
    if (submitButton) {
        submitButton.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Đã nộp đơn đăng ký đồ án!");
            alert("Đơn đăng ký đã được gửi thành công!");
        });
    }
    
    const cancelButton = document.querySelector(".cancel-button");
    if (cancelButton) {
        cancelButton.addEventListener("click", function(e) {
            e.preventDefault();
            // Xử lý khi nút Hủy được nhấn
            document.querySelector("form").reset();
        });
    }
}

function loadPageCSS(pageId) {
    let cssPath;
    
    switch(pageId) {
        case "utilities":
            cssPath = "pages/utilities/register_project.css";
            break;
        default:
            cssPath = `pages/${pageId}/${pageId}.css`;
    }
    
    // Kiểm tra và xoá link CSS cũ
    const existingLink = document.getElementById("page-specific-css");
    if (existingLink) {
        existingLink.remove();
    }
    
    // Tạo và thêm link CSS mới
    const cssLink = document.createElement("link");
    cssLink.id = "page-specific-css";
    cssLink.rel = "stylesheet";
    cssLink.href = cssPath;
    document.head.appendChild(cssLink);
}

function getPageTitle(pageId) {
    switch (pageId) {
        case "home": return "Trang chủ";
        case "news": return "Tin tức";
        case "notifications": return "Thông báo";
        case "utilities": return "Tiện ích";
        case "profile": return "Thông tin cá nhân";
        case "settings": return "Cài đặt";
        default: return "Hệ thống quản trị tài liệu hành chính";
    }
}

function getPageUrl(pageId) {
    const baseUrl = window.location.origin + window.location.pathname.split('index.html')[0];
    
    switch (pageId) {
        case "home": return baseUrl;
        case "news": return baseUrl + "pages/news/news.html";
        case "notifications": return baseUrl + "pages/notifications/notifications.html";
        case "utilities": return baseUrl + "pages/utilities/register_project.html";
        case "profile": return baseUrl + "pages/profile/profile.html";
        case "settings": return baseUrl + "pages/settings/settings.html";
        default: return baseUrl;
    }
}

function addLoadingCSS() {
    if (!document.getElementById("loading-styles")) {
        const style = document.createElement("style");
        style.id = "loading-styles";
        style.textContent = `
            .loading {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                font-size: 18px;
                color: var(--main-color, #1e88e5);
            }
            
            .loading::after {
                content: "";
                width: 20px;
                height: 20px;
                margin-left: 10px;
                border: 3px solid var(--main-color, #1e88e5);
                border-radius: 50%;
                border-top-color: transparent;
                animation: loading-spinner 1s linear infinite;
            }
            
            @keyframes loading-spinner {
                to {
                    transform: rotate(360deg);
                }
            }
            
            .error-container {
                text-align: center;
                padding: 30px;
            }
            
            .error-container button {
                padding: 8px 16px;
                background-color: var(--main-color, #1e88e5);
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 15px;
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    addLoadingCSS();
});