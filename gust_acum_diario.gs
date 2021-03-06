* cargar el archivo wrfout
'open wrfout.ctl'
* comenzar dia 1
'run rgbset.gs'
'set arrlab off'
'set clevs 4 6 8 10 12 14 16 18 20 22 24 26 28 30 35'
'set ccols 128 43 44 45 46 37 38 39 22 23 24 25 26 27 28 29'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'GUST=ave(gust10m,t=6,t=29)'
'd GUST'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 6'
'q time'
fecha1=substr(result, 8,12)
'set t 29'
'q time'
fecha2=substr(result, 8,12)
'draw title Rafaga de viento (m/s)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim gust_d1.png x1024 y1024 white'
'set gxout print'
'fprintf GUST gust_d1.txt %g 253 1'
'clear'
'reset'

* comenzar dia 2
'run rgbset.gs'
'set arrlab off'
'set clevs 4 6 8 10 12 14 16 18 20 22 24 26 28 30 35'
'set ccols 128 43 44 45 46 37 38 39 22 23 24 25 26 27 28 29'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'GUST=ave(gust10m,t=30,t=53)'
'd GUST'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 30'
'q time'
fecha1=substr(result, 8,12)
'set t 53'
'q time'
fecha2=substr(result, 8,12)
'draw title Rafaga de viento (m/s)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim gust_d2.png x1024 y1024 white'
'set gxout print'
'fprintf GUST gust_d2.txt %g 253 1'
'clear'
'reset'

* comenzar dia 3
'run rgbset.gs'
'set arrlab off'
'set clevs 4 6 8 10 12 14 16 18 20 22 24 26 28 30 35'
'set ccols 128 43 44 45 46 37 38 39 22 23 24 25 26 27 28 29'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'GUST=ave(gust10m,t=34,t=77)'
'd GUST'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 54'
'q time'
fecha1=substr(result, 8,12)
'set t 77'
'q time'
fecha2=substr(result, 8,12)
'draw title Rafaga de viento (m/s)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim gust_d3.png x1024 y1024 white'
'set gxout print'
'fprintf GUST gust_d3.txt %g 253 1'
'clear'
'reset'

* comenzar dia 4
'run rgbset.gs'
'set arrlab off'
'set clevs 4 6 8 10 12 14 16 18 20 22 24 26 28 30 35'
'set ccols 128 43 44 45 46 37 38 39 22 23 24 25 26 27 28 29'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'GUST=ave(gust10m,t=78,t=101)'
'd GUST'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 78'
'q time'
fecha1=substr(result, 8,12)
'set t 101'
'q time'
fecha2=substr(result, 8,12)
'draw title Rafaga de viento (m/s)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim gust_d4.png x1024 y1024 white'
'set gxout print'
'fprintf GUST gust_d4.txt %g 253 1'
'clear'
'reset'


* comenzar dia 5
'run rgbset.gs'
'set arrlab off'
'set clevs 4 6 8 10 12 14 16 18 20 22 24 26 28 30 35'
'set ccols 128 43 44 45 46 37 38 39 22 23 24 25 26 27 28 29'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'GUST=ave(gust10m,t=102,t=125)'
'd GUST'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 102'
'q time'
fecha1=substr(result, 8,12)
'set t 125'
'q time'
fecha2=substr(result, 8,12)
'draw title Rafaga de viento (m/s)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim gust_d5.png x1024 y1024 white'
'set gxout print'
'fprintf GUST gust_d5.txt %g 253 1'
'clear'
'reset'
