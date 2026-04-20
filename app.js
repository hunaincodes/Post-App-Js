let currentUser = null;

// Load user session
window.onload = function () {
    const user = localStorage.getItem("currentUser");
    if (user) {
        currentUser = JSON.parse(user);
        showApp();
        loadPosts();
    }
};

// Signup
function signup() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
}

// Login
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        showApp();
        loadPosts();
    } else {
        alert("Invalid credentials");
    }
}

// Show app
function showApp() {
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

// Add Post
function addPost() {
    const text = document.getElementById("postInput").value;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.push({
        id: Date.now(),
        text,
        user: currentUser.email
    });

    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Load Posts
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postDiv = document.getElementById("posts");

    postDiv.innerHTML = "";

    posts.forEach(post => {
        if (post.user === currentUser.email) {
            postDiv.innerHTML += `
                <div class="post">
                    <p>${post.text}</p>
                    <button onclick="deletePost(${post.id})">Delete</button>
                    <button onclick="editPost(${post.id})">Edit</button>
                </div>
            `;
        }
    });
}

// Delete Post
function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(p => p.id !== id);

    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Edit Post
function editPost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === id);

    let newText = prompt("Edit your post:", post.text);

    if (newText) {
        post.text = newText;
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}