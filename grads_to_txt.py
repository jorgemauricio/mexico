#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
#######################################
# Script para generar archivos txt
# de los archivos de salida del WRF
# Author: Jorge Mauricio
# Email: jorge.ernesto.mauricio@gmail.com
# Date: Created on Thu Sep 28 08:38:15 2017
# Version: 1.0
#######################################
"""

# librerías
import pandas as pd
import numpy as np
import os
import time
from time import gmtime, strftime

def main():
    # dia actual
    today = strftime("%Y-%m-%d")

    # variables
    arr_variables = ['temp','rh', 'tmax','rain','tsoil010','u','v','dewpoint', 'tmin']

    for variable in arr_variables:

        # leer archivo LAT1.txt
        file = open("/home/jorge/Documents/Research/mexico/LATLON/LAT1.txt", "r")
        f = file.read()
        lats = np.array(f.split())
        file.close()

        # leer archivo LON1.txt
        file = open("/home/jorge/Documents/Research/mexico/LATLON/LON1.txt", "r")
        f = file.read()
        lons = np.array(f.split())
        file.close()

        # crear dataframe
        df = pd.DataFrame()

        # agregar lons y lats al dataframe
        df["lats"] = lats
        df["lons"] = lons

        # ciclo de procesamiento de datos
        for i in range(6,126):
             # título del archivo
             titulo_archivo = "{}{}.txt".format(variable,i)
             print(titulo_archivo)
             # leer archvo temp
             if variable == 'rh':
                 file = open(titulo_archivo,"r")
                 f = file.read()
                 valores = np.array(f.split()[9:])
                 file.close()
                 print("*****",len(valores))
                 # agregar arreglo de valores al dataframe
                 df["{}{}".format(variable,i)] = valores
             else:
                 file = open(titulo_archivo,"r")
                 f = file.read()
                 valores = np.array(f.split())
                 file.close()
                 print("*****",len(valores))
                 # agregar arreglo de valores al dataframe
                 df["{}{}".format(variable,i)] = valores

        # exportar dataframe a csv
        df.to_csv("{}_{}.csv".format(today,variable), index=False)

        # mover archivo a folder
        comando = "mv /home/jorge/Documents/Research/mexico/{}_{}.csv /home/jorge/Documents/Research/mexico/data/{}".format(today, variable, today)
        os.system(comando)


if __name__ == '__main__':
    main()
