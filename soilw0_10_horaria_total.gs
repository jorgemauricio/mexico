* cargar el archivo wrfout
'open wrfout.ctl'
* variable de control del ciclo
count = 6
* comenzar con el ciclo de ejecución
while(count<127)
  'run color_bar.gs'
  'set clevs -2 0 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50'
  'set ccols 300 301 302 303 304 305 306 307 308 309 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
  'set t 'count
  'set gxout shaded'
  'set poli off'
  'set grads off'
  'set lon -119 -85'
  'set lat 9 33'
  'SOILW010 = soilw0_10cm'
  'd SOILW010'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Temperatura del suelo de 0 a 10 cm (Grados Celsius)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 4.5 5.0 @INIFAP 2018'
  'printim soilw010_'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf SOILW010 soilw010'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile
