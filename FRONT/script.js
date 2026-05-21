const API_URL = "http://localhost:3000/courses";

const TOKEN = localStorage.getItem("token");

// ======================
// HELPERS
// ======================

const getInitials = (title) => {
  if (!title) return "C";

  return title
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

// ======================
// CREATE CARD
// ======================

const createCard = (course) => {
  const card = document.createElement("div");

  card.className = "card";

  const title = course.title || "No title";

  card.innerHTML = `
    <div class="card-avatar">
      ${getInitials(title)}
    </div>

    <div class="card-name">
      ${title}
    </div>

    <div class="card-major">
      Teacher: ${course.teacher || "Unknown"}
    </div>

    <div class="card-email">
      ${course.description || "No description"}
    </div>

    <span class="card-gpa">
      Credits ${course.credits ?? "N/A"}
    </span>

    <div style="margin-top:10px;">
      <button onclick="deleteCourse('${course._id}')">
        Delete
      </button>

      <button onclick="openEdit(
        '${course._id}',
        '${course.title || ""}',
        '${course.teacher || ""}',
        '${course.credits || ""}',
        '${course.description || ""}'
      )">
        Edit
      </button>
    </div>
  `;

  return card;
};

// ======================
// LOAD COURSES
// ======================

const loadCourses = async () => {
  const courseList = document.getElementById("Course-list");

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Unauthorized or server error");
    }

    const courses = await res.json();

    courseList.innerHTML = "";

    courses.forEach((course) => {
      courseList.appendChild(createCard(course));
    });

  } catch (error) {
    courseList.innerHTML = `
      <p class="error">${error.message}</p>
    `;

    console.error(error);
  }
};

loadCourses();

// ======================
// ADD COURSE
// ======================

const form = document.getElementById("Course-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const teacher = document.getElementById("teacher").value;
    const credits = parseFloat(
      document.getElementById("credits").value
    );

    const description =
      document.getElementById("description").value;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },

      body: JSON.stringify({
        title,
        teacher,
        credits,
        description,
      }),
    });

    form.reset();

    loadCourses();
  });
}

// ======================
// DELETE COURSE
// ======================

async function deleteCourse(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  loadCourses();
}

// ======================
// EDIT COURSE
// ======================

let currentId = null;

function openEdit(id, title, teacher, credits, description) {
  currentId = id;

  document.getElementById("editModal").style.display =
    "block";

  document.getElementById("editTitle").value = title;

  document.getElementById("editTeacher").value =
    teacher;

  document.getElementById("editCredits").value =
    credits;

  document.getElementById("editDescription").value =
    description;
}

function closeEdit() {
  document.getElementById("editModal").style.display =
    "none";
}

async function saveEdit() {
  const updatedData = {
    title: document.getElementById("editTitle").value,

    teacher:
      document.getElementById("editTeacher").value,

    credits: parseFloat(
      document.getElementById("editCredits").value
    ),

    description:
      document.getElementById("editDescription").value,
  };

  await fetch(`${API_URL}/${currentId}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },

    body: JSON.stringify(updatedData),
  });

  closeEdit();

  loadCourses();
}

// ======================
// LOGIN
// ======================

const loginForm =
  document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const email =
        document.getElementById("email").value;

      const password =
        document.getElementById("password").value;

      const res = await fetch(
        "http://localhost:3000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      localStorage.setItem("token", data.token);

      window.location.href = "index.html";
    }
  );
}

// ======================
// GLOBALS
// ======================

window.deleteCourse = deleteCourse;
window.openEdit = openEdit;
window.saveEdit = saveEdit;
window.closeEdit = closeEdit;