* cargar el archivo wrfout
'open wrfout.ctl'
* variable de control del ciclo
count = 6
* comenzar con el ciclo de ejecución
while(count<127)
  'run rgbset.gs'
  'set arrlab off'
  'set clevs 4 6 8 10 12 14 16 18 20 22 24 26 28 30 35'
  'set ccols 128 43 44 45 46 37 38 39 22 23 24 25 26 27 28 29'
  'set t 'count
  'set gxout shaded'
  'set poli off'
  'set grads off'
  'set lon -119 -85'
  'set lat 9 33'
  'GUST=gust10m'
  'd GUST'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Rafaga de viento (m/s)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 4.5 5.0 @INIFAP 2018'
  'printim gust_'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf GUST gust'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile
