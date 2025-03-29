// Define a point with x and y coordinates
export interface Point {
  x: number;
  y: number;
}

// Define a color with RGB values
export interface Color {
  r: number;
  g: number;
  b: number;
}

// Define the methods that a Turtle should have
export interface Turtle {
  forward(distance: number): void;   // Move forward by a given distance
  turn(angle: number): void;         // Turn the turtle by a given angle
  color(c: Color): void;             // Set the color of the turtle's path
  getPath(): { start: Point; end: Point; color: Color }[];  // Get the path of the turtle (as a list of segments)
}

// SimpleTurtle implements the Turtle interface with basic drawing functionality
export class SimpleTurtle implements Turtle {
  private x: number = 0;  // Current x position of the turtle
  private y: number = 0;  // Current y position of the turtle
  private angle: number = 0;  // Current angle of the turtle in degrees
  private path: { start: Point; end: Point; color: Color }[] = [];  // List of path segments
  private currentColor: Color = { r: 0, g: 0, b: 0 };  // Default color (black)

  // Move the turtle forward by a given distance and record the path
  forward(distance: number): void {
    const radians = (this.angle * Math.PI) / 180;  // Convert angle to radians
    const newX = this.x + distance * Math.cos(radians);  // Calculate the new x position
    const newY = this.y + distance * Math.sin(radians);  // Calculate the new y position

    // Record the path segment from the current position to the new position
    this.path.push({
      start: { x: this.x, y: this.y },
      end: { x: newX, y: newY },
      color: this.currentColor,  // Store the current color of the turtle
    });

    // Update the turtle's current position
    this.x = newX;
    this.y = newY;
  }

  // Turn the turtle by a given angle (positive for counterclockwise, negative for clockwise)
  turn(angle: number): void {
    this.angle += angle;  // Adjust the turtle's angle
  }

  // Set the turtle's drawing color
  color(c: Color): void {
    this.currentColor = c;  // Update the turtle's current color
  }

  // Return the path the turtle has taken as an array of segments
  getPath(): { start: Point; end: Point; color: Color }[] {
    return this.path;
  }
}
