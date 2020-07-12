export default class GeneticNode {
  colorVector: [number, number, number];
  constructor() {
    // Initialize to white.
    this.colorVector = [255, 255, 255];
  }

  /**
   * Offspring's colorVector determined by linear interpolation between both
   * parents' color vectors. This is done for each color channel.
   */
  static crossover(parent1: GeneticNode, parent2: GeneticNode): GeneticNode {
    let offspring = new GeneticNode();
    for (let i = 0; i < 3; i++) {
      let parent1Influence = Math.random();
      offspring.colorVector[i] =
        parent1.colorVector[i] * parent1Influence +
        parent2.colorVector[i] * (1 - parent1Influence);
    }
    return offspring;
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
      }, 0)
    );
  }

  mutate(generationNumber: number) {
    let mutationChance = this.getMutationChance(generationNumber);
    for (let i = 0; i < 3; i++) {
      let value = Math.random();
      if (value <= mutationChance) {
        this.colorVector[i] = 255 - this.colorVector[i];
        if (this.colorVector[i] > 255) {
          this.colorVector[i] = 255;
        } else if (this.colorVector[i] < 0) {
          this.colorVector[i] = 0;
        }
      }
    }
  }

  getMutationChance(generationNumber: number) {
    let baseChance = 0.3;
    return baseChance / generationNumber;
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
