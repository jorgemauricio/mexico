* cargar el archivo wrfout
'open wrfout.ctl'
* comenzar dia 1
'run color_bar.gs'
'set clevs 280 284 292 296 300 304 308 312 316 320 324 328 332 336 340 344 348 352 356 360'
'set ccols 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'REFMAX = max(refcmaxclm,t=6,t=29)'
'd REFMAX'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 6'
'q time'
fecha1=substr(result, 8,12)
'set t 29'
'q time'
fecha2=substr(result, 8,12)
'draw title Reflectividad de Radar Maxima (dBZ)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim refmax_d1.png x1024 y1024 white'
'set gxout print'
'fprintf REFMAX refmax_d1.txt %g 253 1'
'clear'
'reset'

* comenzar dia 2
'run color_bar.gs'
'set clevs 280 284 292 296 300 304 308 312 316 320 324 328 332 336 340 344 348 352 356 360'
'set ccols 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'REFMAX = max(refcmaxclm,t=30,t=53)'
'd REFMAX'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 30'
'q time'
fecha1=substr(result, 8,12)
'set t 53'
'q time'
fecha2=substr(result, 8,12)
'draw title Reflectividad de Radar Maxima (dBZ)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim refmax_d2.png x1024 y1024 white'
'set gxout print'
'fprintf REFMAX refmax_d2.txt %g 253 1'
'clear'
'reset'

* comenzar dia 3
'run color_bar.gs'
'set clevs 280 284 292 296 300 304 308 312 316 320 324 328 332 336 340 344 348 352 356 360'
'set ccols 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'REFMAX = max(refcmaxclm,t=54,t=77)'
'd REFMAX'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 54'
'q time'
fecha1=substr(result, 8,12)
'set t 77'
'q time'
fecha2=substr(result, 8,12)
'draw title Reflectividad de Radar Maxima (dBZ)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim refmax_d3.png x1024 y1024 white'
'set gxout print'
'fprintf REFMAX refmax_d3.txt %g 253 1'
'clear'
'reset'

* comenzar dia 4
'run color_bar.gs'
'set clevs 280 284 292 296 300 304 308 312 316 320 324 328 332 336 340 344 348 352 356 360'
'set ccols 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'REFMAX = max(refcmaxclm,t=78,t=101)'
'd REFMAX'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 78'
'q time'
fecha1=substr(result, 8,12)
'set t 101'
'q time'
fecha2=substr(result, 8,12)
'draw title Reflectividad de Radar Maxima (dBZ)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim refmax_d4.png x1024 y1024 white'
'set gxout print'
'fprintf REFMAX refmax_d4.txt %g 253 1'
'clear'
'reset'


* comenzar dia 5
'run color_bar.gs'
'set clevs 280 284 292 296 300 304 308 312 316 320 324 328 332 336 340 344 348 352 356 360'
'set ccols 500 501 502 503 504 505 506 507 508 509 510 511 512 513 514 515 516 517 518 519 520'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -119 -85'
'set lat 9 33'
'REFMAX = max(refcmaxclm,t=102,t=125)'
'd REFMAX'
'set gxout shp'
'draw shp shapes/MAPA'
'run colorbar.gs bottom'
'set t 102'
'q time'
fecha1=substr(result, 8,12)
'set t 125'
'q time'
fecha2=substr(result, 8,12)
'draw title Reflectividad de Radar Maxima (dBZ)\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim refmax_d5.png x1024 y1024 white'
'set gxout print'
'fprintf REFMAX refmax_d5.txt %g 253 1'
'clear'
'reset'
