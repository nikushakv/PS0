import * as fs from "fs";
import { execSync } from "child_process";
import { SimpleTurtle } from "../src/turtle";
import { drawSquare, drawApproximateCircle, drawPersonalArt, generateHTML } from "../src/turtlesoup";

// Save the generated HTML content to a file
function saveHTMLToFile(htmlContent: string, filename: string = "output.html"): void {
  try {
    fs.writeFileSync(filename, htmlContent);
    console.log(`Drawing saved to ${filename}`);
  } catch (error) {
    console.error("Error saving HTML to file:", error);
  }
}

// Open the generated HTML file in the default browser based on the OS
function openHTML(filename: string = "output.html"): void {
  try {
    execSync(`open ${filename}`); // macOS
  } catch {
    try {
      execSync(`start ${filename}`); // Windows
    } catch {
      try {
        execSync(`xdg-open ${filename}`); // Linux
      } catch (error) {
        console.error("Could not open the file automatically:", error);
        console.log("Please open the file manually at:", filename);
      }
    }
  }
}

// Main function that controls the drawing process
function main(): void {
  try {
    const turtle = new SimpleTurtle();

    // Draw a square with a side length of 100
    drawSquare(turtle, 100);

    // Draw an approximate circle with radius 50 and 36 sides
    drawApproximateCircle(turtle, 50, 36);

    // Draw personal art with creative patterns
    drawPersonalArt(turtle);

    // Generate HTML content representing the turtle's path
    const htmlContent = generateHTML(turtle.getPath());

    // Save the HTML content to a file
    saveHTMLToFile(htmlContent);

    // Attempt to open the HTML file in the default browser
    openHTML();
  } catch (error) {
    console.error("An error occurred during the drawing process:", error);
  }
}

// Execute the main function when this file is executed directly
if (require.main === module) {
  main();
}
