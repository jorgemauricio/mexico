function main(args)

* Parse the arguments: date, hour
  if (args = '')
  prompt 'Enter forecast date (example, 20110717) --> '
  pull date
  prompt 'Enter forecast hour (example, 00 or 06 or 12 or 18) --> '
  pull hour
  else
  date = subwrd(args,1)
  hour  = subwrd(args,2)
  endif

'reinit'
'open wrfout.ctl'

* Get info from the descriptor file
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 66

* Get the Time axis info
tsize = subwrd(_tdef,2)
_t1 = 1       ;* 2nd half of timeseries
_t2 = 45
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

****************************************
* TEMP 2M
****************************************

  i = 1
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)
'set t 'i

'define t2m  = const((tmp2m-273.16),0,-u)'
'set gxout shaded'
'set csmooth on'
'set clevs -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34'
'set ccols 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54'
'd t2m'

'cbarm'

'set gxout contour'
'set ccolor 15'
'set cint 10'
'set clab masked'
'set clopts 1'
'd t2m'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Celsius'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Temperature 2m'

'printim gfs_t'i'.png x900 y675'

i = i+1
endwhile

****************************************
* SURFACE TEMP
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)
'set t 'i

'define sutm  = const((tmpsfc-273.16),0,-u)'
'set gxout shaded'
'set csmooth on'
'set clevs -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34'
'set ccols 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54'
'd sutm'

'cbarm'

'set gxout contour'
'set ccolor 15'
'set clab masked'
'set cint 10'
'set clopts 1'
'd sutm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Celsius'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Sea Level/Surface Temperatue'

'printim gfs_sut'i'.png x900 y675'

i = i+1
endwhile

****************************************
* TEMP LIFTING CONDENSATION LEVEL
****************************************

'set dbuff on'

  i = 3
  while ( i<maps )


* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)
'set t 'i

'define tlc  = const(tlcl(tmp2m,rh2m),0,-u)'
'set gxout shaded'
'set csmooth on'
'set clevs -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34'
'set ccols 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54'
'd tlc-273.16'

'cbarm'

'set gxout contour'
'set ccolor 15'
'set cint 10'
'set clopts 1'
'set clab masked'
'd tlc-273.16'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Celsius'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Lifting Condensation Level'

'printim gfs_tlcl'i'.png x900 y675'

i = i+1
endwhile

****************************************
* WINDCHILL
****************************************

'set dbuff on'

  i = 3
  while ( i<maps )


* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)
'set t 'i

'define chill  = const(wchill(tmp2m,ugrd10m,vgrd10m)-273.16,0,-u)'
'set gxout shaded'
'set csmooth on'
'set clevs -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34'
'set ccols 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54'
'd chill'

'cbarm'

'set gxout contour'
'set ccolor 15'
'set cint 10'
'set clopts 1'
'set clab masked'
'd chill'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Celsius'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Windchill Temperature'

'printim gfs_chill'i'.png x900 y675'

i = i+1
endwhile

****************************************
* PSL & 10M WIND
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define slp  = const((prmslmsl*0.01),0,-u)'
'define u10  = const(ugrd10m,0,-u)'
'define v10  = const(vgrd10m,0,-u)'
'define wind = mag(u10,v10)'
'set gxout shaded'
'set csmooth on'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30'
'set ccols 80 82 84 86 88 20 22 22 24 26 28 30 32 33 34 35 36 37 38 39 40 41 42 44 46 48 49 51 52 53 54'
'd wind'

'set gxout contour'
'set ccolor 0'
'set cint 5'
'set clopts 1'
'set clab masked'
'd slp'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m/s'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Sea Level Pressure (hPa) & 10 m wind'
'printim gfs_slp_'i'.png x900 y675'

i = i+1
endwhile

****************************************
*10M WIND
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define u10  = const(ugrd10m,0,-u)'
'define v10  = const(vgrd10m,0,-u)'
'define wind = mag(u10,v10)'
'set gxout shaded'
'set csmooth on'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30'
'set ccols 80 82 84 86 88 20 22 22 24 26 28 30 32 33 34 35 36 37 38 39 40 41 42 44 46 48 49 51 52 53 54'
'd wind'

'set gxout contour'
'set ccolor 0'
'set cint 5'
'set clopts 1'
'set clab masked'
*'d wind'

'set gxout stream'
'set ccolor 0'
'd u10;v10'

'cbarm'

'q dims'
'set times  = sublin(result,5)'
'set hub = subwrd(times,6)'

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m/s'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 10 m wind'

'printim gfs_wind_'i'.png x900 y675'

i = i+1
endwhile

****************************************
* 500hPa WIND
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define u10  = const(ugrdprs(lev=500),0,-u)'
'define v10  = const(vgrdprs(lev=500),0,-u)'
'define wind = mag(u10,v10)'
'set gxout shaded'
'set csmooth on'
'set clevs 0 3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60 63 66 69 72 75 78 81 84 87 90'
'set ccols 80 82 84 86 88 20 22 22 24 26 28 30 32 33 34 35 36 37 38 39 40 41 42 43 44 46 48 49 51 52 53 54'
'd wind'

'set gxout contour'
'set ccolor 0'
'set cint 5'
'set clopts 1'
'set clab masked'
*'d wind'

'set gxout stream'
'set ccolor 0'
'd u10;v10'

'cbarm'

'q dims'
'set times  = sublin(result,5)'
'set hub = subwrd(times,6)'

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m/s'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 500 hPa wind'

'printim gfs_wind500_'i'.png x900 y675'

i = i+1
endwhile

****************************************
* 850hPa WIND
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define u10  = const(ugrdprs(lev=850),0,-u)'
'define v10  = const(vgrdprs(lev=850),0,-u)'
'define wind = mag(u10,v10)'
'set gxout shaded'
'set csmooth on'
'set clevs 0 3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60 63 66 69 72 75 78 81 84 87 90'
'set ccols 80 82 84 86 88 20 22 22 24 26 28 30 32 33 34 35 36 37 38 39 40 41 42 43 44 46 48 49 51 52 53 54'
'd wind'

'set gxout contour'
'set ccolor 0'
'set cint 5'
'set clopts 1'
*'d wind'

'set gxout stream'
'set ccolor 0'
'd u10;v10'

'cbarm'

'q dims'
'set times  = sublin(result,5)'
'set hub = subwrd(times,6)'

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m/s'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 500 hPa wind'

'printim gfs_wind850_'i'.png x900 y675'

i = i+1
endwhile

****************************************
* DEWPOINT 2M
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define dew  = const((dewpt(tmp2m,rh2m)-273.16),0,-u)'
'set gxout shaded'
'set csmooth on'
'set clevs -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34'
'set ccols 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54'
'd dew'

'set gxout contour'
'set ccolor 16'
'set cint 10'
'set clopts 1'
'set clab masked'
'd dew'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 �C'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Dewpoint 2m'
'printim gfs_dew'i'.png x900 y675'

i = i+1
endwhile

****************************************
* PRECIP
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setBLUEcols(1)

'set t 'i

*'define dew  = const((dewpt(tmp2m,rh2m)-273.16),0,-u)'
'set gxout shaded'
'set csmooth on'
'set clevs 0 0.1 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20'
'set ccols 0 90 88 86 84 82 80 78 76 74 72 70 68 67 66 65 64 62 61 60 59 58 57 56 54'
'd apcpsfc'

'set gxout contour'
'set ccolor 2'
'set clab off'
'set cmax 1'
'set cmin 1'
'set clopts 0'
'd acpcpsfc'

'cbarn'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 mm'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 3hr Precipitation'
'set string 2 l 3 0' ; 'draw string 2.4 0.6 [Convective in red]'
'printim gfs_prec'i'.png x900 y675'

i = i+1
endwhile

****************************************
* CLOUD COVER
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setBLUEcols(1)

'set t 'i

*'define dew  = const((dewpt(tmp2m,rh2m)-273.16),0,-u)'
'set gxout shaded'
'set csmooth on'
'set map 16'
'set clevs 0 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100'
'set ccols 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 0'
'd tcdcclm'

'set gxout contour'

'set ccolor 16'
'set cint 10'
'set clopts 1'
*'d dew'

'cbarn'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 % of sky'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Cloud cover'
'printim gfs_clouds'i'.png x900 y675'

i = i+1
endwhile


****************************************
* 4 LAYER LIFTED INDEX
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define av4li = (no4lftxsfc+lftxsfc)/2'
'set gxout shaded'
'set csmooth on'
'set clevs -9.25 -9 -8.75 -8.5 -8.25 -8 -7.75 -7.5 -7.25 -7 -6.25 -6.5 -6-25 -6 -5.75 -5.5 -5.25 -5 -4.75 -4.5 -4.25 -4 -3.75 -3.5 -3.25 -3 -2.75 -2.5 -2.25 -2 -1.75 -1.5 -1.25 -1 -0.75 -0.5 -0.25 0'
'set ccols 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 0'
'd av4li'

*'set gxout contour'
*'set ccolor 0'
*'set cmax 0'
*'set cmin -25'
*'set cint 1'
*'set clab on'
*'d no4lftxsfc'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 K'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Av 4 layer Lifted index'
'printim gfs_li'i'.png x900 y675'

i = i+1
endwhile

****************************************
* CAPE
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define abssbcape = (capesfc-cinsfc)'
'define absmlcape = (cape180_0mb-cin180_0mb)'
'define avcape = (abssbcape+absmlcape)/2'
'define av4li = (no4lftxsfc+lftxsfc)/2'
'set gxout shaded'
'set csmooth on'
'set clevs 100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000 2100 2200 2300 2400 2500'
'set ccols 0 18 20 22 24 26 28 30 32 34 36 38 40 42 43 44 45 46 47 48 49 50 51 52 53 54'
'd avcape'

'cbarm'

'set gxout contour'
'set clab masked'
'set ccolor 0'
'set clopts 1'
'set cmax -1'
'set cmin -20'
'set cint 1'
'd av4li'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 j/kg'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Av CAPE + Av 4 Layer Lifted Exp.'
'printim gfs_cape'i'.png x900 y675'

i = i+1
endwhile

****************************************
* THOMPSON INDEX & CAPE
****************************************

  i = 1
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setBLUEcols(1)

'set t 'i

'define li=no4lftxsfc'
'set lev 850'
'define t850=tmpprs-273.16'
'define rh850=rhprs'
'define td850 = t850-((14.55+0.114*t850)*(1-0.01*rh850)+pow((2.5+0.007*t850)*(1-0.01*rh850),3)+(15.9+0.117*t850)*pow((1-0.01*rh850),14))'
'set lev 700'
'define t700=tmpprs-273.16'
'define rh700=rhprs'
'define td700 = t700-((14.55+0.114*t700)*(1-0.01*rh700)+pow((2.5+0.007*t700)*(1-0.01*rh700),3)+(15.9+0.117*t700)*pow((1-0.01*rh700),14))'
'set lev 500'
'define t500=tmpprs-273.16'
'define kindex=t850-t500+td850-t700+td700'
'set gxout shaded'
'set csmooth on'
'set clevs 20 25 35 40'
'set ccols 0 3 7 8 2'
'd kindex-li'

'cbarn'

'set gxout contour'
'set ccolor 4'
'd capesfc'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) http://home.onego.ru/~gasha'

'set strsiz 0.12'
*'set string 1 r 3 90' ; 'draw string 9.9 4.6 mm'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Thompson index & CAPE'
'printim gfs_thompson'i'.png x900 y675'

i = i+1
endwhile

****************************************
* SF CINH
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define owncin  = ((cinsfc+cin180_0mb)/2)'
'set gxout shaded'
'set csmooth on'
'set clevs -500 -475 -450 -425 -400 -375 -350 -325 -300 -275 -250 -225 -200 -180 -160 -140 -120 -100 -90 -80 -70 -60 -50 -40 -30 -20 -10 -9 -8 -7 -6 -5 -4 -3 -2'
'set ccols 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 38 37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20 19 0'
'd owncin'

'set clab on'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 2 90' ; 'draw string 9.9 4.6 j/kg'
'set string 1 r 2 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 2 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Av CINH'
'printim gfs_cinh'i'.png x900 y675 x900 y675'

i = i+1
endwhile

****************************************
* STORMINDEX
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'define ts = tsindex(cape180_0mb,cin180_0mb)'
'set gxout shaded'
'set csmooth on'
'set clevs -3 -2.8 -2.6 -2.4 -2.2 -2 -1.8 -1.6 -1.4 -1.2 -1 -0.8 -0.6 -0.4 -0.2 0 0.2 0.4 0.6 0.8 1 1.2 1.4 1.6 1.8 2 2.2 2.4 2.6 2.8 3'
'set ccols 0 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54'
'd ts'

'set gxout contour'
'set ccolor 0'
'set clopts 1'
*'d no4lftxsfc'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 '
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Schlenczek Thunderstorm Index'
'printim gfs_ts'i'.png x900 y675'

i = i+1
endwhile

****************************************
* INSTABILITY
****************************************

  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'set lev 850'
'tmp850mb = tmpprs'
'rh850mb = rhprs'
'set lev 500'
'tmp500mb = tmpprs'
'rh500mb = rhprs''
'define in = epi(tmp850mb,rh850mb,tmp500mb,rh500mb)'
'set gxout shaded'
'set csmooth on'
'set clevs -34 -32 -30 -28 -26 -24 -22 -20 -18 -16 -14 -12 -10 -8 -6 -4 -2 0 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34'
'set ccols 54 52 50 48 46 44 42 40 38 36 34 32 30 28 26 24 22 20 18 88 87 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71'
'd in'

'set gxout contour'

'set ccolor 0'
'set clopts 1'
*'d no4lftxsfc'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 K'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Potential Instability'
'printim gfs_in'i'.png x900 y675'

i = i+1
endwhile

****************************************
* LOW LEVEL SHEAR
****************************************
  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'set gxout shaded'
'set csmooth on'

'define she = const(shear(ugrdprs(lev=900),vgrdprs(lev=900),ugrd10m,vgrd10m),0,-u)'
'set clevs 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30'
'set ccols 0 80 82 84 86 88 19 21 23 25 27 29 31 32 33 34 35 36 37 38 40 41 42 43 44 46 48 49 50 51 52 53 54'
'd she'

'cbarm'

'set gxout contour'
'set ccolor 0'
'set clopts 1'
'set cmax 20'
'set cmin 10'
'set cint 10'
*'d she'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m/s'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Low Level Shear 0-1km'
'printim gfs_lls'i'.png x900 y675'

i = i+1
endwhile

****************************************
* DEEP LEVEL SHEAR
****************************************
  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'set gxout shaded'
'set csmooth on'

'define she = const(shear(ugrdprs(lev=450),vgrdprs(lev=450),ugrd10m,vgrd10m),0,-u)'
'set clevs 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45'
'set ccols 0 80 81 82 83 84 85 86 87 88 89 90 17 18 19 20 21 22 23 24 25 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 48 49 50 51 52 53 54'
'd she'

'cbarm'

'set gxout contour'
'set ccolor 0'
'set clopts 1'
'set cmax 20'
'set cmin 18'
'set cint 2'
*'d she'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m/s'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Deep Layer Shear 0-6km'
'printim gfs_dls'i'.png x900 y675'

i = i+1
endwhile

****************************************
* SRH
****************************************
  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'set gxout shaded'
'set csmooth on'

'set clevs -100 100 125 150 175 200 225 250 275 300 325 350 375 400 425 450 475 500 525 550 575 600 625 650 675 700 725 750 775 800 825 850 875 900 925 950'
'set ccols 85   0  18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50  51  52  53  54'

'd hlcy3000_0m'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m^2/s^2'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Storm Relative Helicity 0-3km'
'printim gfs_srh'i'.png x900 y675'

i = i+1
endwhile

****************************************
* SRH 1KM
****************************************
  i = 3
  while ( i<maps )

* Set up a few preliminary characteristics
setmap(1)
setNWNcols(1)

'set t 'i

'set gxout shaded'
'set csmooth on'


'set clevs -100 100 125 150 175 200 225 250 275 300 325 350 375 400 425 450 475 500 525 550 575 600 625 650 675 700 725 750 775 800 825 850 875 900 925 950'
'set ccols 85   0  18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50  51  52  53  54'
'd hlcy1000_0m'

'cbarm'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 3 0' ; 'draw string 9.35 0.95 Map (c) Finnish WX-server/nordicweather.net'

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m^2/s^2'
'set string 1 r 3 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 3 0' ; 'draw string 0.15 0.2 Data: NOAA GFS model, run: 'huh

* Draw Labels at the top of the page
'set string 1 r 11 0'
'set strsiz 0.14'
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Storm Relative Helicity 0-1km'
'printim gfs_srh1km'i'.png x900 y675'

i = i+1
endwhile

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* END OF MAIN SCRIPT
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function setmap(args)
'set mproj nps'
'set mpvals 15 52 54 71'
'set lon -60 100'
'set lat 43 90'
'set mpdset hires'

'set rgb 98 238 238 238'
'set display color white'
'set background 98'
'c'
'set grads off'

'set parea 0.02 9.54 0.8 8.50'
'set rgb 99 1 1 1'
'set line 99 1 6'
*'draw rec 0.02 0.02 9.54 0.81'
*'draw rec 9.54 0.02 10.99 8.48'

return

function setNWNcols(args)
'set rgb 99 1 1 1'
'set rgb 16 100 100 100'

*Green
'set rgb 17 170 246 130'
'set rgb 18 175 244 116'
'set rgb 19 180 242 102'
'set rgb 20 190 241 88'
'set rgb 21 200 240 74'
'set rgb 22 210 238 60'
'set rgb 23 220 236 46'
'set rgb 24 230 235 32'
'set rgb 25 235 232 22'
'set rgb 26 244 230 11'

'set rgb 27 244 217 11'
'set rgb 28 244 203 11'
'set rgb 29 244 189 11'
'set rgb 30 244 176 11'
'set rgb 31 244 162 11'
'set rgb 32 244 149 11'
'set rgb 33 244 136 11'
'set rgb 34 244 122 11'
'set rgb 35 244 109 11'
'set rgb 36 244 95 11'
'set rgb 37 244 82 11'
'set rgb 38 244 68 11'
'set rgb 39 244 61 11'
'set rgb 40 232 55 9'
'set rgb 41 220 39 8'
'set rgb 42 206 32 7'
'set rgb 43 196 26 10'
'set rgb 44 186 19 15'
'set rgb 45 175 15 20'
'set rgb 46 165 11 25'
'set rgb 47 165 6 30'
'set rgb 48 170 2 35'
'set rgb 49 180 1 40'
'set rgb 50 190 0 50'
'set rgb 51 200 0 60'
'set rgb 52 210 0 70'
'set rgb 53 220 0 80'
'set rgb 54 230 0 90'
*Dark red

*Dark Blue

'set rgb 55 180 20 185'
'set rgb 56 165 16 174'
'set rgb 57 150 12 163'
'set rgb 58 135 8 152'
'set rgb 59 120 4 141'

'set rgb 60 100 0 127'
'set rgb 61 87 0 127'
'set rgb 62 75 0 127'
'set rgb 63 62 0 127'
'set rgb 64 50 0 127'
'set rgb 65 37 0 127'
'set rgb 66 25 0 127'
'set rgb 67 12 0 127'
'set rgb 68 0 0 127'

'set rgb 69 0 24 127'
'set rgb 70 0 30 127'
'set rgb 71 0 40 127'
'set rgb 72 0 50 127'
'set rgb 73 0 60 127'
'set rgb 74 0 70 127'

'set rgb 75 0 82 143'
'set rgb 76 0 98 175'
'set rgb 77 0 114 207'
'set rgb 78 0 130 239'
'set rgb 79 19 146 255'
'set rgb 80 37 154 255'

'set rgb 81 73 172 255'
'set rgb 82 91 180 255'
'set rgb 83 109 188 255'
'set rgb 84 127 196 255'
'set rgb 85 145 204 255'
'set rgb 86 154 208 255'
'set rgb 87 163 212 255'
'set rgb 88 181 220 255'
'set rgb 89 199 228 255'
'set rgb 90 217 236 255'
*Light blue

return

function setBLUEcols(args)

*Dark Blue
'set rgb 56 100 0 127'
'set rgb 57 75 0 127'
'set rgb 58 50 0 127'
'set rgb 59 25 0 127'
'set rgb 60 0 0 127'
'set rgb 61 0 24 127'
'set rgb 62 0 50 127'
'set rgb 63 0 74 127'
'set rgb 64 0 82 143'
'set rgb 65 0 90 159'
'set rgb 66 0 98 175'
'set rgb 67 0 106 191'
'set rgb 68 0 114 207'
'set rgb 69 0 122 223'
'set rgb 70 0 130 239'
'set rgb 71 0 138 255'
'set rgb 72 19 146 255'
'set rgb 73 37 154 255'
'set rgb 74 55 162 255'
'set rgb 75 73 172 255'
'set rgb 76 82 176 255'
'set rgb 77 91 180 255'
'set rgb 78 100 184 255'
'set rgb 79 109 188 255'
'set rgb 80 118 192 255'
'set rgb 81 127 196 255'
'set rgb 82 136 200 255'
'set rgb 83 145 204 255'
'set rgb 84 154 208 255'
'set rgb 85 163 212 255'
'set rgb 86 172 216 255'
'set rgb 87 181 220 255'
'set rgb 88 190 224 255'
'set rgb 89 199 228 255'
'set rgb 90 208 232 255'
'set rgb 91 217 236 255'
'set rgb 92 226 240 255'
'set rgb 93 235 244 255'
'set rgb 94 244 248 255'
'set rgb 95 253 252 255'
*Light blue

return

function setBLACKcols(args)

'set rgb 50 1 1 1'
'set rgb 51 11 11 11'
'set rgb 52 23 23 23'
'set rgb 53 34 34 34'
'set rgb 54 46 46 46'
'set rgb 55 57 57 57'
'set rgb 56 69 69 69'
'set rgb 57 80 80 80'
'set rgb 58 91 91 91'
'set rgb 59 102 102 102'
'set rgb 60 114 114 114'
'set rgb 61 126 126 126'
'set rgb 62 138 138 138'
'set rgb 63 150 150 150'
'set rgb 64 161 161 161'
'set rgb 65 173 173 173'
'set rgb 66 185 185 185'
'set rgb 67 196 196 196'
'set rgb 68 207 207 207'
'set rgb 69 219 219 219'
'set rgb 70 231 231 231'
'set rgb 71 242 242 242'
'set rgb 72 254 254 254'

return

function setcols(args)

'set rgb 175 73 172 255'
'set rgb 176 82 176 255'
'set rgb 177 91 180 255'
'set rgb 178 100 184 255'
'set rgb 179 109 188 255'
'set rgb 180 118 192 255'
'set rgb 181 127 196 255'
'set rgb 182 136 200 255'
'set rgb 183 145 204 255'
'set rgb 184 154 208 255'
'set rgb 185 163 212 255'
'set rgb 186 172 216 255'
'set rgb 187 181 220 255'
'set rgb 188 190 224 255'
'set rgb 189 199 228 255'
'set rgb 190 208 232 255'
'set rgb 191 217 236 255'
'set rgb 192 226 240 255'
'set rgb 193 235 244 255'
'set rgb 194 244 248 255'
'set rgb 195 253 252 255'
*Light blue


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
