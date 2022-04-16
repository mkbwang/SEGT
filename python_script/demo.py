from visualization import export_anime
from scenario import DinvadeC



if __name__ == "__main__":

    results = DinvadeC(arena_size=(10, 10), iteration=8)
    export_anime(results, 'DinvadeC.mp4', interval=1000)

