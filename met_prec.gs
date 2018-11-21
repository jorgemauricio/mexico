* PRECITPITATION

'open wrfout.ctl'
'set background 0'
'c'
maxtime=126
lat=21
lon=-102
'set lat 'lat
'set lon 'lon
'set t 1 'maxtime+1
'set xlab on'
count = 2
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
'set t 1 'maxtime+1
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
'draw string 0.5 1.3 (mm/1h)'

'printim Aguascalientes.png x1024 y480'
'quit'
