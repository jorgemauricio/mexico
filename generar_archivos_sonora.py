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
    #today = strftime("%Y-%m-%d")
    today = "2018-10-12"
    # variables
    arr_variables = ['temp','rh', 'tmax','rain','tsoil010','u','v','dewpoint', 'tmin']

    for variable in arr_variables:

        titulo_archivo = "/home/jorge/Documents/Research/mexico/data/{}/{}_{}.csv".format(today,today, variable)

        # crear dataframe
        df = pd.read_csv(titulo_archivo)

        # filtrar información
        df = df.where((df["lons"] > -115.65) & (df["lons"] < -107.94) & (df["lats"] > 25.4) & (df["lats"] < 33.06)).dropna()

        # exportar dataframe a csv
        df.to_csv("/home/jorge/Documents/Research/mexico/data/{}/sonora_{}_{}.csv".format(today, today,variable), index=False)



if __name__ == '__main__':
    main()
