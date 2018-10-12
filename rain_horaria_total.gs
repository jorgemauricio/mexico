* cargar el archivo wrfout
'open wrfout.ctl'
* variable de control del ciclo
count = 6
* comenzar con el ciclo de ejecución
while(count<127)
  'run color_bar.gs'
  'set clevs 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
  'set ccols 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520'
  'set t 'count
  'set gxout shaded'
  'set poli off'
  'set grads off'
  'set lon -119 -85'
  'set lat 9 33'
  'RAIN = apcpsfc'
  'd RAIN'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Precipitacion Acumulada (mm)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 5.0 5.0 @INIFAP 2018'
  'printim rain_'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf RAIN rain'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile
