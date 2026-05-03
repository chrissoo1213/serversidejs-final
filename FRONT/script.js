const API_URL = "http://localhost:3000/students";

// 🔐 paste your real token here
const TOKEN = localStorage.getItem("token");
const getInitials = (name) => {
  if (!name) return "?"; // 👈 prevent crash

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};



document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: name.value,
    email: email.value,
    major: major.value,
    gpa: parseFloat(gpa.value),
  };

  await fetch("http://localhost:3000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(student),
  });

  location.reload();
});


const createCard = (student) => {
	const card = document.createElement("div")
	card.className = "card"

	const name = student.name || "No name"

	card.innerHTML = `
		<div class="card-avatar">${getInitials(name)}</div>
		<div class="card-name">${name}</div>
		<div class="card-major">${student.major || "No major"}</div>
		<div class="card-email">${student.email}</div>
		<span class="card-gpa">GPA ${student.gpa ?? "N/A"}</span>

		<div style="margin-top:10px;">
			<button onclick="deleteStudent('${student._id}')">Delete</button>
			<button onclick="openEdit('${student._id}', '${student.name}', '${student.email}', '${student.major}', '${student.gpa}')">Edit</button>
		</div>
	`

	return card
}

async function deleteStudent(id) {
	const token = localStorage.getItem("token");

	await fetch(`http://localhost:3000/students/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	loadStudents();
}

let currentId = null;

function openEdit(id, name, email, major, gpa) {
	currentId = id;

	document.getElementById("editModal").style.display = "block";
	document.getElementById("editName").value = name;
	document.getElementById("editEmail").value = email;
	document.getElementById("editMajor").value = major;
	document.getElementById("editGpa").value = gpa;
}

function closeEdit() {
	document.getElementById("editModal").style.display = "none";
}

async function saveEdit() {
	const token = localStorage.getItem("token");

	const updatedData = {
		name: document.getElementById("editName").value,
		email: document.getElementById("editEmail").value,
		major: document.getElementById("editMajor").value,
		gpa: parseFloat(document.getElementById("editGpa").value),
	};

	await fetch(`http://localhost:3000/students/${currentId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(updatedData),
	});

	closeEdit();
	loadStudents();
}

const loadStudents = async () => {
  const studentList = document.getElementById("student-list");

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) throw new Error("Unauthorized or server error");

    const students = await res.json();

    studentList.innerHTML = "";

    students.forEach((student) => {
      studentList.appendChild(createCard(student));
    });

  } catch (error) {
    studentList.innerHTML = `<p class="error">${error.message}</p>`;
    console.error(error);
  }
};

loadStudents();


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  localStorage.setItem("token", data.token);

  window.location.href = "index.html";
});


const form = document.getElementById("student-form");

if (form) {
	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const name = form[0].value;
		const email = form[1].value;
		const major = form[2].value;
		const gpa = parseFloat(form[3].value);

		const token = localStorage.getItem("token");

		await fetch("http://localhost:3000/students", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name, email, major, gpa }),
		});

		loadStudents();
	});
}

window.deleteStudent = deleteStudent;
window.openEdit = openEdit;
window.saveEdit = saveEdit;
window.closeEdit = closeEdit;