document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ SAVE TOKEN
    localStorage.setItem("token", data.token);

    // ✅ REDIRECT
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});