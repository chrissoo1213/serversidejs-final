// required modules
const fs = require("fs");
const path = require("path");

console.log("running the app...");

// Step 1: Read JSON file
const studentsData = fs.readFileSync(
  path.join(__dirname, "students.json"),
  "utf-8"
);

// Step 2: Parse JSON
const students = JSON.parse(studentsData);

// Step 3: Build Markdown content
let markdownContent = "# Student Report\n\n";
markdownContent += `Generated on: ${new Date().toLocaleString()}\n\n`;
markdownContent += `## Summary\n\nTotal Students: ${students.length}\n\n`;

// Step 4: Loop through students
students.forEach((student) => {
  markdownContent += `### ${student.name}\n`;
  markdownContent += `- **Email:** ${student.email}\n`;
  markdownContent += `- **Major:** ${student.major}\n`;
  markdownContent += `- **GPA:** ${student.gpa}\n`;
  markdownContent += `- **ID:** ${student.id}\n\n`;
});

// Step 5: Output path
const outputPath = path.join(__dirname, "student_report.md");

// Step 6: Write file
fs.writeFileSync(outputPath, markdownContent, "utf-8");

// Step 7: Confirmation
console.log(`Report generated: ${outputPath}`);