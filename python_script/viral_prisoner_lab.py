import numpy as np
import random
import matplotlib.pyplot as plt


if __name__ == "__main__":
    payoff_matrix = [[1.00, 0],
                 [0.8, 0]]

    COOPERATOR = 0
    DEFECTOR = 1

    virus_pop_size = 3000
    cell_pop_size = 50
    num_gens = 50
    reps = 9

    traces = np.zeros((reps, num_gens + 1))

    for j in range(reps):

        initial_weights = [(j+1)/10, 1-(j+1)/10]
        virus_population = random.choices([COOPERATOR, DEFECTOR], weights=initial_weights, k=virus_pop_size)

        np.random.shuffle(virus_population)
        viral_subpops = np.array_split(virus_population, cell_pop_size)

        traces[j, 0] = sum(virus_population)/virus_pop_size

        for i in range(num_gens):
            
            #Randomly shuffle the viruses
            np.random.shuffle(virus_population)

            #keep track of viral fitness
            virus_pop_fitnesses = []

            #Distribute the viruses to their host cells
            #(n.b., this keeps the order intact in the splits)
            viral_subpops = np.array_split(virus_population, cell_pop_size)


            #Calculate fitness for each virus
            for subpop in viral_subpops:
                type_counts = {COOPERATOR:np.count_nonzero(subpop==COOPERATOR), DEFECTOR:np.count_nonzero(subpop==DEFECTOR)}
                total_payoffs = [payoff_matrix[individual][COOPERATOR]*type_counts[COOPERATOR]+
                                payoff_matrix[individual][DEFECTOR]*type_counts[DEFECTOR] 
                                for individual in subpop]

                virus_pop_fitnesses += total_payoffs

            #Build the next viral generation by sampling with weights assigned by their fitness
            next_virus_pop = random.choices(virus_population, weights=virus_pop_fitnesses, k=virus_pop_size)

            virus_population = next_virus_pop

            prop_cheaters = sum(virus_population)/virus_pop_size
            traces[j, i+1] = prop_cheaters

    fig, ax = plt.subplots(figsize=(6, 4.5))
    for j in range(reps):
        ax.plot(np.arange(0, 51), traces[j, :])
    ax.set_xlim([0, 50])
    ax.xaxis.set_ticks(np.arange(0, 55, 5))
    ax.set_ylim([0, 1])
    ax.yaxis.set_ticks(np.arange(0, 1.1, 0.1))
    ax.set_xlabel("Generation")
    ax.set_ylabel("Proportion of Defectors")

    fig.savefig("viralprisoner_2.png", bbox_inches="tight")
