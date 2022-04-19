from update import *
import numpy as np

def DinvadeC(arena_size = (15, 15), payoffmat = np.array([[1,0], [1.5, 0]]),
            iteration = 7):
    """
    arena_size: size of the square arena
    payoff_mat: payoff matrix
    duration: animation duration
    """

    num_row, num_col = arena_size

    # specify initial condition of defector invading cooperator
    arena = np.zeros(arena_size, dtype=np.uint8)
    arena[int(num_row // 2), int(num_col // 2)] = 1

    return evolution(arena, payoffmat, iteration)

def DinvadeC_line(arena_size = (15, 15), payoffmat = np.array([[1,0], [1.5, 0]]),
            iteration = 7):
    """
    arena_size: size of the square arena
    payoff_mat: payoff matrix
    duration: animation duration
    """

    num_row, _ = arena_size

    # specify initial condition of defector invading cooperator
    arena = np.zeros(arena_size, dtype=np.uint8)
    arena[int(num_row // 2), :] = 1

    return evolution(arena, payoffmat, iteration)


def CinvadeD(arena_size = (15, 15), payoffmat = np.array([[1,0], [1.5, 0]]),iteration = 7):
    num_row, num_col = arena_size
    # specify initial condition of cooperator invading defector
    arena = np.ones(arena_size, dtype=np.uint8)
    rowid = int(num_row // 2) - 1
    colid = int(num_col // 2) - 1
    arena[rowid:(rowid+2), colid:(colid+2)] = 0

    return evolution(arena, payoffmat, iteration)

# this one has problem
def CinvadeD_glider(arena_size = (15, 15), payoffmat = np.array([[1,0], [1.5, 0]]),iteration = 7):
    num_row, num_col = arena_size
    arena = np.ones(arena_size, dtype=np.uint8)
    colid = int(num_col // 2) - 2
    rowid = int(num_row // 2) - 4
    arena[rowid, colid:(colid+5)] = 0 
    arena[rowid+1, colid:(colid+4)] = 0
    arena[(rowid+2):(rowid+4), colid] = 0

    return evolution(arena, payoffmat, iteration) 


def CinvadeD_grower(arena_size = (15, 15), payoffmat = np.array([[1,0], [1.5, 0]]),iteration = 7):
    num_row, num_col = arena_size
    arena = np.ones(arena_size, dtype=np.uint8)
    rowid = int(num_row // 2) - 3
    colid = int(num_col // 2) - 2
    arena[rowid, (colid-2): (colid+2)] = 0
    arena[(rowid+1):(rowid+4), colid:(colid+2)] = 0

    return evolution(arena, payoffmat, iteration) 
