import json

from matplotlib.pyplot import sca

is_scaling = False
is_mooving = True
is_naming = False 
is_color = False

scale = 30
moove_x = 0
moove_y = 10

fname_rooms = ""
fname_back  = ""

def scaling(scale_factor):
    for feature in data["features"]:
        for pair_coord in feature["geometry"]["coordinates"][0]:
            pair_coord[0] *= scale_factor
            pair_coord[1] *= scale_factor

def mooving(moove_factor_x, moove_factor_y):
    for feature in data["features"]:
        for pair_coord in feature["geometry"]["coordinates"][0]:
            pair_coord[0] += moove_factor_x
            pair_coord[1] += moove_factor_y

def rename(new_name):
    for feature in data["features"]:
        feature["properties"]["name"] = new_name

def recolor(change_color):
    for feature in data["features"]:
        feature["properties"]["fill"] = change_color 


with open(fname_rooms) as f:
    data = json.load(f)

if is_scaling:
    scaling(scale)
if is_mooving:
    mooving(moove_x, moove_y)
if is_naming:
    for i in range(len(data["features"])):
        rename("Anton_DIBIL")

with open(fname_rooms, 'w') as f:
    json.dump(data, f)

# -----------------------------------------------------------


with open(fname_back) as f:
    data = json.load(f)

if is_scaling:
    scaling(scale)
if is_mooving:
    mooving(moove_x, moove_y)
if is_color:
    recolor("#999999")

with open(fname_back, 'w') as f:
    json.dump(data, f)


