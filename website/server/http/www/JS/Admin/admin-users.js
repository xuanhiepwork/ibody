// const user = JSON.parse(localStorage.getItem("user"));
// const currentUserId = user?.taiKhoanId;
// if (!user || !Array.isArray(user.roles) || !user.roles.includes("quan_tri")) {
//   alert("Bạn không có quyền truy cập trang quản trị.");
//   window.location.href = "index.html";
// }

// async function loadAccounts() {
//   try {
//     const res = await fetch("/api/admin/accounts");
//     const data = await res.json();
//     const accounts = data.data || [];

//     const tbody = document.getElementById("userTableBody");
//     tbody.innerHTML = "";

//     accounts.forEach(account => {
//     const isSelf = account.id === currentUserId;
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${account.id}</td>
//       <td>${account.email}</td>
//       <td>${account.vaiTro}</td>
//       <td>${account.trangThai}</td>
//       <td>${account.fullName}</td>
//       <td>
//         ${isSelf ? '' : `<button onclick="khoaTaiKhoan(${account.id})">Khóa</button>`}
//         ${isSelf ? '' : `<button onclick="moKhoaTaiKhoan(${account.id})">Mở</button>`}
//         ${isSelf ? '' : `<button onclick="xoaTaiKhoan(${account.id})" style="color:red;">Xoá</button>`}
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
//   } catch (err) {
//     console.error("Lỗi tải tài khoản:", err);
//   }
// }


// async function moKhoaTaiKhoan(id) {
//   await fetch(`/api/admin/mo-khoa-tai-khoan/${id}`, { method: "POST" });
//   loadAccounts();
// }

// document.addEventListener("DOMContentLoaded", loadAccounts);

// async function xoaTaiKhoan(id) {
//   if (id === currentUserId) return alert("Bạn không thể xoá tài khoản của chính mình.");
//   if (confirm("Bạn có chắc muốn xoá tài khoản này?")) {
//     await fetch(`/api/admin/account/${id}`, { method: "DELETE" });
//     loadAccounts();
//   }
// }

// async function khoaTaiKhoan(id) {
//   if (id === currentUserId) return alert("Bạn không thể khóa tài khoản của chính mình.");
//   await fetch(`/api/admin/khoa-tai-khoan/${id}`, { method: "POST" });
//   loadAccounts();
// }


// document.getElementById("logoutLink")?.addEventListener("click", () => {
//   localStorage.removeItem("user");
//   window.location.href = "../index.html";
// });


// admin-users.js

// admin-users.js

// admin-users.js

document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');

    // --- Mock Data for Users (50 entries total) ---
    const mockUsers = [
        {
            id: 1,
            email: "nguyenvana@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Lê Anh Thư"
        },
        {
            id: 2,
            email: "tranminhdung@example.com",
            role: "expert",
            status: "active",
            fullName: "Trần Minh Dũng"
        },
        {
            id: 3,
            email: "admin@example.com",
            role: "admin",
            status: "active",
            fullName: "Phạm Gia Bảo"
        },
        {
            id: 4,
            email: "lethihong@example.com",
            role: "user",
            status: "inactive",
            fullName: "Lê Thị Hồng Gấm"
        },
        {
            id: 5,
            email: "nguyentuananh@example.com",
            role: "expert",
            status: "pending",
            fullName: "Nguyễn Tuấn Anh"
        },
        {
            id: 6,
            email: "doanvietkhoi@example.com",
            role: "user",
            status: "active",
            fullName: "Đoàn Việt Khôi"
        },
        {
            id: 7,
            email: "phanthithao@example.com",
            role: "expert",
            status: "active",
            fullName: "Phan Thị Thu Thảo"
        },
        {
            id: 8,
            email: "vuhoangduy@example.com",
            role: "user",
            status: "banned",
            fullName: "Vũ Hoàng Duy"
        },
        {
            id: 9,
            email: "dangkhanhly@example.com",
            role: "expert",
            status: "rejected",
            fullName: "Đặng Thị Khánh Ly"
        },
        {
            id: 10,
            email: "tranquangvinh@example.com",
            role: "user",
            status: "active",
            fullName: "Trần Quang Vinh"
        },
        // --- 40 New Users Added Below ---
        {
            id: 11,
            email: "lethanhduy@example.com",
            role: "user",
            status: "active",
            fullName: "Lê Thanh Duy"
        },
        {
            id: 12,
            email: "phamthanhhoa@example.com",
            role: "expert",
            status: "active",
            fullName: "Phạm Thanh Hòa"
        },
        {
            id: 13,
            email: "hoangtrongnghia@example.com",
            role: "user",
            status: "active",
            fullName: "Hoàng Trọng Nghĩa"
        },
        {
            id: 14,
            email: "nguyenthithuy@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Thị Thùy Linh"
        },
        {
            id: 15,
            email: "tranvandat@example.com",
            role: "expert",
            status: "pending",
            fullName: "Trần Văn Đạt"
        },
        {
            id: 16,
            email: "dovuonganh@example.com",
            role: "user",
            status: "inactive",
            fullName: "Đỗ Vương Anh"
        },
        {
            id: 17,
            email: "buitrungkien@example.com",
            role: "expert",
            status: "active",
            fullName: "Bùi Trung Kiên"
        },
        {
            id: 18,
            email: "nguyenmaitrang@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Mai Trang"
        },
        {
            id: 19,
            email: "phamdinhvu@example.com",
            role: "user",
            status: "active",
            fullName: "Phạm Đình Vũ"
        },
        {
            id: 20,
            email: "lyphuongchi@example.com",
            role: "expert",
            status: "active",
            fullName: "Lý Phương Chi"
        },
        {
            id: 21,
            email: "hoangminhtuan@example.com",
            role: "user",
            status: "active",
            fullName: "Hoàng Minh Tuấn"
        },
        {
            id: 22,
            email: "dothiminh@example.com",
            role: "user",
            status: "banned",
            fullName: "Đỗ Thị Ngọc Minh"
        },
        {
            id: 23,
            email: "lehaidang@example.com",
            role: "expert",
            status: "active",
            fullName: "Lê Hải Đăng"
        },
        {
            id: 24,
            email: "nguyendieulinh@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Diệu Linh"
        },
        {
            id: 25,
            email: "tranvanthanh@example.com",
            role: "user",
            status: "active",
            fullName: "Trần Văn Thắng"
        },
        {
            id: 26,
            email: "phamthanhnga@example.com",
            role: "expert",
            status: "active",
            fullName: "Phạm Thanh Nga"
        },
        {
            id: 27,
            email: "vohongphuc@example.com",
            role: "user",
            status: "active",
            fullName: "Võ Hồng Phúc"
        },
        {
            id: 28,
            email: "nguyenvankhanh@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Văn Khánh"
        },
        {
            id: 29,
            email: "hoangthuytien@example.com",
            role: "expert",
            status: "rejected",
            fullName: "Hoàng Thùy Tiên"
        },
        {
            id: 30,
            email: "buiduckien@example.com",
            role: "user",
            status: "active",
            fullName: "Bùi Đức Kiên"
        },
        {
            id: 31,
            email: "dophuonglinh@example.com",
            role: "user",
            status: "active",
            fullName: "Đỗ Phương Linh"
        },
        {
            id: 32,
            email: "tranhuyhoang@example.com",
            role: "expert",
            status: "active",
            fullName: "Trần Huy Hoàng"
        },
        {
            id: 33,
            email: "nguyenminhhieu@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Minh Hiếu"
        },
        {
            id: 34,
            email: "levietanh@example.com",
            role: "user",
            status: "inactive",
            fullName: "Lê Việt Anh"
        },
        {
            id: 35,
            email: "phamthanhbinh@example.com",
            role: "expert",
            status: "pending",
            fullName: "Phạm Thanh Bình"
        },
        {
            id: 36,
            email: "dolethuhuong@example.com",
            role: "user",
            status: "active",
            fullName: "Đỗ Lê Thu Hương"
        },
        {
            id: 37,
            email: "hoangphuongthao@example.com",
            role: "expert",
            status: "active",
            fullName: "Hoàng Phương Thảo"
        },
        {
            id: 38,
            email: "nguyenbaolong@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Bảo Long"
        },
        {
            id: 39,
            email: "tranthikhanhngoc@example.com",
            role: "user",
            status: "active",
            fullName: "Trần Thị Khánh Ngọc"
        },
        {
            id: 40,
            email: "lyhoanglong@example.com",
            role: "expert",
            status: "active",
            fullName: "Lý Hoàng Long"
        },
        {
            id: 41,
            email: "buiducmanh@example.com",
            role: "user",
            status: "active",
            fullName: "Bùi Đức Mạnh"
        },
        {
            id: 42,
            email: "dohoangyen@example.com",
            role: "user",
            status: "active",
            fullName: "Đỗ Hoàng Yến"
        },
        {
            id: 43,
            email: "levuongvu@example.com",
            role: "expert",
            status: "active",
            fullName: "Lê Vương Vũ"
        },
        {
            id: 44,
            email: "nguyenminhquan@example.com",
            role: "user",
            status: "banned",
            fullName: "Nguyễn Minh Quân"
        },
        {
            id: 45,
            email: "phamthanhhuyen@example.com",
            role: "user",
            status: "active",
            fullName: "Phạm Thanh Huyền"
        },
        {
            id: 46,
            email: "dinhphuonguyen@example.com",
            role: "expert",
            status: "pending",
            fullName: "Đinh Phương Uyên"
        },
        {
            id: 47,
            email: "vuongthibich@example.com",
            role: "user",
            status: "active",
            fullName: "Vương Thị Bích"
        },
        {
            id: 48,
            email: "tranvanhiep@example.com",
            role: "user",
            status: "active",
            fullName: "Trần Văn Hiệp"
        },
        {
            id: 49,
            email: "lethihuyentrang@example.com",
            role: "expert",
            status: "active",
            fullName: "Lê Thị Huyền Trang"
        },
        {
            id: 50,
            email: "nguyenphuochuy@example.com",
            role: "user",
            status: "active",
            fullName: "Nguyễn Phước Huy"
        }
    ];

    // --- Function to render users into the table ---
    function renderUsers(users) {
        userTableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = userTableBody.insertRow();

            row.insertCell(0).textContent = user.id;
            row.insertCell(1).textContent = user.email;
            row.insertCell(2).textContent = user.role;

            const statusCell = row.insertCell(3);
            statusCell.textContent = user.status;
            // Optional: Add styling based on status
            if (user.status === 'active') {
                statusCell.style.color = 'green';
            } else if (user.status === 'inactive' || user.status === 'banned') {
                statusCell.style.color = 'red';
            } else if (user.status === 'pending' || user.status === 'rejected') { // Added 'rejected' to orange
                statusCell.style.color = 'orange';
            }

            row.insertCell(4).textContent = user.fullName;

            const actionCell = row.insertCell(5);
            // Example action buttons
            const viewButton = document.createElement('button');
            viewButton.textContent = 'Xem';
            viewButton.className = 'action-btn view-btn';
            viewButton.onclick = () => viewUser(user.id);
            actionCell.appendChild(viewButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Sửa';
            editButton.className = 'action-btn edit-btn';
            editButton.onclick = () => editUser(user.id);
            actionCell.appendChild(editButton);

            // Conditional buttons based on status/role
            if (user.role === 'admin') {
                // Admin accounts usually don't have deactivate/activate options via this panel
                // You might add an "Edit Admin" button if needed
            } else if (user.status === 'active') {
                const deactivateButton = document.createElement('button');
                deactivateButton.textContent = 'Khóa';
                deactivateButton.className = 'action-btn delete-btn'; // Using delete-btn for "ban" appearance
                deactivateButton.onclick = () => deactivateUser(user.id, user.fullName);
                actionCell.appendChild(deactivateButton);
            } else if (user.status === 'inactive' || user.status === 'banned') {
                 const activateButton = document.createElement('button');
                activateButton.textContent = 'Mở khóa';
                activateButton.className = 'action-btn activate-btn';
                activateButton.onclick = () => activateUser(user.id, user.fullName);
                actionCell.appendChild(activateButton);
            }
            // For pending/rejected experts, you might add specific "Duyệt" or "Từ chối" buttons
            // depending on your admin-duyet-chuyen-gia.html logic
        });
    }

    // --- Action functions (placeholders) ---
    function viewUser(userId) {
        alert(`Xem chi tiết người dùng ID: ${userId}`);
        // In a real application, you'd redirect or open a modal
    }

    function editUser(userId) {
        alert(`Chỉnh sửa người dùng ID: ${userId}`);
        // In a real application, you'd redirect to an edit form
    }

    function deactivateUser(userId, userName) {
        if (confirm(`Bạn có chắc muốn khóa tài khoản của ${userName} (ID: ${userId})?`)) {
            alert(`Tài khoản của ${userName} đã bị khóa.`);
            // Implement actual deactivation logic (e.g., API call)
            // After deactivation, re-render the table with updated data
            // For now, let's just simulate by finding and changing status in mockUsers
            const userIndex = mockUsers.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                mockUsers[userIndex].status = 'banned'; // Or 'inactive'
                renderUsers(mockUsers); // Re-render table
            }
        }
    }

    function activateUser(userId, userName) {
        if (confirm(`Bạn có chắc muốn mở khóa tài khoản của ${userName} (ID: ${userId})?`)) {
            alert(`Tài khoản của ${userName} đã được mở khóa.`);
            // Implement actual activation logic
            const userIndex = mockUsers.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                mockUsers[userIndex].status = 'active';
                renderUsers(mockUsers);
            }
        }
    }

    // --- Initial render when the page loads ---
    renderUsers(mockUsers);

    // --- Logout functionality ---
    const logoutLink = document.getElementById('logoutLink');
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Bạn có muốn đăng xuất không?')) {
            // Implement actual logout logic here (e.g., clear session, redirect)
            alert('Đăng xuất thành công!');
            window.location.href = '..//'; // Redirect to home or login page
        }
    });
});