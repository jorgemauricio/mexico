* cargar el archivo wrfout
'open wrfout.ctl'
* variable de control del ciclo
count = 6
* comenzar con el ciclo de ejecución
while(count<127)
  'run color_bar.gs'
  'set clevs 40 45 50 55 60 65 70 75 80 85 90 95 100 105 110 120 130 140 150 160 170 180 190 200 210 220 225'
  'set ccols 300 301 302 303 304 305 306 307 308 309 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
  'set t 'count
  'set gxout shaded'
  'set poli off'
  'set grads off'
  'set lon -119 -85'
  'set lat 9 33'
  'PRES=pres2m/1000'
  'd PRES'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Presion atomosferica a 2m (kPa)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 5.0 5.0 @INIFAP 2018'
  'printim pres2m_'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf PRES pres2m'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile
