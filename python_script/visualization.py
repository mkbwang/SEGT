import matplotlib.pyplot as plt
from matplotlib import colors
import matplotlib.animation as animation
import numpy as np


def export_anime(slides, filename, plot_size = (8, 8), color_map = ['#5953ca', '#f02d4e'], interval=50):
    """
    slides: list of arenas to plot
    filename: mp4 filename to export
    plot_size: canvas size
    color_map: colors for cooperator and defector
    interval: time interval between slides
    """

    row_count, col_count = slides[0].shape

    # set the figure and the colormap
    bounds = [0,1]
    norm = colors.BoundaryNorm(bounds, 2)
    plt.autoscale(tight=True)
    fig, ax = plt.subplots(figsize=plot_size)
    cmap = colors.ListedColormap(color_map)

    # set the grids
    ax.set_xticks(np.arange(-.5, row_count, 1))
    ax.set_yticks(np.arange(-.5, col_count, 1))
    ax.xaxis.set_ticklabels([])
    ax.xaxis.set_ticks_position('none')
    ax.yaxis.set_ticklabels([])
    ax.yaxis.set_ticks_position('none')
    ax.grid(which='major', axis='both', linestyle='-', color='k', linewidth=2)
    
    ims = []

    for i in range(len(slides)):
        ims.append((ax.imshow(slides[i], cmap=cmap, norm=norm),))

    fig.tight_layout()

    Writer = animation.writers['ffmpeg']
    writer = Writer(fps=int(1000/interval), metadata=dict(artist='Me'), bitrate=1800)
    ani = animation.ArtistAnimation(fig, ims, interval=interval, repeat=False,
                                           blit=True)        

    ani.save(filename, writer=writer)

