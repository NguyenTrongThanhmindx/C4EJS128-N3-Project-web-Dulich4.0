let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let logoutBtn = document.querySelector('#logout-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');

function signup(){
  
}

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');  
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});

function User(username, pass) {
  this.username = username;
  this.pass = pass;
}

function activeformLogin() {
  loginForm.classList.add('active');
}

function setCurrentUser(u) {
  window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}

function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}

function getListUser() {
  var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
  var l = [];
  for (var d of data) {
      l.push(d);
  }
  return l;
}

function logIn(form) {
  // Lấy dữ liệu từ form
  var name = form.username.value;
  var pass = form.password.value;
  var newUser = new User(name, pass);

  // Lấy dữ liệu từ danh sách người dùng localstorage
  var listUser = getListUser();

  // Kiểm tra xem dữ liệu form có khớp với người dùng nào trong danh sách ko
  for (var u of listUser) {
    if (equalUser(newUser, u)) {
        if(u.off) {
            alert('Tài khoản này đang bị khoá. Không thể đăng nhập.');
            return false;
        }

        setCurrentUser(u);

        // Reload lại trang -> sau khi reload sẽ cập nhật luôn giỏ hàng khi hàm setupEventTaiKhoan chạy
        location.reload();
        return false;
    }
  }

  alert('Nhập sai tên hoặc mật khẩu !!!');
  form.username.focus();
  return false;
}

function logOut() {
  window.localStorage.removeItem('CurrentUser');
  location.reload();
}

function getCurrentUser() {
  return JSON.parse(window.localStorage.getItem('CurrentUser')); // Lấy dữ liệu từ localstorage
}

let checkUser = document.querySelector('#check-user-login');

if(!getCurrentUser()) {
  checkUser.innerHTML = '<i class="fas fa-search" id="search-btn"></i><i class="fas fa-user" onclick="activeformLogin()"></i>';
}
else {
  checkUser.innerHTML = '<i class="fas fa-search" id="search-btn"></i><i class="fas fa-power-off" onclick="logOut()"></i>';
}