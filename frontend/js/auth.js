const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // this is IMPORTANT for cookies
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    if (res.ok) {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert(result.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Try again.");
  }
});


// Only run this if we're on dashboard.html
if (window.location.pathname.includes("dashboard.html")) {
  fetch("http://localhost:5000/api/dashboard", {
    method: "GET",
    credentials: "include", // so the cookie (JWT) is sent
  })
    .then(async (res) => {
      if (!res.ok) {
        window.location.href = "login.html"; // redirect if not logged in
      } else {
        const data = await res.json();
        document.getElementById("userInfo").textContent = `Hello, ${data.user.fullName}`;
      }
    })
    .catch((err) => {
      console.error("Auth check failed", err);
      window.location.href = "login.html";
    });

  // Logout button handler
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "GET",
        credentials: "include"
      });
      window.location.href = "login.html";
    } catch (err) {
      console.error("Logout failed", err);
    }
  });
}


// Only run this if we're on register.html
if (window.location.pathname.includes("register.html")) {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        window.location.href = "index.html"; // redirect to login
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error", err);
      alert("Something went wrong");
    }
  });
}