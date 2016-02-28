def size_display(size):
    size = size
    size_display = 0
    size_unit = ''
    if size > 1024 and size < 1024 **2:
        size_display = size / 1024
        size_unit = 'KB'
    elif size > (1024 ** 2) and size < ((1024**2)* 1024):
        size_display = size / 1024 / 1024
        size_unit = 'MB'
    elif size > ((1024**2)* 1024):
        size_display = size / 1024 /1024 /1024
        size_unit = 'GB'

    return size_display, size_unit

