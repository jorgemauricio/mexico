* cargar el archivo wrfout
'open wrfout.ctl'
* comenzar dia 1
'run color_bar.gs'
'set clevs -2 0 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50'
'set ccols 300 301 302 303 304 305 306 307 308 309 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'UC = ave((tmax2m+tmin2m/2-12),t=6,t=29)'
'd UC'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 6'
'q time'
fecha1=substr(result, 8,12)
'set t 29'
'q time'
fecha2=substr(result, 8,12)
'draw title Humedad Relativa (%)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim rh_d1.png x1024 y1024 white'
'set gxout print'
'fprintf UC rh_d1.txt %g 253 1'
'clear'
'reset'

* comenzar dia 2
'run color_bar.gs'
'set clevs 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
'set ccols 600 601 602 603 604 605 606 607 608 609 610 611 612 613 614 615 616'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'UC = ((tmax2m+tmin2m/2-12),t=30,t=53)'
'd UC'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 30'
'q time'
fecha1=substr(result, 8,12)
'set t 53'
'q time'
fecha2=substr(result, 8,12)
'draw title Humedad Relativa (%)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim rh_d2.png x1024 y1024 white'
'set gxout print'
'fprintf UC rh_d2.txt %g 253 1'
'clear'
'reset'

* comenzar dia 3
'run color_bar.gs'
'set clevs 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
'set ccols 600 601 602 603 604 605 606 607 608 609 610 611 612 613 614 615 616'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'UC = ((tmax2m+tmin2m/2-12),t=54,t=77)'
'd UC'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 54'
'q time'
fecha1=substr(result, 8,12)
'set t 77'
'q time'
fecha2=substr(result, 8,12)
'draw title Humedad Relativa (%)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim rh_d3.png x1024 y1024 white'
'set gxout print'
'fprintf UC rh_d3.txt %g 253 1'
'clear'
'reset'

* comenzar dia 4
'run color_bar.gs'
'set clevs 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
'set ccols 600 601 602 603 604 605 606 607 608 609 610 611 612 613 614 615 616'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'UC = ((tmax2m+tmin2m/2-12),t=78,t=101)'
'd UC'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 78'
'q time'
fecha1=substr(result, 8,12)
'set t 101'
'q time'
fecha2=substr(result, 8,12)
'draw title Humedad Relativa (%)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim rh_d4.png x1024 y1024 white'
'set gxout print'
'fprintf UC rh_d4.txt %g 253 1'
'clear'
'reset'


* comenzar dia 5
'run color_bar.gs'
'set clevs 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
'set ccols 600 601 602 603 604 605 606 607 608 609 610 611 612 613 614 615 616'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'UC = ((tmax2m+tmin2m/2-12),t=102,t=125)'
'd UC'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 102'
'q time'
fecha1=substr(result, 8,12)
'set t 125'
'q time'
fecha2=substr(result, 8,12)
'draw title Humedad Relativa (%)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim rh_d5.png x1024 y1024 white'
'set gxout print'
'fprintf UC rh_d5.txt %g 253 1'
'clear'
'reset'