/**
 * The individuals in the population.
 */
export default class GeneticNode {
  colorVector: [number, number, number];
  constructor() {
    // Initialize to white.
    this.colorVector = [255, 255, 255];
  }

  /**
   * Offspring's colorVector determined by linear interpolation between both
   * parents' color vectors. This is done for each color channel.
   *
   * @param parent1  The first parent
   * @param parent2  The second parent
   *
   * @returns The offspring of the two parents
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

  /**
   * Selects the top matingPoolPercent of the population based on fitness.
   *
   * @param nodes  The genetic nodes to select from
   * @param targetColor  The color to optimize for
   * @param matingPoolPercent  The percent of population chosen for mating
   *
   * @returns The nodes that will be used for mating
   */
  static getMatingPool(
    nodes: GeneticNode[],
    targetColor: [number, number, number],
    matingPoolPercent: number
  ): GeneticNode[] {
    this.sortByFitness(nodes, targetColor);
    return nodes.slice(0, Math.round(nodes.length * matingPoolPercent));
  }

  /**
   * Sorts the nodes by fitness, decsecnding.
   */
  static sortByFitness(
    nodes: GeneticNode[],
    targetColor: [number, number, number]
  ) {
    nodes.sort((a, b) =>
      a.getDistanceFromTarget(targetColor) <
      b.getDistanceFromTarget(targetColor)
        ? -1
        : 1
    );
  }

  /**
   * Used to determine the fitness of an individual by computing the
   * euclidean distance between the node's color vector and the target color
   * vector. Smaller number implies more fit.
   *
   * @param targetColor  The color to optimize for
   *
   * @returns The euclidean distance between this.colorVector and targetColor
   */
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

  /**
   * Mutation function that adds a value between -50 and 50 to a color channel.
   *
   * @param generationNumber  The generation number
   * @param mutationChance  The chance of mutation
   *
   * @returns The updated mutation chance
   */
  mutateGradual(generationNumber: number, mutationChance: number): number {
    return this.mutate(
      generationNumber,
      mutationChance,
      (x: number) => x + this.getRandomInt(-50, 50)
    );
  }

  /**
   * Mutation function that inverts a color channel.
   *
   * @param generationNumber  The generation number
   * @param mutationChance  The chance of mutation
   *
   * @returns The updated mutation chance
   */
  mutateInvert(generationNumber: number, mutationChance: number): number {
    return this.mutate(
      generationNumber,
      mutationChance,
      (x: number) => 255 - x
    );
  }

  /**
   * Executes mutation function onto each colour channel if a mutation occurs.
   *
   * @param generationNumber  The generation number
   * @param mutationChance  The chance of mutation
   * @param mutation  The function to be used for mutation
   *
   * @returns The updated mutation chance
   */
  private mutate(
    generationNumber: number,
    mutationChance: number,
    mutation: Function
  ): number {
    mutationChance = this.getMutationChance(mutationChance, generationNumber);
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
    return mutationChance;
  }

  /**
   * Gets a pseudo random integer between the given range.
   *
   * @param min  The lower bound inclusive
   * @param max The upper bound inclusive
   *
   * @returns The pseudo random number
   */
  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * As the generation number goes up the mutation chance should be decreased.
   * If generationNumber is -1 then it is implied that the user doesn't want to
   * lower the mutation value as generation increase.
   *
   * @param mutationChance The chance of mutation
   * @param generationNumber  The generation number
   *
   * @returns The updated mutation chance
   */
  private getMutationChance(
    mutationChance: number,
    generationNumber: number
  ): number {
    if (generationNumber !== -1) {
      return mutationChance / generationNumber;
    }
    return mutationChance;
  }
}
