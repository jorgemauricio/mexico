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
  'TMP2 = tmp2m-273.15'
  'd TMP2'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Temperatura a 2m (Grados Celsius)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 5.0 5.0 @INIFAP 2018'
  'printim temp_'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf TMP2 temp'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile

* fprintf LAT LAT1.txt %g 253 1
* fprintf LON LON1.txt %g 253 1
