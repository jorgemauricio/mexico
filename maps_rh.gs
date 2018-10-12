* autor: Jorge Mauricio
* date: 2018-07-17
* script para generar mapas de RH
* del estado de Sonora con el
* archivo grib2 qu genera
* el WRF
'open wrfout.ctl'
count=1
while (count<121)
  'set cmin 0'
  'set cmax 100'
  'set cint 10' 
  'set display white'
  'set gxout shaded'
  'set lon -115.55 -108.03'
  'set lat 25.49 33.04'
  'set t ' count
  'set mpt 1 off'
  'q time'
  fecha = substr(result, 8,12)
  'd rh2m'
  'draw shp shapes/Estados.shp'
  'draw title Humedad Relativa a 2m (%) \ valido para 'fecha
  'xcbar -fs 1'
  'gxprint map_rh_'count%'.png ' 'x1024 y1024'
  count=count+1
  'clear'
endwhile 

