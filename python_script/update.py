import numpy as np


def payoff(pop_status, pmat):
    """
    pop_status: current population grid
    pmat: two by two grid with payoffs for cooperator(0) and defector(1)
    """

    row_count, col_count = pop_status.shape
    # add symmetric padding
    pop_status_mirrored = np.pad(pop_status, 1, 'reflect')
    output_mat = np.zeros((row_count, col_count))

    for rowid in np.arange(1, row_count+1):
        for colid in np.arange(1, col_count + 1):

            indv_type = pop_status_mirrored[rowid, colid]
            neighbours_type = pop_status_mirrored[(rowid-1):(rowid+2), (colid-1):(colid+2)].flatten()
            rewards = np.sum(pmat[indv_type, neighbours_type])
            output_mat[rowid-1, colid-1] = rewards
    
    return output_mat


def update_population(pop_status, payoff_vals):
    """
    pop_status: current population status
    payoff_vals: calculated payoff values
    """
    row_count, col_count = pop_status.shape
    # add symmetric padding
    pop_status_mirrored = np.pad(pop_status, 1, 'reflect')
    payoff_vals_mirrored = np.pad(payoff_vals, 1, 'reflect')

    new_pop = np.zeros((row_count, col_count), dtype=np.uint8)

    for rowid in np.arange(1, row_count+1):
        for colid in np.arange(1, col_count + 1):
            neighbourhood = pop_status_mirrored[(rowid - 1):(rowid + 2), (colid - 1):(colid + 2)].flatten()
            payoffs_neighbours = payoff_vals_mirrored[(rowid - 1):(rowid + 2), (colid - 1):(colid + 2)].flatten()
            new_pop[rowid - 1, colid - 1] = neighbourhood[np.argmax(payoffs_neighbours)]
        
    return new_pop


