import matplotlib.pyplot as plt
from matplotlib import colors
import numpy as np
from update import payoff, update_population


def visualize_pop(pop_mat, save_file, plot_size = (8, 8), color_map = ['#5953ca', '#f02d4e']):
    """
    pop_mat: population matrix
    color_map: colors for cooperator and defector
    save_file: file to save the plot
    plot_size: canvas size
    """
    row_count, col_count = pop_mat.shape

    bounds = [0,1]
    norm = colors.BoundaryNorm(bounds, 2)

    fig, ax = plt.subplots(figsize=plot_size)
    cmap = colors.ListedColormap(color_map)
    ax.imshow(pop_mat, cmap=cmap, norm=norm) # create heatmap

    # add grid lines
    ax.grid(which='major', axis='both', linestyle='-', color='k', linewidth=2)
    ax.set_xticks(np.arange(-.5, row_count, 1))
    ax.set_yticks(np.arange(-.5, col_count, 1))
    ax.xaxis.set_ticklabels([])
    ax.xaxis.set_ticks_position('none')
    ax.yaxis.set_ticklabels([])
    ax.yaxis.set_ticks_position('none')

    plt.savefig(save_file, 
               bbox_inches='tight')
    plt.clf()

    return 1



if __name__ == "__main__":

    # np.set_printoptions(formatter={'float': lambda x: "{0:0.3f}".format(x)})
    payoff_mat = np.array([[1, 0], [1.5, 0]])
    population = np.zeros((7, 7), dtype=np.uint8)
    population[3, 3] = 1
    
    visualize_pop(population, 'pop_initial.png')

    for i in range(5):
        filename = 'pop_{}.png'.format(i+1)
        current_payoff = payoff(population, payoff_mat)
        population = update_population(population, current_payoff)
        visualize_pop(population, filename)
        
