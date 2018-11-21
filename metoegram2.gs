########################################################
## METEOGRAMA WRF/00Z - Florianópolis/SC ##
## ##
## ELABORADO: MARCELO MORAES 26/10/06 ##
## RAFAEL BORGES ##
########################################################

'reinit'
*
* initial pos x
_xi=0.8
* final pos x
_xf=10.1
* initial pos y
*_yf=10.5
_yf=7.7
*_nmap=6
* tamanho mapa y
_dy=0.8
* distancia entre mapas
_int=0.7
_yi=_yf-_dy
#say '_yi=' _yi
* title size
_sti=0.13
* title color
_cti=1
* title thickness
_tti=1

*
'open wrfout.ctl'
*
* chamando mapas
*
*
'c'
'set t 1'
'q time'
anl=subwrd(result,3)

'set xlopts 1 1 0.11'
'set ylopts 1 1 0.11'
*'set strsiz 0.22'
'set strsiz 0.15'
'set font 3'

'set string 1 c 1'
'draw string 5.55 '_yf+0.6' Meteograma Florianopolis/SC - Modelo WRF(10km) - Analise 'anl'(GMT) '
*****************
'set z 1'
'set lat 21.89'
'set lon -102.29'
'set t 1 last'
*****************************************
*****************************************
** Pressão Atmosférica **
*****************************************
*****************************************

'gxprint wrf_florianopolis00_meteo.png'
'set vpage 0 11 0 8.5'
* 'set strsiz 0.09'
* 'set string 1 c 1'
'set ccolor 4'
'set parea '_xi' '_xf' '_yi' '_yf
'set gxout line'
'set grads off'
'set ylint 3'
'set cthick 4'
'set grid on 5 1'
'set cmark 2'
# 'set vrange 0 20'
* 'set xlab off'
'd slp'
'q gxinfo'
lin=sublin(result,3)
* say 'lin==' lin
xi=subwrd(lin,4)
xf=subwrd(lin,6)
lin=sublin(result,4)
yi=subwrd(lin,4)
yf=subwrd(lin,6)
* 'set strsiz '_sti
* 'set string '_cti' c '_tti
'set strsiz 0.09'
'set font 3'
* 'draw ylab Pressao \ atmosferica (hPa)'
'draw string 4.5 'yf+0.2' Pressao atmosferica (hPa)'
'set gxout line'
ret=mapas()
***********************************************
*****************************************
*****************************************
** Precipitação **
*****************************************
*****************************************
* 'set vpage '_xi' '_xf' '_yi' '_yf
'set vpage off'
'set parea '_xi' '_xf' '_yi' '_yf
'set ccolor 14'
'set ylint 4'
'set grads off'
# 'set xyrev on'
# 'set xlab on'
* 'set ylab on'
'define ch=((prcc+prc)-(prcc(t-1)+prc(t-1)))'
'set gxout bar'
# 'set grid on 5 1'
'set cmark 0'
'set vrange 0 20'
# 'set yaxis 0 20 4'
# 'set ylopts 2 3 0.11'
# 'set xlopts 0'
'd ch'
'q gxinfo'
lin=sublin(result,3)
xi=subwrd(lin,4)
xf=subwrd(lin,6)
lin=sublin(result,4)
yi=subwrd(lin,4)
yf=subwrd(lin,6)
* 'set strsiz '_sti
'set string '_cti' c '_tti
'draw string 4.5 'yf+0.2' Precipitacao (mm)'
ret=mapas()
***********************************************
***********************************************
*****************************************
*****************************************
** Temperatura 2m **
*****************************************
*****************************************

'set vpage off'
# say 'yi '_yi
# say 'yf '_yf
'set parea '_xi' '_xf' '_yi' '_yf
* 'set vpage '_xi' '_xf' '_yi' '_yf
'set gxout line'
'set grads off'
'set ccolor 2'
'set cthick 4'
'set ylint 2'
'd tsh-273.15'
'q gxinfo'
lin=sublin(result,3)
xi=subwrd(lin,4)
xf=subwrd(lin,6)
lin=sublin(result,4)
yi=subwrd(lin,4)
yf=subwrd(lin,6)
* 'set strsiz '_sti
'set strsiz 0.09'
'set string '_cti' c '_tti
* 'draw ylab Temperatura 2m (C)'
'draw string 4.5 'yf+0.2' Temperatura 2m (C)'
ret=mapas()

*****************************************
*****************************************
** Umidade Relativa **
*****************************************
*****************************************

'set vpage off'
'set parea '_xi' '_xf' '_yi' '_yf
'set gxout line'
'set grads off'
'set ccolor 14'
'set cthick 4'
'set ylint 10'
'set z 3'
'd rh'
'q gxinfo'
lin=sublin(result,3)
xi=subwrd(lin,4)
xf=subwrd(lin,6)
lin=sublin(result,4)
yi=subwrd(lin,4)
yf=subwrd(lin,6)
* 'set strsiz '_sti
'set string '_cti' c '_tti
* 'draw ylab Umidade \Relativa (%)'
'draw string 4.5 'yf+0.2' Umidade Relativa(%) a 850 hPa'
ret=mapas()

*****************************************
*****************************************
** Vento **
*****************************************
*****************************************
'set arrlab off'
'set vpage off'
winm=20
'q dims'
x1=sublin(result,2)
#say 'x1=' x1
x2=subwrd(x1,9)
#say 'x2=' x2
'set parea '_xi' '_xf' '_yi' '_yf
* 'set grads off'
'set ylint 3'
'set ccolor 4'
'set cmark 2'
'set grads off'
'set arrlab off'
'set cthick 4'
'd mag(u10m,v10m)'
'set cthick 4'
'set xyrev on'
'set x 'x2-0.5' 'x2+0.5
* 'set arrscl 7.35 'winm
'set arrscl 0.5 'winm
'set xlab on'
'set arrlab off'
'd u10m;v10m'
'q gxinfo'
lin=sublin(result,3)
xi=subwrd(lin,4)
xf=subwrd(lin,6)
lin=sublin(result,4)
yi=subwrd(lin,4)
yf=subwrd(lin,6)
'draw line 'xf-0.40' 'yi-0.1' 'xf-0.05' 'yi-0.1
'set strsiz 0.09'
'draw string 'xf-0.04' 'yi-0.09' >'
***************Coordenadas***********
ym=(yi+yf)/2
'draw mark 2 'xf+0.4' 'ym' 0.4'
'draw line 'xf+0.2' 'ym' 'xf+0.6' 'ym
'draw line 'xf+0.4' 'ym-0.2' 'xf+0.4' 'ym+0.2
'draw string 'xf+0.14' 'ym' W'
'draw string 'xf+0.66' 'ym' E'
'draw string 'xf+0.40' 'ym+0.26' N'
'draw string 'xf+0.40' 'ym-0.26' S'
*************************************
'set arrlab off'
* 'set strsiz '_sti
'draw string 'xf-0.2' 'yi-0.20' 'winm
'set string '_cti' c '_tti
* 'draw ylab Dir. e Vel.(Km/h)\ do Vento Medio'
'draw string 4.5 'yf+0.2' Direcao e Velocidade (mm/s) do Vento Medio'
ret=mapas()


'set string 2 r 1'
'set strsiz 0.10'
'draw string 10.0 0.1 Fonte: EPAGRI/CIRAM'
'set string 4 l 1'
'draw string 0.05 0.1 OBS: Dados Visualizados no horario UTC (-5 horas em relacao a hora local)'

*******************************************************************************
'set grads off'
** 'set cmark 3'
* 'set gxout linefill'
* 'set yaxis 0 100 20'
* 'set lfcols 81 0'
* 'set gxout bar'
* 'set ccolor 81'
'print'
'c'
*
'disable print wrf_florianopolis00_meteo.gmf'
'!/usr/local/bin/gxgif -r -i -x 532 -y 716 wrf_florianopolis00_meteo.gmf -o wrf_florianopolis00_meteo.gif'
*
'!rm -f *.gmf'
'!rm -f core'
*
*
'quit'


*******************************************************************************

function mapas()

_yf=_yi-_int
_yi=_yf-_dy

return 'ok'
