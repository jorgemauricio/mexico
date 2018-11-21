* cargar el archivo wrfout
'open wrfout.ctl'
* variable de control del ciclo
count = 6
* comenzar con el ciclo de ejecución
while(count<127)
  'run color_bar.gs'
  'set clevs 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
  'set ccols 600 601 602 603 604 605 606 607 608 609 610 611 612 613 614 615 616'
  'set t 'count
  'set gxout shaded'
  'set poli off'
  'set grads off'
  'set lon -119 -85'
  'set lat 9 33'
  'd minrh2m'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Humedad Relativa Minima a 2m (%)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 5.0 5.0 @INIFAP 2018'
  'printim rhmin_'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf minrh2m rhmin'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile
