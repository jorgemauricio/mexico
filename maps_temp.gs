* autor: Jorge Mauricio
* date: 2018-07-17
* script para generar mapas de temp
* para el estado de Sonora con el
* archivo grib2 qu genera
* el WRF
'open wrfout.ctl'
count = 1
while (count<121)
  'set cmin 10'
  'set cmax 65'
  'set cint 5'
  'set display white'
  'set gxout shaded'
  'set lon -115.55 -108.03'
  'set lat 25.49 33.04'
  'set t ' count
  'set mpt 1 off'
  'q time'
  fecha=substr(result, 8,12)
  'd tmp2m-273.15'
  'draw shp shapes/Estados.shp'
  'draw title Temperatura a 2m (Grados Celsius) \ valido para 'fecha
  'xcbar -fs 1'
  'gxprint map_temp_'count%'.png ' 'x1024 y1024'
  count=count+1
  'clear'
endwhile 

