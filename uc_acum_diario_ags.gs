* cargar el archivo wrfout
'open wrfout.ctl'
* comenzar dia 1
'run color_bar.gs'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17'
'set ccols 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -103.05 -101.68'
'set lat 21.5 22.6'
'TMAX=ave(tmax2m-273.15,t=7,t=30)'
'TMIN=ave(tmin2m-273.15,t=7,t=30)'
'UC=(((TMAX+TMIN)/2)-10)'
'UC1=UC'
'd UC'
'set gxout shp'
'draw shp shapes/MunicipiosAgs'
'run colorbar.gs bottom'
'set t 7'
'q time'
fecha1=substr(result, 8,12)
'set t 30'
'q time'
fecha2=substr(result, 8,12)
'draw title Unidades Calor Acumuladas\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim uc_ags_d1.png x1024 y1024 white'
'set gxout print'
'fprintf UC uc_ags_d1.txt %g 253 1'
'clear'
'reset'

* comenzar dia 2
'run color_bar.gs'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17'
'set ccols 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -103.05 -101.68'
'set lat 21.5 22.6'
'TMAX=ave(tmax2m-273.15,t=31,t=54)'
'TMIN=ave(tmin2m-273.15,t=31,t=54)'
'UC=(((TMAX+TMIN)/2)-10)'
'UC2=UC'
'd UC'
'set gxout shp'
'draw shp shapes/MunicipiosAgs'
'run colorbar.gs bottom'
'set t 31'
'q time'
fecha1=substr(result, 8,12)
'set t 54'
'q time'
fecha2=substr(result, 8,12)
'draw title Unidades Calor Acumuladas\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim uc_ags_d2.png x1024 y1024 white'
'set gxout print'
'fprintf UC uc_ags_d2.txt %g 253 1'
'clear'
'reset'

* comenzar dia 3
'run color_bar.gs'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17'
'set ccols 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -103.05 -101.68'
'set lat 21.5 22.6'
'TMAX=ave(tmax2m-273.15,t=55,t=78)'
'TMIN=ave(tmin2m-273.15,t=55,t=78)'
'UC=(((TMAX+TMIN)/2)-10)'
'UC3=UC'
'd UC'
'set gxout shp'
'draw shp shapes/MunicipiosAgs'
'run colorbar.gs bottom'
'set t 55'
'q time'
fecha1=substr(result, 8,12)
'set t 78'
'q time'
fecha2=substr(result, 8,12)
'draw title Unidades Calor Acumuladas\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim uc_ags_d3.png x1024 y1024 white'
'set gxout print'
'fprintf UC uc_ags_d3.txt %g 253 1'
'clear'
'reset'

* comenzar dia 4
'run color_bar.gs'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17'
'set ccols 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -103.05 -101.68'
'set lat 21.5 22.6'
'TMAX=ave(tmax2m-273.15,t=79,t=102)'
'TMIN=ave(tmin2m-273.15,t=79,t=102)'
'UC=(((TMAX+TMIN)/2)-10)'
'UC4=UC'
'd UC'
'set gxout shp'
'draw shp shapes/MunicipiosAgs'
'run colorbar.gs bottom'
'set t 79'
'q time'
fecha1=substr(result, 8,12)
'set t 102'
'q time'
fecha2=substr(result, 8,12)
'draw title Unidades Calor Acumuladas\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim uc_ags_d4.png x1024 y1024 white'
'set gxout print'
'fprintf UC uc_ags_d4.txt %g 253 1'
'clear'
'reset'


* comenzar dia 5
'run color_bar.gs'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17'
'set ccols 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -103.05 -101.68'
'set lat 21.5 22.6'
'TMAX=ave(tmax2m-273.15,t=103,t=126)'
'TMIN=ave(tmin2m-273.15,t=103,t=126)'
'UC=(((TMAX+TMIN)/2)-10)'
'UC5=UC'
'd UC'
'set gxout shp'
'draw shp shapes/MunicipiosAgs'
'run colorbar.gs bottom'
'set t 103'
'q time'
fecha1=substr(result, 8,12)
'set t 126'
'q time'
fecha2=substr(result, 8,12)
'draw title Unidades Calor Acumuladas\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim uc_ags_d5.png x1024 y1024 white'
'set gxout print'
'fprintf UC uc_ags_d5.txt %g 253 1'
'clear'
'reset'

* acumulado
'run color_bar.gs'
'set clevs 5 8 11 14 17 20 23 26 29 32 35 38 41 44 47 50 53 56 59 62'
'set ccols 307 308 309 310 312 313 314 316 318 319 320 321 322 323 324 326 327 328 329 330 331'
'set gxout shaded'
'set poli off'
'set grads off'
'set lon -103.05 -101.68'
'set lat 21.5 22.6'
if(UC1 < 0)
'UC1=0'
endif
if(UC2 < 0)
'UC2=0'
endif
if(UC3 < 0)
'UC3=0'
endif
if(UC4 < 0)
'UC4=0'
endif
if(UC5 < 0)
'UC5=0'
endif

'UC=UC1+UC2+UC3+UC4+UC5'
'd UC'
'set gxout shp'
'draw shp shapes/MunicipiosAgs'
'run colorbar.gs bottom'
'set t 7'
'q time'
fecha1=substr(result, 8,12)
'set t 126'
'q time'
fecha2=substr(result, 8,12)
'draw title Unidades Calor Acumuladas\ valido para 'fecha1' a 'fecha2
'set string 1 c 1 0'
'draw string 5.0 5.0 @INIFAP 2018'
'printim uc_ags_d6.png x1024 y1024 white'
'set gxout print'
'fprintf UC uc_ags_d6.txt %g 253 1'
'clear'
'reset'
