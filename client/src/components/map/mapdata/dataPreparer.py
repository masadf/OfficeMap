import json

is_scaling = False 
is_mooving = False
is_naming = True


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



with open('testroom.json') as f:
    data = json.load(f)

if is_scaling:
    scaling(30)
if is_mooving:
    mooving(0, -30)
if is_naming:
    for i in range(len(data["features"])):
        rename("Anton_DIBIL")

with open('testroom.json', 'w') as f:
    json.dump(data, f)

# -----------------------------------------------------------


with open('background.json') as f:
    data = json.load(f)

if is_scaling:
    scaling(30)
if is_mooving:
    mooving(0, -30)

with open('background.json', 'w') as f:
    json.dump(data, f)


