export default class GeneticNode {
  private colorVector: [number, number, number];
  constructor() {
    // Initialize to white.
    this.colorVector = [255, 255, 255];
  }

  // Used as the fitness in this case, smaller number -> more fit.
  getDistanceFromTarget(targetColor: [number, number, number]): number {
    let difference = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      difference[i] = targetColor[i] - this.colorVector[i];
    }
    return Math.sqrt(
      difference.reduce((result, item) => {
        return result + Math.pow(item, 2);
      })
    );
  }
}
