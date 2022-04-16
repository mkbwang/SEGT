from update import *
import numpy as np

def DinvadeC(arena_size = (15, 15), payoffmat = np.array([[1,0], [1.5, 0]]),
            iteration = 7):
    """
    arena_size: size of the square arena
    payoff_mat: payoff matrix
    duration: animation duration
    """

    slides = []
    num_row, num_col = arena_size

    # specify initial condition of defector invading cooperator
    arena = np.zeros(arena_size, dtype=np.uint8)
    arena[int(num_row // 2), int(num_col // 2)] = 1

    return evolution(arena, payoffmat, iteration)

