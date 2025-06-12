function toggleUserDropdown() {
  const dropdown = document.getElementById("userDropdown");
  dropdown.classList.toggle("show");
}

// Ẩn dropdown khi click ra ngoài
document.addEventListener("click", function (e) {
  const menu = document.getElementById("userMenu");
  const dropdown = document.getElementById("userDropdown");
  if (!menu.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav");

  toggleBtn?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const avatarImg = document.querySelector(".user-button img");

  if (user && avatarImg) {
    avatarImg.src = user.avatarUrl
      ? `${user.avatarUrl}`
      : "/picture/default-avatar.jpg";
  }
});
