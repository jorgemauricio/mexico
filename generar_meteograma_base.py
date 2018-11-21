import pandas as pd
import numpy as np
from time import gmtime, strftime
import glob

df = pd.read_csv("meteograma_datos.csv")

with open("meteograma_texto_base.gs", "r") as f:
    texto = f.read()

for index, row in df.iterrows():
    texto_agregar = "function main(args) \nname='{}' \nhour=00 \nhilon={} \nhilat={}".format(row["Ciudad"],
                                                                                               row["Lon"],
                                                                                               row["Lat"])
    texto_resultado = texto_agregar + "\n" + texto

    titulo_archivo = "generar_meteograma_{}.gs".format(row["Ciudad"])

    file = open(titulo_archivo, "w")
    file.write(texto_resultado)
    file.close()


archivos = glob.glob("generar_meteograma_*.gs")
texto_final = "#!/bin/bash\n # exportar librerias \nexport GADDIR=/usr1/uems/util/grads/data \nexport GASCRP=/usr1/uems/util/grads/scripts \n#today \ntoday=\"$(date '+%Y-%m-%d')\" \nnombre_evento=\"mexico\"\n\n"
for archivo in archivos:
    texto_temporal = "/usr1/uems/util/grads/bin/grads -bpcx /home/jorge/Documents/Research/$nombre_evento/{}\n".format(archivo)
    texto_final = texto_final + texto_temporal

file2 = open("comandos_generar_meteogramas.sh", "w")
file2.write(texto_final)
file2.close()
