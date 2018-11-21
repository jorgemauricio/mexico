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
    today = strftime("%Y-%m-%d_12")

    # variables
    arr_variables = ['rain','temp','tmax','tmin','rh','dewpoint', 'tsoil010']

    for i in range(1,6):

        # Crear dataFrame
        df = pd.DataFrame()

        # leer archivo LAT1.txt
        file = open("/home/jorge/Documents/Research/mexico/LATLON/dLAT1.txt", "r")
        f = file.read()
        lats = np.array(f.split())
        file.close()

        df["lats"] = lats

        # leer archivo LON1.txt
        file = open("/home/jorge/Documents/Research/mexico/LATLON/dLON1.txt", "r")
        f = file.read()
        lons = np.array(f.split())
        file.close()

        # agregar lons y lats al dataframe
        df["lons"] = lons

        for variable in arr_variables:

            # título del archivo
            titulo_archivo = "{}_d{}.txt".format(variable,i)

            print(titulo_archivo)
            # leer archvo temp
            file = open(titulo_archivo,"r")
            f = file.read()
            valores = np.array(f.split())
            file.close()

            df[variable] = valores

            # exportar dataframe a csv
        df.to_csv("d{}.csv".format(i), index=False)

        # mover archivo a folder
        comando = "mv /home/jorge/Documents/Research/mexico/d{}.csv /home/jorge/Documents/Research/mexico/data/{}".format(i, today)
        os.system(comando)


if __name__ == '__main__':
    main()
