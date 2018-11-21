import pandas as pd
import numpy as np
from time import gmtime, strftime
import glob

df = pd.read_csv("meteograma_datos.csv")

file = open("codigo_pagina.txt", "w")
texto_resultado = ""

for index, row in df.iterrows():

    texto_value="{}".format(row["Ciudad"])
    texto_pop = "{}".format(row["Ciudad"].replace("_"," "))
    texto_agregar = "<option value=\"{}\">{}</option>\n".format(texto_value,texto_pop)

    texto_resultado = texto_resultado + texto_agregar

file.write(texto_resultado)
file.close()
