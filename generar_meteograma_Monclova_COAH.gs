function main(args) 
name='Monclova_COAH' 
hour=00 
hilon=-101.49 
hilat=26.9

* Open the data file
'reinit'
'open wrfout.ctl'
if (rc) ; return ; endif

* Get info from the descriptor file
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

* Get the Time axis info
tsize = subwrd(_tdef,2)
_t1 = 1       ;* 2nd half of timeseries
_t2 = tsize
tsize = _t2 - _t1 + 1
'set t '_t1' '_t2
'q dims'
times  = sublin(result,5)
_time1 = subwrd(times,6)
_time2 = subwrd(times,8)
_tdim = _time1' '_time2

tincr = subwrd(_tdef,5)
_tdef = 'tdef 'tsize' linear '_time1' 'tincr

huh = subwrd(_tdef,4)

  i = 3

* Get Vertical grid info
zsize = subwrd(_zdef,2)
z = 1
zlevs = ''
rhzlevs = ''
while (z <= zsize)
  'set z 'z
  lev = subwrd(result,4)
  if lev = 500 ; z500 = z ; endif
  zlevs = zlevs%lev%' '
  z = z + 1
endwhile

* Find the grid point closest to requsted location
'set lon 'hilon
hilon = subwrd(result,4)
'set lat 'hilat
hilat = subwrd(result,4)
_xdim = hilon' 'hilon
_ydim = hilat' 'hilat

* Set up a few preliminary characteristics
setcols(1)
'set display color white'
'c'
'set grads off'

* Determine the plot areas for each panel
npanels = 7
x1 =  1.20
x2 =  8.3
y1 =  8.80
y2 =  10.00
panel.npanels = x1' 'x2' 'y1' 'y2   ;* hovmoeller panel
ytop = 8.8  ;* y boundaries for rest of panels except precip
ybot = 1.2
int = (ytop-ybot)/(npanels-2)     ;* get height of middle panels
int = 0.001 * (math_nint(1000*int))
n=npanels-1
y2 = ytop
while (n >= 2)
  y2 = ytop - (npanels-n-1)*int
  y1 = ytop - (npanels-n)*int
  panel.n = x1' 'x2' 'y1' 'y2        ;* coords of middle panels
  n = n - 1
endwhile
xincr = (8.15 - 1.2)/tsize           ;* size of one time step
xincr = 0.01 * math_nint(100*xincr)
panel.1 = x1' 'x2' 'y1' 'y2     ;* coords of precip panel

* Indent the soil panel too
w2 = subwrd(panel.2,2)
w3 = subwrd(panel.2,3)
w4 = subwrd(panel.2,4)
panel.2 = x1' 'w2' 'w3' 'w4

'set grads off'

* Set the Plot Area for the Upper Air Panel
p = npanels

* Next Panel: cloud
p = p

'set parea 'panel.p
'set gxout contour'
'set vpage off'
'set grid on'
'set grads off'
'set xlopts 1 4 0.10'
'set xlpos 0 t'
'set yaxis 0 100 20'
'set ccolor 5'
'set cmark 4'
'set t '_t1-0.5' '_t2+0.5
*'d tcdcccll'
'd tcdcclm'

* Draw a rectangle over the x-axis labels
'set line 0'
'draw recf 0.2 10.6 2.1 10.0'



* Next Panel: SLP
getseries(prmslmsl,prmslmsl,1000)
'define slp = prmslmsl*0.01'
p = p - 1
'set parea 'panel.p
'set vpage off'
'set lon 'hilon
'set lat 'hilat
'set gxout contour'
'set grid on'
vrng(slp,slp)
'set ccolor 11'
'set cmark 0'
'set t '_t1-0.5' '_t2+0.5
'd slp'

* Draw a rectangle over the x-axis labels
xlo = subwrd(panel.p,1)
xhi = subwrd(panel.p,2)
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
'set line 0'
'draw recf 'xlo-0.4' 'ylo-0.8' 'xhi+0.4' 'ylo-0.02''

* Next Panel: Surface Wind Speed
p = p - 1
getseries(ugrd10m,ubot,1000)
getseries(vgrd10m,vbot,1000)
'set parea 'panel.p
'set vpage off'
'set grads off'
*if (units = 'e')
*validacion de unidades
'define ubot = 2.2374*ugrdbot'
'define vbot = 2.2374*vgrdbot'
'define wind = mag(ubot,vbot)'
'set vrange 0 22'
'set yaxis 0 22 5'
'set ccolor 26'
'set cmark 7'
'set gxout contour'
'set grid on'
'set t '_t1-0.5' '_t2+0.5
'd wind'

* Draw a rectangle over the x-axis labels
xlo = subwrd(panel.p,1)
xhi = subwrd(panel.p,2)
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
'set line 0'
'draw recf 'xlo-0.4' 'ylo-0.8' 'xhi+0.4' 'ylo-0.02''

* Next Panel: 2m Temperatures and Indices
getseries(tmp2m,tmp2m,1000)
getseries(rh2m,rh2m,1000)
getseries(vgrd10m,vbot,1000)
getseries(ugrd10m,ubot,1000)
p = p - 1
'set parea 'panel.p
'set vpage off'
'set frame on'
'set grads off'
'set ylab on'
'set gxout line'
'set grid off'


'define t2mf = const((tmp2m-273.16)*1.8+32,0,-u)'
'define t2m  = const((tmp2m-273.16),0,-u)'
'define xxxt = ' tmp2m '- 273.16'
'define xxxw = mag('ugrd10m','vgrd10m')'
'define wchill=13.12+(0.6215*xxxt)-(11.37*pow((xxxw*3.6),0.16))+(0.3965*xxxt*pow((xxxw*3.6),0.16))'
'undefine xxxt'
'undefine xxxw'


'set t '_t1-0.5' '_t2+0.5

'set ccolor 11'
'set cmark 0'
'set cstyle 1'
'd wchill'
'set grid on'
'set cmark 8'
'set ccolor 2'
'd t2m'



* Draw a rectangle over the x-axis labels
xlo = subwrd(panel.p,1)
xhi = subwrd(panel.p,2)
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
'set line 0'
'draw recf 'xlo-0.4' 'ylo-0.8' 'xhi+0.4' 'ylo-0.02''

* Back up to Previous Panel: 10m Wind Barbs
p = p + 1
'set parea 'panel.p
'set ccolor 1'
lap1 = hilat + 0.1
lam1 = hilat - 0.1
'set lon 'hilon ;* ??
'set lat 'lam1' 'lap1
'set frame off'
'set grid off'
'set gxout barb'
'set xyrev on'
'set xlab off'
'set ylab off'
if (units = 'e')
  'd 2.2374*u10m.1;2.2374*v10m.1'
endif

* Reset dimension and graphics parameters
'set lat 'hilat
'set lon 'hilon
'set vpage off'
'set frame on'
'set grads off'
'set ylab on'
'set xlab on'
'set gxout line'
'set grid off'

* Skip to Next Panel: 2m Relative Humidity
p = p - 2
'set parea 'panel.p
*'set vpage off'
*'set grads off'
*rh2vrng(rh2m)
'set axlim 0 100'
'set yaxis 0 102 20'
'set gxout linefill'
'set lfcols 20 0' ; 'd rh2m;const(rh2m,00.01,-a)'
'set lfcols 21 0' ; 'd rh2m;const(rh2m,20.01,-a)'
'set lfcols 22 0' ; 'd rh2m;const(rh2m,30.01,-a)'
'set lfcols 23 0' ; 'd rh2m;const(rh2m,40.01,-a)'
'set lfcols 24 0' ; 'd rh2m;const(rh2m,50.01,-a)'
'set lfcols 25 0' ; 'd rh2m;const(rh2m,60.01,-a)'
'set lfcols 26 0' ; 'd rh2m;const(rh2m,70.01,-a)'
'set lfcols 27 0' ; 'd rh2m;const(rh2m,80.01,-a)'
'set lfcols 28 0' ; 'd rh2m;const(rh2m,90.01,-a)'
'set ccolor 28'
'set gxout line'
'set grid on'
'set vrange 0 102'
'set yaxis 0 102 20'
'set cmark 2'
'd rh2m'

* Draw a rectangle over the x-axis labels
xlo = subwrd(panel.p,1)
xhi = subwrd(panel.p,2)
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
'set line 0'
'draw recf 'xlo-0.4' 'ylo-0.8' 'xhi+0.4' 'ylo-0.02''


* Final Panel: Precipitation
getseries(apcpsfc,apcpsfc,1000)
getseries(acpcpsfc,acpcpsfc,1000)
getseries(csnowsfc,csnowsfc,1000)
getseries(cfrzrsfc,cfrzrsfc,1000)
getseries(cicepsfc,cicepsfc,1000)
p = p - 1
'set parea 'panel.p
'set vpage off'
'set grid on'
'set grads off'
'define ptot  = 0.5*(apcpsfc+abs(apcpsfc))'
'define pconv = 0.5*(acpcpsfc+abs(acpcpsfc))'
if (units = 'e')
  'define ptot  = const(ptot,0,-u)/25.4'
  'define pconv = const(pconv,0,-u)/25.4'
else
  'define ptot  = const(ptot,0,-u)'
  'define pconv = const(pconv,0,-u)'
endif

* Get Total Precipitation Range
'set gxout stat'
'd ptot'
data = sublin(result,8)
pmx = subwrd(data,5)
if (units = 'e')
  if (pmx < 0.05)
    pmx = 0.0499
  else
    pmx = pmx + (0.05*pmx)
  endif
else
  if (pmx < 1.0)
    pmx = 0.99
  else
    pmx = pmx + (0.05*pmx)
  endif
endif
'set vrange 0 'pmx
incr = 0.01 * (math_nint(100*pmx/5))
'set ylint 'incr
'set t '_t1+0.5' '_t2+0.5

* Rain (Total Precipitation)
'set gxout bar'
'set barbase 0'
'set bargap 40'
'set ccolor 42'
'd ptot'

* Snow
'set ccolor 44'
'd ptot*csnowsfc'

* Sleet (Freezing Rain)
'set ccolor 45'
'd ptot*cfrzrsfc'

* Ice Pellets
'set ccolor 46'
'd ptot*cicepsfc'

* Convective Precipitation
'set gxout bar'
'set bargap 80'
'set ccolor 2'
'd pconv'

* Draw all the Y-axis labels
p = npanels

* Next Panel
'set strsiz 0.08 0.12'
p = p
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
ymid = ylo + (yhi-ylo)/2
'set string  5 c 4 90'
'draw string 0.15 'ymid' Cobertura'
'set string  5 c 4 90'
'draw string 0.35 'ymid' de nubes'
'set string  1 c 4 90'
'draw string 0.65 'ymid' (%)'

* Next Panel
'set strsiz 0.08 0.12'
p = p - 1
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
ymid = ylo + (yhi-ylo)/2
'set string 11 c 4 90' ; 'draw string 0.15 'ymid' Presion'
'set string 11 c 4 90' ; 'draw string 0.35 'ymid' Atmosferica'
'set string  1 c 4 90' ; 'draw string 0.6 'ymid' (hPa)'

* Next Panel
p = p - 1
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
ymid = ylo + (yhi-ylo)/2
'set string 26 c 4 90' ; 'draw string 0.15 'ymid' Velocidad del'
'set string 26 c 4 90' ; 'draw string 0.35 'ymid' Viento a 10m'
'set string 1 c 4 90' ; 'draw string 0.65 'ymid' (m/s)'

* Next Panel
p = p - 1
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
ymid = ylo + (yhi-ylo)/2
'set string  2 c 4 90' ; 'draw string 0.15 'ymid' Temparatura a 2m'
'set string 1 c 4 90'
'draw string 0.65 'ymid' (C)'


* Next Panel
p = p - 1
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
ymid = ylo + (yhi-ylo)/2
'set string 26 c 4 90' ; 'draw string 0.35 'ymid' Humedad Relativa'
'set string  1 c 4 90' ; 'draw string 0.65 'ymid' (%)'


* Bottom Panel
p = p - 1
ylo = subwrd(panel.p,3)
yhi = subwrd(panel.p,4)
ymid = ylo + (yhi-ylo)/2

'set string 11 c 4 90' ; 'draw string .35 'ymid' Prec 3h'
'set string 1 c 4 90' ; 'draw string .65 'ymid' (mm)'


'set string 1 l 4 0' ; 'draw string 0.4 0.7 Prec'
'set string 42 l 4 0' ; 'draw string 1.4 0.7 Total/Prec'
'set line 42 1 6'
'draw recf 1.25 0.65 1.35 0.75'
'set string  2 l 4 0' ; 'draw string 1.4 0.5 Convective'
'set line 2 1 6'
'draw recf 1.25 0.45 1.35 0.55'
'set string 45 l 4 0' ; 'draw string 0.4 0.5 LLuvia Helada'
'set line 45 1 6'
'draw recf 0.25 0.45 0.35 0.55'
'set string 44 l 4 0' ; 'draw string 1.4 0.3 Nieve'
'set line 44 1 6'
'draw recf 1.25 0.25 1.35 0.35'
'set string 46 l 4 0' ; 'draw string 0.4 0.3 G. de hielo'
'set line 46 1 6'
'draw recf 0.25 0.25 0.35 0.35'

'set rgb 99 1 1 1'
'set line 99 1 6'
'draw rec 0.1 0.1 2.2 0.85'

* Draw Labels at the top of the page
'set string 1 r 6 0'
'set strsiz 0.16 .18'
label = 'Meteograma a 126 hrs: 'name

'draw string 8.2 10.7 'label

*huh = subwrd(_tdef,4)

'set strsiz 0.1 .12'
*'set string 1 r 3 0' ; 'draw string 8.2 0.2 @INIFAP'
'draw string 5.0 5.0 @INIFAP 2018'

'set strsiz 0.14 .16'
'set string 1 r 3 0' ; 'draw string 8.2 0.5 WRF(10km), : 'huh

'set rgb 99 1 1 1'
'set line 99 1 6'
'draw rec 0.02 0.02 8.49 10.99'
*'draw rec 0.02 0.02 1.19 11.49'
*'draw rec 1.19 0.02 8.48 1.0'

'set grads off'
'printim ' name'.png x1300 y1800'

* Remove the dummy files
'!rm -f dummy.ctl'
'!rm -f dummy.dat'

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* END OF MAIN SCRIPT
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function setcols(args)
'set rgb 20 234 245 234'
'set rgb 21 200 215 200'
'set rgb 22 160 205 160'
'set rgb 23 120 215 120'
'set rgb 24  80 235  80'
'set rgb 25   0 255   0'
'set rgb 26   0 195   0'
'set rgb 27   0 160   0'
'set rgb 28   0 125   0'

'set rgb 30 255 160 120'
'set rgb 31 160 120 255'
'set rgb 32 160 180 205'

'set rgb 42  32 208  32'
'set rgb 43 208  32 208'
'set rgb 44  64  64 255'
'set rgb 45 255 120  32'
'set rgb 46  32 208 208'
'set rgb 47 240 240   0'

'set rgb 96 139 115  85'
'set rgb 97 100 100 100'
'set rgb 98  64  64  96'
'set rgb 99 254 254 254'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function vrng(f1,f2)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymx = subwrd(data,5)
ymn = subwrd(data,4)
'd 'f2
data = sublin(result,8)
zmx = subwrd(data,5)
zmn = subwrd(data,4)
if (zmx > ymx) ; ymx = zmx ; endif
if (zmn < ymn) ; ymn = zmn ; endif
dy = ymx-ymn
ymx = ymx + 0.08 * dy
ymn = ymn - 0.08 * dy
if ((ymx-ymn)/2.2 < 1)
  incr = (ymx-ymn)/4
  incr = 0.01 * (math_nint(100*incr))
else
  incr = math_nint((ymx-ymn)/4)
endif
'set vrange 'ymn' 'ymx
'set ylint 'incr
if (ymn=0 & ymx=0 & incr=0)
  'set vrange -.9 .9'
  'set ylint 1'
endif
'set gxout line'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function rh2vrng(f1)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymn = subwrd(data,4)
ymx = subwrd(data,5)
if (ymn < 20)
  miny = 0
  'set ylevs 20 40 60 80'
endif
if (ymn >= 20 & ymn < 30)
  miny = 20
  'set ylevs 30 50 70 90'
endif
if (ymn >= 30 & ymn < 40)
  miny = 30
  'set ylevs 40 50 60 70 80 90'
endif
if (ymn >= 40 & ymn < 50)
  miny = 40
  'set ylevs 50 60 70 80 90'
endif
if (ymn >= 50 & ymn < 60)
  miny = 50
  'set ylevs 60 70 80 90'
endif
if (ymn >= 60)
  miny = 60
  'set ylevs 70 80 90'
endif
'set vrange 'miny' 'ymx+3
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getctl(handle)
line = 1
found = 0
while (!found)
  info = sublin(_ctl,line)
  if (subwrd(info,1)=handle)
    _handle = info
    found = 1
  endif
  line = line + 1
endwhile
return _handle

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getgrid(dodsvar,myvar)

'set lon '_xdim
'set lat '_ydim
'set lev '_zgrd
'set time '_tdim

* Write the variable to a file
'set gxout fwrite'
'set fwrite dummy.dat'
'd 'dodsvar
'disable fwrite'

* Write a descriptor file
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_zdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* Open the dummy file, define variable, close dummy file
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_zbot' '_ztop
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getetarh(dodsvar,myvar)

* swap out original pressure vars
tmpzgrd = _zgrd
tmpzdef = _zdef
tmpzbot = _zbot
tmpztop = _ztop
tmpzsize = _newzsize

* retrieve rh data over the rh pressure range
_zgrd = _rhzgrd
_zdef = _trhzdef
_ztop = _rhztop
_zbot = _rhzbot
_newzsize = _trhzsize
getgrid(dodsvar,tmprh)

* swap in original pressure vars
_zgrd = tmpzgrd
_zdef = tmpzdef
_zbot = tmpzbot
_ztop = tmpztop
_newzsize = tmpzsize

'set lon '_xdim
'set lat '_ydim
'set lev '_rhzgrd
'set time '_tdim

* Write the variable to a file
'set gxout fwrite'
'set fwrite dummy.dat'
t = _t1
while (t <= _t2)
  'set t 't
  z = 1
  while (z <= _newrhzsize)
    level = subwrd(_rhlevs,z)
    'set lev 'level
    'd tmprh'
    z = z + 1
  endwhile
  t = t + 1
endwhile
'disable fwrite'

* Write a descriptor file
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_rhzdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newrhzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* Open the dummy file, define variable, close dummy file
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_rhzbot' '_rhztop
'set time '_time1' '_time2
'q dims'
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'

return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getseries(dodsvar,myvar,level)

'set lon '_xdim
'set lat '_ydim
'set lev 'level' 'level
'set time '_tdim

* Write the variable to a file
'set fwrite dummy.dat'
'set gxout fwrite'
'd 'dodsvar
'disable fwrite'

* Write a descriptor file
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,'zdef 1 linear 1 1',append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy 0 -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close(dummy.ctl)

* Open the dummy file, define variable, close dummy file
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev 'level
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
'set gxout contour'

return

**********************************************************************

 function wchill(t2m,ugrd10m,in_v10m)

     if (in_v10m='in_v10m'|in_v10m='')
        say 'Purpose: Compute Wind Chill Temperature (New Formula)'
        say 'Usage:   display wchill(t2m,u10m,in_v10m)'
        say '         t2m = temperature at 2m [K]'
        say '         u10m = zonal wind at 10m'
        say '         v10m = meridional wind at 10m'
        return
     else
        v10m = in_v10m
     endif

*   Define these to mnimize I/O
*   ---------------------------
    'define xxxt = ' t2m '- 273.16'
    'define xxxw = mag('u10m','v10m')'

    'define gsudf=273.16+13.12+(0.6215*xxxt)-(11.37*pow((xxxw*3.6),0.16))+(0.3965*xxxt*pow((xxxw*3.6),0.16))'

*    Garbage collection
*    ------------------
    'undefine xxxt'
    'undefine xxxw'

     return 'gsudf'

*****************************************************************
