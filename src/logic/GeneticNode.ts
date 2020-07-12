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

  static getMatingPool(
    flattenedNodes: GeneticNode[],
    targetColor: [number, number, number]
  ): GeneticNode[] {
    let threshold = 0.2;
    this.sortByFitness(flattenedNodes, targetColor);
    return flattenedNodes.slice(
      0,
      Math.round(flattenedNodes.length * threshold)
    );
  }

  static sortByFitness(
    flattenedNodes: GeneticNode[],
    targetColor: [number, number, number]
  ) {
    flattenedNodes.sort((a, b) =>
      a.getDistanceFromTarget(targetColor) <
      b.getDistanceFromTarget(targetColor)
        ? -1
        : 1
    );
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

  mutateGradual(generationNumber: number) {
    this.mutate(
      generationNumber,
      (x: number) => x + this.getRandomInt(-50, 50)
    );
  }

  mutateInvert(generationNumber: number) {
    this.mutate(generationNumber, (x: number) => 255 - x);
  }

  private mutate(generationNumber: number, mutation: Function) {
    let mutationChance = this.getMutationChance(generationNumber);
    for (let i = 0; i < 3; i++) {
      let value = Math.random();
      if (value <= mutationChance) {
        //this.colorVector[i] = 255 - this.colorVector[i];
        this.colorVector[i] = mutation(this.colorVector[i]);
        if (this.colorVector[i] > 255) {
          this.colorVector[i] = 255;
        } else if (this.colorVector[i] < 0) {
          this.colorVector[i] = 0;
        }
      }
    }
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*
   * As the generation number goes up the mutation chance should be decreased.
   */
  getMutationChance(generationNumber: number) {
    let baseChance = 0.2;
    return baseChance / generationNumber;
  }
}
