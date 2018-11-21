* cargar el archivo wrfout
'open wrfout.ctl'
* variable de control del ciclo
count = 6
* comenzar con el ciclo de ejecución
while(count<127)
  'run rgbset.gs'
  'set arrlab off'
  'set clevs 0 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30'
  'set ccols 43 45 56 58 59 37 38 39 22 23 24 25 26 27 28 29'
  'set t 'count
  'set gxout stream'
  'set poli off'
  'set grads off'
  'set lon -119 -85'
  'set lat 9 33'
  'u=ugrd10m'
  'v=vgrd10m'
  'up=u'
  'vp=v'
  'd u;v;hcurl(u,v)'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Viento a 10m (m/s)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 4.5 5.0 @INIFAP 2018'
  'printim wind_steam'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf u u_steam'count'.txt %g 253 1'
  'fprintf v v_steam'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile
