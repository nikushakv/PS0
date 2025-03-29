import { Turtle, Color, Point } from "./turtle";

// Draw a square with the specified side length
export function drawSquare(turtle: Turtle, sideLength: number): void {
  for (let i = 0; i < 4; i++) {
    turtle.forward(sideLength);
    turtle.turn(90);
  }
}

// Calculate the chord length for a given radius and angle
function chordLength(radius: number, angleInDegrees: number): number {
  const radians = (Math.PI / 180) * angleInDegrees;
  return 2 * radius * Math.sin(radians / 2);
}

// Draw an approximate circle by connecting multiple line segments
export function drawApproximateCircle(
  turtle: Turtle,
  radius: number,
  numSides: number
): void {
  const sideLength = chordLength(radius, 360 / numSides);
  for (let i = 0; i < numSides; i++) {
    turtle.forward(sideLength);
    turtle.turn(360 / numSides);
  }
}

// Draw personal art with a series of colored lines forming a star-like pattern
export function drawPersonalArt(turtle: Turtle): void {
  for (let i = 0; i < 10; i++) {
    turtle.color({ r: i * 25, g: 255 - i * 25, b: i * 15 });
    turtle.forward(50 + i * 10);
    turtle.turn(144);  // Turn to create the star-like pattern
  }
}

// Generate HTML content to display the drawing in an SVG format
export function generateHTML(
  pathData: { start: Point; end: Point; color: Color }[]
): string {
  const canvasWidth = 500;
  const canvasHeight = 500;
  const scale = 1;
  const offsetX = canvasWidth / 2;
  const offsetY = canvasHeight / 2;

  let pathStrings = "";
  // Loop through pathData and create SVG line elements for each segment
  for (const segment of pathData) {
    const x1 = segment.start.x * scale + offsetX;
    const y1 = segment.start.y * scale + offsetY;
    const x2 = segment.end.x * scale + offsetX;
    const y2 = segment.end.y * scale + offsetY;
    pathStrings += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgb(${segment.color.r}, ${segment.color.g}, ${segment.color.b})" stroke-width="2"/>`;
  }

  return `<!DOCTYPE html>
<html>
<head>
    <title>Turtle Graphics Output</title>
    <style>
        body { margin: 0; }
        svg { display: block; }
    </style>
</head>
<body>
    <svg width="${canvasWidth}" height="${canvasHeight}" style="background-color:#f0f0f0;">
        ${pathStrings}
    </svg>
</body>
</html>`;
}
