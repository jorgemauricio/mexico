function cone(args)



*DEFAULT OPTIONS
fill=1              ;*Choose To fill the Cone
circ=1              ;*Draw Semi-Circle at the end of the cone
col1=1              ;*Color of the Lines (Skeleton) of the cone
colf=4              ;*Fill Color
error=50            ;*Radial Error (in units below)
dunit='mi'          ;*Distance Units for error
tunit='hr'          ;*Time Units for error
tint=8              ;*Time intervals to plot storm center: In model time-steps
maxtime=6           ;*Max Times to Plot (in model time steps)
error_reduct=5      ;*In % of total error.  e.g. a 10% error reduction on an error of 100 miles would lower your error by 10 miles per day.
minmax='L'          ;*Look for Minimum value of Maximum value in variable.

A=6371229
PI=3.141592654
D2R=PI/180
R2D=180/PI


check=1
a=1

'q dims'
lonline=sublin(result,2)
latline=sublin(result,3)

lons=subwrd(lonline,6)' 'subwrd(lonline,8)
lats=subwrd(latline,6)' 'subwrd(latline,8)

minlon=subwrd(lons,1)
maxlon=subwrd(lons,2)
minlat=subwrd(lats,1)
maxlat=subwrd(lats,2)


var=subwrd(args,1)

if(var='')
  say 'You have not included a variable from the datafile'
  return
endif


while(check=1)
  line=subwrd(args,a)

  if(line='');break;endif


  if(line='-help')
    help()
    return
  endif



***TIME OPTIONS/Settings

  if(line='-tint')
    val=subwrd(args,a+1)
    if(valnum(val)!=0)
      tint=val
    else
      say 'Improper variable type for time interval, leaving as default: 'tint
    endif
  endif

  if(line='-tunit')
    val=subwrd(args,a+1)
    if(valnum(val)=0)
      tunit=val
    else
      say 'Improper variable type for time unit, leaving as default: 'tunit
    endif
  endif

  if(line='-max' | line='-end' | line='-maxtime')
    val=subwrd(args,a+1)
    if(valnum(val)!=0)
     maxtime=val
    else
      say 'Improper variable type for number of time steps, leaving as default: 'maxtime
    endif
   endif


*******

*******COLOR AND FILL OPTIONS

  if(line='-circle' | line='-circ')
    circle=1
  endif

 
  if(line='-fill')
    fill=1
  endif 

  if(line='-fillcol' | line='-fcol')
      val=subwrd(args,a+1)
    if(valnum(val)!=0)
      colf=val
    else
      say 'Improper variable type for Fill Color, leaving as default: 'colf
    endif
  endif 

  if(line='-linecol' | line='-lcol')
      val=subwrd(args,a+1)
    if(valnum(val)!=0)
      col1=val
    else
      say 'Improper variable type for Line Color, leaving as default: 'col1
    endif
  endif 


******************************


***LAT/LON BOUNDS

  if(line='-minlat' | line='-mnlt')
    val=subwrd(args,a+1)
    if(valnum(val)!=0)
     minlat=val
    else
      say 'Improper variable type for minlat, leaving as default: 'minlat
    endif
  endif

  if(line='-maxlat' | line='-mxlt')
    val=subwrd(args,a+1)
    if(valnum(val)!=0)
     maxlat=val
    else
      say 'Improper variable type for maxlat, leaving as default: 'maxlat
    endif
  endif

  if(line='-minlon' | line='-mnln')
    val=subwrd(args,a+1)
    if(valnum(val)!=0)
     minlon=val
    else
      say 'Improper variable type for minlon, leaving as default: 'minlon
    endif
  endif

  if(line='-maxlon' | line='-mxln')
    val=subwrd(args,a+1)
    if(valnum(val)!=0)
     maxlon=val
    else
      say 'Improper variable type for maxlon, leaving as default: 'maxlon
    endif
  endif

*****

*****ERROR/UNITS

  if(line='-error' | line='-e')
    val=subwrd(args,a+1)
    uval=subwrd(args,a+2)
    if(valnum(val)!=0)
     error=val
    else
      say 'Improper variable type for Error, leaving as default: 'error
    endif
    if(valnum(uval)=0)
      tunit=uval
    else
      say 'Improper variable type for Distance Unit, leaving as default: 'dunit
    endif
  endif



  if(line='-error_reduct' | line='-e_reduct')
    val=subwrd(args,a+1)
    if(valnum(val)!=0)
     error_reduct=val
    else
      say 'Improper variable type for Error Reduction, leaving as default: 'error_reduct
    endif
  endif


****************

  if(line='-var_att')
    val=subwrd(args,a+1)
    if(val!='L'| val !='H')
      say 'Improper variable type for Min/Max, leaving as default: 'minmax
    else
      minmax=val
    endif
  endif

a=a+1
endwhile


if(tunit='da' | tunit='day')
  error=error/24
endif

if(tunit='mn' | tunit='min')
  error=error*60
endif


'q ctlinfo'

c=1
check=1
while(check=1)
  time=sublin(result,c)
  if(subwrd(time,1)='tdef');check=0;break;else
    c=c+1
  endif
endwhile

timestep=subwrd(time,5)
strlen=math_strlen(timestep)
tunit=substr(timestep,strlen-1,2)
tstep=substr(timestep,1,strlen-2)


if(tunit!='da' & tunit!='hr' & tunit!='mn');
  say '!!!!!!!!!!!!WARNING!!!!!!!!!!!!!!!!'
  say 'The unit of in the .ctl or .cdf file is not a valid unit of time for this script.'
  say 'The unit of time is 'tunit'.  Accepted units are da, hr, mn'
  say 'Setting the time unit to hours (hr): 'tstep
  say '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
  tunit='hr'
endif


xpos1=''
ypos1=''
xpos2=''
ypos2=''

l=1
d=error

*CONVERSION*


*CONVERT TIME TO HOURS*

if(tunit='mn')
  tfact=(tstep/60)
endif

if(tunit='hr')
  tfact=1*tstep
endif

if(tunit='da')
  tfact=24*tstep
endif

************************


*CONVERT DISTANCE TO METERS*

if(dunit='m' | dunit='meters' | dunit='M' | dunit='Meters')
  dfact=1
endif

if(dunit='mi' | dunit='miles' | dunit='Mi' | dunit='Meters')
  dfact=1609.34
endif

if(dunit='km' | dunit='Km')
  dfact=1000
endif



'q gxinfo'
xline=sublin(result,3)
yline=sublin(result,4)

xpgs=subwrd(xline,4)' 'subwrd(xline,6)
ypgs=subwrd(yline,4)' 'subwrd(yline,6)


'q dims'
timestring=sublin(result,5)
timestart=subwrd(timestring,9)
totalsteps=l+maxtime-1

lats=''
lons=''


while(l<=totalsteps)

  'set t 'timestart+(l-1)*tint
  'set lat 'minlat' 'maxlat
  'set lon 'minlon' 'maxlon

  'mfhilo 'var' CL 'minmax' 1000, 300'
  data=sublin(result,2)

  lats=lats''subwrd(data,2)' '
  lons=lons''subwrd(data,3)' '

 
  'q w2xy 'subwrd(lons,l)' 'subwrd(lats,l)
  xpos2=subwrd(result,3)
  ypos2=subwrd(result,6)
  lat=subwrd(lats,l)
  lon=subwrd(lons,l)

  if(l=1)
    x0loc1=xpos2
    x0loc2=xpos2
    y0loc1=ypos2
    y0loc2=ypos2
  endif

  dist=d*dfact*tfact*tint                         ;*In Meters


  if(l>1)
    dlat=subwrd(lats,l)-subwrd(lats,l-1)
    dlon=subwrd(lons,l)-subwrd(lons,l-1)
    theta=R2D*math_atan2(dlat,dlon)
    phi=theta-90
    theta=phi-180

    dx1=dist*math_cos(D2R*phi)
    dx2=dist*math_cos(D2R*theta)
   
    dy1=dist*math_sin(D2R*phi)
    dy2=dist*math_sin(D2R*theta)

    lon1=lon+dx1/(D2R*A*math_cos(lat*D2R))
    lat1=lat+dy1/(D2R*A)

    lon2=lon+dx2/(D2R*A*math_cos(lat*D2R))
    lat2=lat+dy2/(D2R*A)


    'q w2xy 'lon1' 'lat1
     locx1=subwrd(result,3)
     locy1=subwrd(result,6)


    'q w2xy 'lon2' 'lat2
     locx2=subwrd(result,3)
     locy2=subwrd(result,6)


******CLIPPING**************


  if(locx2>subwrd(xpgs,2))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    xdif=locx2-subwrd(xpgs,2)
    locx2=subwrd(xpgs,2)
    locy2=locy2-xdif*slope_ratio
  endif

  if(locx1>subwrd(xpgs,2))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    xdif=locx1-subwrd(xpgs,2)
    locx1=subwrd(xpgs,2)
    locy1=locy1-xdif*slope_ratio
  endif

  if(xpos2>subwrd(xpgs,2))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    xdif=xpos2-subwrd(xpgs,2)
    xpos2=subwrd(xpgs,2)
    ypos2=ypos2-xdif*slope_ratio
  endif



  if(locx2<subwrd(xpgs,1))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    xdif=locx2-subwrd(xpgs,1)
    locx2=subwrd(xpgs,1)
    locy2=locy2-xdif*slope_ratio
  endif

  if(locx1<subwrd(xpgs,1))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    xdif=locx1-subwrd(xpgs,1)
    locx1=subwrd(xpgs,1)
    locy1=locy1-xdif*slope_ratio
  endif

  if(xpos2<subwrd(xpgs,1))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    xdif=xpos2-subwrd(xpgs,1)
    xpos2=subwrd(xpgs,1)
    ypos2=ypos2-xdif*slope_ratio
  endif




  if(locy2>subwrd(ypgs,2))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    ydif=locy2-subwrd(ypgs,2)
    locy2=subwrd(ypgs,2)
    locx2=locx2-ydif/slope_ratio
  endif

  if(locy1>subwrd(ypgs,2))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    ydif=locy1-subwrd(ypgs,2)
    locy1=subwrd(ypgs,2)
    locx1=locx1-ydif/slope_ratio
  endif

  if(ypos2>subwrd(ypgs,2))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    ydif=ypos2-subwrd(ypgs,2)
    ypos2=subwrd(ypgs,2)
    xpos2=xpos2-ydif/slope_ratio
  endif




  if(locy2<subwrd(ypgs,1))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    ydif=locy2-subwrd(ypgs,1)
    locy2=subwrd(ypgs,1)
    locx2=locx2-ydif/slope_ratio
  endif

  if(locy1<subwrd(ypgs,1))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    ydif=locy1-subwrd(ypgs,1)
    locy1=subwrd(ypgs,1)
    locx1=locx1-ydif/slope_ratio
  endif

  if(ypos2<subwrd(ypgs,1))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    ydif=ypos2-subwrd(ypgs,1)
    ypos2=subwrd(ypgs,1)
    xpos2=xpos2-ydif/slope_ratio
  endif


*****************************

    if(l=2)

      if(fill=1)
        'set line 'colf
        'draw polyf 'xpos1' 'ypos1' 'locx1' 'locy1' 'locx2' 'locy2' 'xpos1' 'ypos1
      endif

      'set line 'col1
      'draw line 'xpos1' 'ypos1' 'locx1' 'locy1
      'draw line 'xpos1' 'ypos1' 'locx2' 'locy2


    else
  
      if(fill=1)
        'set line 'colf
        'draw polyf 'x0loc1' 'y0loc1' 'locx1' 'locy1' 'locx2' 'locy2' 'x0loc2' 'y0loc2' 'x0loc1' 'y0loc1
      endif

      'set line 'col1
      'draw line 'x0loc1' 'y0loc1' 'locx1' 'locy1
      'draw line 'x0loc2' 'y0loc2' 'locx2' 'locy2

    endif


    x0loc1=locx1
    x0loc2=locx2
    y0loc1=locy1
    y0loc2=locy2
  
    'set line 'col1
    'draw line 'xpos1' 'ypos1' 'xpos2' 'ypos2
    'draw line 'locx1' 'locy1' 'locx2' 'locy2


     d=d+(error-(error_reduct/100)*error*l)
  endif

  'set line 'col1
  'draw mark 3 'xpos2' 'ypos2' 0.12'
  
  ypos1=ypos2
  xpos1=xpos2


  l=l+1

endwhile




if(circ=1);* & ypos2 < subwrd(ypgs,2) & ypos2 > subwrd(ypgs,1) & xpos2 < subwrd(xpgs,2) & xpos2 > subwrd(xpgs,1))

  circle_x=x0loc1
  circle_y=y0loc1
  circle_poly=x0loc1' 'y0loc1

  xdist=x0loc2-x0loc1
  ydist=y0loc2-y0loc1

  radius=math_sqrt(xdist*xdist+ydist*ydist)/2

  angle = phi
  amax= angle+180
  while( angle <= amax )
    x = xpos1 + radius * math_cos( angle * D2R )
    y = ypos1 + radius * math_sin( angle * D2R )


****CLIPPING*****

    if(x<subwrd(xpgs,1) | x >subwrd(xpgs,2))
      if(x<subwrd(xpgs,1));x = subwrd(xpgs,1);endif
      if(x>subwrd(xpgs,2));x = subwrd(xpgs,2);endif
    endif


    if(y<subwrd(ypgs,1) | y >subwrd(ypgs,2))
      if(y<subwrd(ypgs,1));y = subwrd(ypgs,1);endif
      if(y>subwrd(ypgs,2));y = subwrd(ypgs,2);endif
    endif

*****************

    circle_x = circle_x' 'x
    circle_y = circle_y' 'y
    circle_poly=circle_poly' 'x' 'y
    angle = angle + 1
  endwhile

    circle_x = circle_x' 'x0loc2
    circle_y = circle_y' 'y0loc2
    circle_poly=circle_poly' 'x0loc2' 'y0loc2
     

  if(fill=1)
    'set line 'colf
    'draw polyf 'circle_poly
  endif


  check=1
  c=2
  while(check=1)
    if(subwrd(circle_x,c)!='')
      'set line 'col1
      'draw line 'subwrd(circle_x,c-1)' 'subwrd(circle_y,c-1)' 'subwrd(circle_x,c)' 'subwrd(circle_y,c)
    else
      check=0
    endif
    c=c+1
  endwhile



endif


***RE-DRAW LINES***
if(fill=1)


l=1
d=error
while(l<=totalsteps)

  'q w2xy 'subwrd(lons,l)' 'subwrd(lats,l)
  xpos2=subwrd(result,3)
  ypos2=subwrd(result,6)
  lat=subwrd(lats,l)
  lon=subwrd(lons,l)
  
  dist=d*dfact*tfact*tint                         ;*In Meters

  if(l>1)
    dlat=subwrd(lats,l)-subwrd(lats,l-1)
    dlon=subwrd(lons,l)-subwrd(lons,l-1)
    theta=R2D*math_atan2(dlat,dlon)
    phi=theta-90
    theta=phi-180

    dx1=dist*math_cos(D2R*phi)
    dx2=dist*math_cos(D2R*theta)
   
    dy1=dist*math_sin(D2R*phi)
    dy2=dist*math_sin(D2R*theta)


    lon1=lon+dx1/(D2R*A*math_cos(lat*D2R))
    lat1=lat+dy1/(D2R*A)

    lon2=lon+dx2/(D2R*A*math_cos(lat*D2R))
    lat2=lat+dy2/(D2R*A)


    'q w2xy 'lon1' 'lat1
     locx1=subwrd(result,3)
     locy1=subwrd(result,6)


    'q w2xy 'lon2' 'lat2
     locx2=subwrd(result,3)
     locy2=subwrd(result,6)

******CLIPPING**************


  if(locx2>subwrd(xpgs,2))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    xdif=locx2-subwrd(xpgs,2)
    locx2=subwrd(xpgs,2)
    locy2=locy2-xdif*slope_ratio
  endif

  if(locx1>subwrd(xpgs,2))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    xdif=locx1-subwrd(xpgs,2)
    locx1=subwrd(xpgs,2)
    locy1=locy1-xdif*slope_ratio
  endif

  if(xpos2>subwrd(xpgs,2))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    xdif=xpos2-subwrd(xpgs,2)
    xpos2=subwrd(xpgs,2)
    ypos2=ypos2-xdif*slope_ratio
  endif



  if(locx2<subwrd(xpgs,1))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    xdif=locx2-subwrd(xpgs,1)
    locx2=subwrd(xpgs,1)
    locy2=locy2-xdif*slope_ratio
  endif

  if(locx1<subwrd(xpgs,1))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    xdif=locx1-subwrd(xpgs,1)
    locx1=subwrd(xpgs,1)
    locy1=locy1-xdif*slope_ratio
  endif

  if(xpos2<subwrd(xpgs,1))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    xdif=xpos2-subwrd(xpgs,1)
    xpos2=subwrd(xpgs,1)
    ypos2=ypos2-xdif*slope_ratio
  endif




  if(locy2>subwrd(ypgs,2))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    ydif=locy2-subwrd(ypgs,2)
    locy2=subwrd(ypgs,2)
    locx2=locx2-ydif/slope_ratio
  endif

  if(locy1>subwrd(ypgs,2))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    ydif=locy1-subwrd(ypgs,2)
    locy1=subwrd(ypgs,2)
    locx1=locx1-ydif/slope_ratio
  endif

  if(ypos2>subwrd(ypgs,2))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    ydif=ypos2-subwrd(ypgs,2)
    ypos2=subwrd(ypgs,2)
    xpos2=xpos2-ydif/slope_ratio
  endif




  if(locy2<subwrd(ypgs,1))
    slope_ratio=(locy2-y0loc2)/(locx2-x0loc2)
    ydif=locy2-subwrd(ypgs,1)
    locy2=subwrd(ypgs,1)
    locx2=locx2-ydif/slope_ratio
  endif

  if(locy1<subwrd(ypgs,1))
    slope_ratio=(locy1-y0loc1)/(locx1-x0loc1)
    ydif=locy1-subwrd(ypgs,1)
    locy1=subwrd(ypgs,1)
    locx1=locx1-ydif/slope_ratio
  endif

  if(ypos2<subwrd(ypgs,1))
    slope_ratio=(ypos2-ypos1)/(xpos2-xpos1)
    ydif=ypos2-subwrd(ypgs,1)
    ypos2=subwrd(ypgs,1)
    xpos2=xpos2-ydif/slope_ratio
  endif


*****************************




    if(l=2)

      'set line 'col1
      'draw line 'xpos1' 'ypos1' 'locx1' 'locy1
      'draw line 'xpos1' 'ypos1' 'locx2' 'locy2


    else

      'set line 'col1
      'draw line 'x0loc1' 'y0loc1' 'locx1' 'locy1
      'draw line 'x0loc2' 'y0loc2' 'locx2' 'locy2

    endif


    x0loc1=locx1
    x0loc2=locx2
    y0loc1=locy1
    y0loc2=locy2
  
    'set line 'col1
    'draw line 'xpos1' 'ypos1' 'xpos2' 'ypos2
    'draw line 'locx1' 'locy1' 'locx2' 'locy2


     d=d+(error-(error_reduct/100)*error*l)
  endif

  'set line 'col1
  'draw mark 3 'xpos2' 'ypos2' 0.12'
  
  ypos1=ypos2
  xpos1=xpos2

  l=l+1

endwhile

endif

'set lat 'lats
'set lon 'lons
****


function help()
  say '---------------------------------------------------'
  say '|                                                 |'
  say '|                 Cone.gs v1.0                    |'
  say '|                 July 2013                       |'
  say '---------------------------------------------------'
  say 'Usage:'
  say 'Draws an uncertainly cone of projected storm track:'
  say ''
  say 'Required: variable'
  say ''
  say 'Example: "cone prmslmsl"'
  say '  -Draws cone by finding minimum value in surface  '
  say '   pressure.'
  say '---------------------------------------------------'
  say ''
  say 'Optional: -help         - Pulls up this Help Page'
  say ''
  say '          BASIC OPTIONS:'
  say '          -fill         - Fills cone with color specified by fillcol/fcol'
  say '          -circle/circ  - Draws semi-circle at end of cone'
  say '          -fillcol/fcol - Sets color for fill option'
  say '          -linecol/lcol - Sets color for the lines'
  say ''
  say '          BOUNDARY/VARIABLE OPTIONS'
  say '          -var_att      - Only values of "L" or "H" are accepted, looks for high'
  say '                          or low values in the variable.'
  say '          -minlat/mnlt  - Sets min lat value to look for max/min values'
  say '          -maxlat/mxlt  - Sets max lat value to look for max/min values'
  say '          -minlon/mnln  - Sets min lon value to look for max/min values'
  say '          -maxlon/mxln  - Sets max lon value to look for max/min values'
  say '                        - Default is currently scaled domain'
  say ''
  say '          ERROR OPTIONS:'
  say '          -error/e      - Defines radial error value in the units specified below'
  say '          -tunit        - Time unit for error value'
  say '          -dunit        - Distance unit for error value'
  say '                        - Example: error=40, dunit="km", tunit="day"'
  say '                                   Error will increase 40km/day'
  say '          -error_reduct - Reduction in error (in %/timestep)'
  say '                        - Helps keep cone from spreading exponentially'
  say '                        - Example : error_reduct=10 error=100      '
  say '                          step 1: e=100, step 2: e=90, step 3: e=80'
  say ''
  say '          TIME OPTIONS:'
  say '          -tint         -Skip Interval in time steps '
  say '          -maxtime/end  -Total number of time steps to plot cone for'        
  say ''
  say ''
  say '---------------------------------------------------'
  say ''
  say 'Example: cone prmslmsl -e 50 -tunit day -dunit mi -e_reduct 7 -end 6 -tint 8'
  say '         Assuming the model timestep is 3 hours, this will plot an uncertainty cone'
  say '         with a starting error of 50 miles per day with a 7% daily reduction in error'
  say '         The time interval of 8 means it will move in daily intervals (8*3) for 6 days'
  say '         The spaitial domain will match the pre-determined scale.'
  say ''
  say ''
  say 'GENERAL NOTES:'
  say ''
  say 'Version 1.0: Orginially Developed by GrADS-Aholic: July 2013'
  say ''
  say '-The distances descibed by the error values appear to be pretty accurat, though the distance on the longitude circle just'
  say ' takes the nearest latitude value, not an exact so it might be slightly off.'
  say '-There is clipping in this script, though it is not perfect, avoid excess interaction with the plot boundary.'
  say '-Cones Start to look Funky if they become massive, this  can be counteracted by reducing the error, or increasing the error reduction'
  say '-The option for the invisible bounding box for your high/low Search helps you weed out artificial values that do not correspond with your storm.'
  say '-This script was originally developed to plot cones for Tropical Storms and Hurricanes, it has not been tested outside of that.'
  say ''
  say 'Please report any bugs to http://gradsaddict.blogspot.com/'
  return

