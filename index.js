// required modules
const fs = require("fs");
const path = require("path");

console.log("running the app...");

// Step 1: Read JSON file
const coursesData = fs.readFileSync(
  path.join(__dirname, "course.json"),
  "utf-8"
);

// Step 2: Parse JSONR
const courses = JSON.parse(coursesData);

// Step 3: Build Markdown content
let markdownContent = "# Course Report\n\n";
markdownContent += `Generated on: ${new Date().toLocaleString()}\n\n`;
markdownContent += `## Summary\n\nTotal courses: ${courses.length}\n\n`;

// Step 4: Loop through courses
courses.forEach((course) => {
  markdownContent += `### ${course.name}\n`;
  markdownContent += `- **Teacher:** ${course.teacher}\n`;
  markdownContent += `- **Grade:** ${course.grade}\n`;
});

// Step 5: Output path
const outputPath = path.join(__dirname, "course_report.md");

// Step 6: Write file
fs.writeFileSync(outputPath, markdownContent, "utf-8");

// Step 7: Confirmation
console.log(`Report generated: ${outputPath}`);