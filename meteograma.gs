lat=21
lon=-102
maxtime=126
location='Aguascalientes'
date='20181023'
run=00

'reinit'
'open wrfout.ctl'
'set background 0'
'c'

* RELATIVE HUMIDITY, TEMPERATURE

'set vpage 0.63 8.5 4.4 11'
'set display color white'
'set lat 'lat
'set lon 'lon
'set t 6 'maxtime+1

'set clopts -1 -1 0.08'
'set clskip 1 3.5'

'set lev 1013 250'
'set gxout shaded'
'set grid off'
'set grads off'
'set rgb 30 234 245 234'
'set rgb 50 200 215 200'
'set rgb 70 120 215 120'
'set rgb 90 0 255 0'
'set rgb 95 0 195 0'
'set clevs   30 50 70 90 95'
'set ccols 0 30 50 70 90 95'
'set csmooth on'
'set ylint 100'
'd rhprs'
'set gxout contour'
'set cthick 1'
'set cstyle 5'
'set clevs 30 50 70 90'
'set ccols 15 15 15 15'
'set ylpos 0 r'
'd rhprs'

'set gxout contour'
'set ccolor 1'
'set cint 5'
'set clab forced'
'd tmpprs-273.15'
'set cthick 6'
'set clevs 0'
'set ccols 1'
'd tmpprs-273.15'

'draw title 'location ' WRF(10km)'

'set vpage 0 3.5 0 11'
'set string 1'
'set strsiz 0.08'
'draw string 0.3 8.2 Temperatura'
'draw string 0.6 8.0 (C)'
'set string 3'
'draw string 0.22 7.7 Humedad Relativa'
'draw string 0.7 7.5 (%)'
'set string 1'
'set strsiz 0.15'
'draw string 0.1 10.7 Inicio: '
'draw string 0.1 10.5 'date' 'run'z'
'set strsiz 0.08'
'draw string 0.1 10.1 Forecast model by'
'draw string 0.1 10.0 INIFAP'
'set strsiz 0.08'




* MSLP, TEMPERATURE 2M

'set vpage 0 8.5 2.5 5.55'
'set grads off'
'set xlab off'
'set t 6 'maxtime+1
'set lev 1013'
'set gxout line'
'set ccolor 1'
'set cmark 0'
'set csmooth on'
'set ylint 3'
'd prmslmsl/100'
'set ccolor 2'
'set cmark 0'
'set ylint 2'
'set ylpos 0 r'
'set ylopts 2'
'set grid horizontal 5 2'
'd tmp2m-273.15'

'set string 1'
'draw string 0.15 1.7 Presion Atmosferica'
'draw string 0.6 1.5 (hPa)'
'set string 2'
'draw string 0.12 1.2 Temperatura 2m'
'draw string 0.6 1.0 (C)'



* WIND SPEED, WIND BARBS

'set vpage 0 8.5 1.2 4.0'
'set grads off'
'set gxout line'
'set cmark 0'
'set ylopts 3'
'set ylevs 1 5 10 15 20 30 40 50'
'set ylpos 0 l'
'set ccolor 3'
'set cthick 6'
'set grid horizontal 5 3'
'd mag(ugrd10m,vgrd10m)'
'set parea 2 8.0 0.2 2.6'
lap1 = lat + 0.01
lam1 = lat - 0.01
'set lat 'lam1' 'lap1
'set frame off'
'set xyrev on'
'set ylab off'
'set cthick 1'
'set gxout barb'
'd skip(ugrd10m*1.95,1,4);vgrd10m*1.95'
'set parea off'
'set lat 'lat
'set frame on'
'set ylab on'
'set string 1'
'draw string 0.3 1.4 Velocidad del'
'draw string 0.6 1.2 viento'
'draw string 0.6 1.0 (m/s)'




* PRECITPITATION

'set vpage 0 8.5 0 2.7'
'set xlab on'
count = 6
'set gxout contour'
maxprec = 0.1
maxcount = maxtime+2
while ( count < maxcount )
'set t 'count
'd apcpsfc'
mprec = subwrd(result,10)
if ( mprec > maxprec )
'd apcpsfc'
maxprec = subwrd(result,10)
endif
count = count + 1
endwhile

'set grads off'
'set t 6 'maxtime+1
'set lev 1013'
'set gxout bar'
'set ccolor 4'
'set ylopts 4'
if ( maxprec < 1 )
'set ylevs 0.1 0.2 0.4 0.6 0.8 1'
endif
if ( maxprec >= 1 & maxprec < 10 )
'set ylevs 0.5 1 2 4 6 8 10'
endif
if ( maxprec >= 10 )
'set ylevs 1 5 10 20 30 50 70 100'
endif
'set vrange 0 'maxprec+maxprec/20
'set grid horizontal 5 4'
'd apcpsfc'
'set string 4'
'draw string 0.2 1.5 Precipitacion Acumulada'
'draw string 0.5 1.3 (mm/h)'

'printim 'location'.png x1300 y1800'
'quit'
