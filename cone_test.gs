'open wrfout.ctl'
'set display color white'
'clear'
'set mpdset hires'
'set lon -119 -85'
'set lat 9 33'
'd hgtprs'
'rgbset'

'basemap L 74 1 M'
'basemap O 45 1 M'

'printim hurricanebase.png'

'clear'
'set t 1'

'set lon -119 -85'
'set lat 9 33'
'set lev 850'
'set clevs 10000000'
'set ccolor 0'
'd hgtprs'

'set map 1'
'draw map'

'cone prmslmsl -mnlt 9 -maxlat 33 -mnln -119 -mxln -85 -tunit day -fcol 2'

'printim ucone.png -b hurricanebase.png -t 0'

***
