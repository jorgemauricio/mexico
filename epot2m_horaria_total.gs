* cargar el archivo wrfout
'open wrfout.ctl'
* variable de control del ciclo
count = 6
* comenzar con el ciclo de ejecución
while(count<127)
  'run color_bar.gs'
  'set clevs 260 265 270 275 280 285 290 295 300 305 310 315 320 325 330 335 340 345 350 355 360'
  'set ccols 300 301 302 303 304 305 306 307 308 309 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
  'set t 'count
  'set gxout shaded'
  'set poli off'
  'set grads off'
  'set lon -119 -85'
  'set lat 9 33'
  'EPT = epot2m'
  'd EPT'
  'set gxout shp'
  'draw shp shapes/MAPA'
  'run colorbar.gs bottom'
  'q time'
  fecha = substr(result, 8,12)
  'draw title Temperatura Potencial Equivalente (K)\ valido para 'fecha
  'set string 1 c 1 0'
  'draw string 5.0 5.0 @INIFAP 2018'
  'printim epot_'count'.png x1024 y1024 white'
  'set gxout print'
  'fprintf EPT epot'count'.txt %g 253 1'
  'clear'
  'reset'
  count=count+1
endwhile

* fprintf LAT LAT1.txt %g 253 1
* fprintf LON LON1.txt %g 253 1
