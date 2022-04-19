from visualization import export_anime
from scenario import *
import numpy as np


if __name__ == "__main__":

    # D invade C

    payoff_mat_1 = np.array([[1, 0], [1.25, 0]])
    results = DinvadeC(arena_size=(10, 10), payoffmat= payoff_mat_1, iteration=8)
    export_anime(results, 'DinvadeC_1.25.mp4', interval=1000)

    payoff_mat_2 = np.array([[1, 0], [1.5, 0]])
    results = DinvadeC(arena_size=(10, 10), payoffmat= payoff_mat_2, iteration=8)
    export_anime(results, 'DinvadeC_1.5.mp4', interval=1000)

    payoff_mat_3 = np.array([[1, 0], [1.9, 0]])
    results = DinvadeC(arena_size=(41, 41), payoffmat= payoff_mat_3, iteration=18)
    export_anime(results, 'DinvadeC_1.9.mp4', interval=1000)

    payoff_mat_4 = np.array([[1, 0], [1.7, 0]])
    results = DinvadeC_line(arena_size=(11, 11), payoffmat= payoff_mat_4, iteration=8)
    export_anime(results, 'DinvadeC_line_1.7.mp4', interval=1000)

    payoff_mat_5 = np.array([[1,0], [1.5,0]])
    results = CinvadeD(arena_size=(30, 30), payoffmat=payoff_mat_5, iteration=8)
    export_anime(results, 'CinvadeD_1.5.mp4', interval=1000)

    payoff_mat_6 = np.array([[1,0], [1.5,0]])
    results = CinvadeD_glider(arena_size=(19, 19), payoffmat=payoff_mat_6, iteration=10)
    export_anime(results, 'CinvadeD_glider_1.5.mp4', interval=1000)

    payoff_mat_7 = np.array([[1, 0], [1.9, 0]])
    results = CinvadeD_grower(arena_size=(20, 20), payoffmat=payoff_mat_7, iteration=10)
    export_anime(results, 'CinvadeD_grower_1.9.mp4', interval=1000)
