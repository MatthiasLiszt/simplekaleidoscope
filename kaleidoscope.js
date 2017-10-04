

var Kaleidopattern=document.getElementById("kaleidopattern");
var Katalog=document.getElementById("shredcatalog");
var ShredsButton=document.getElementById("shreds");
var NewButton=document.getElementById("reset");
var ColorButton=document.getElementById("color");
var Colormenu=document.getElementById("colormenu");
var BackgroundButton=document.getElementById("background");
var GenerateButton=document.getElementById("generate");
var Codedump=document.getElementById("codedump");
var Virtualdom=document.getElementById("virtualdom");
var Virtualpattern=document.getElementById("virtualpattern");
var ShowButton=document.getElementById("show");
var Drawframe=document.getElementById("drawframe");

var Color=0;
var curShred=[],curShredIndex=0;
var Key=0;
var curKey=0;
var ShredSelected=false;

document.body.style.background="#eaeaea";
document.body.style.backgroundColor="#eaeaea";
initSVG();


function mouseAlert(){
 alert("mouse down!");
}

function withinTriangle(x,y,w=160,h=277){
 var picSize=32;//picture size to 32px 
 //var deltaRight=w+((w/h)*y);
 //var deltaLeft=w-((w/h)*y);;
 var deltaRight=((w/h)*(h-y)+w);
 var deltaLeft=w-((w/h)*(h-y));

 console.log("x = "+x+" y = "+y);
 console.log("deltaLeft "+deltaLeft+" deltaRight "+deltaRight);

 if( (x>deltaLeft) && (x<(deltaRight-picSize)) && (y<(h-picSize)) )
  {return true;}
 else
  {return false;}
}

function generateShreds(){
 var shred=shredgenerator();
 var color='#'+Color.toString(16);

 console.log("generating shred");

 return patternSVG(shred,Key++,color);
}

function generateCatalog(){
 var Shreds=[];

 Shreds.length=0; // as if memory would matter

 for(var i=0;i<(4*4);++i)
  {Shreds.push(generateShreds());}

 ShredSelected=true;
 Katalog.style.display="inline";
 Katalog.innerHTML=Shreds.join('');
}

function registerShred(x){
 curShred.push(x);
 ++curShredIndex;
 console.log("registered "+atob(x));
 console.log("curShred "+curShred[curShredIndex-1]);
 console.log("decode "+atob(curShred[curShredIndex-1]));
}

function registerPattern(x,key){
 curShred.push(x);
 ++curShredIndex;
 curKey=key;
 console.log("Key "+key);
 console.log("registered "+atob(x));
 console.log("curShred "+curShred[curShredIndex-1]);
 console.log("decode "+atob(curShred[curShredIndex-1]));
}


function innerReflections(mouse,w=320,h=277){
 var hw=w/2;
 var error=1.2;// preliminary correction value
 var f=(88/hw)*mouse.x;// ~ middle line of green kite
 var dd=mouse.y-f; // nearly perfect value for reflection in lower kite
 var innerCoordinates={x: mouse.x, y: mouse.y,
                       rx: w-mouse.x, ry: mouse.y,
                       dx: hw-dd,dy: h-mouse.x*error }; 
 return innerCoordinates;
}

function outerReflections(cood,w=320,h=277){
 var hw=w/2;
 var error=1.2;// preliminary correction value
 var outerCoordinates={lhx: cood.dx-160 , lhy: cood.x*error, 
                       rhx: cood.dx+160 , rhy: cood.x*error,
                       lx: hw-cood.x, ly: h-cood.y,
                       rx: hw+cood.x, ry: h-cood.y};
 return outerCoordinates;
}

function greenAreaClicked(mouse,h=277){
 //alert("mouse "+mouse.x+" "+mouse.y);
 var c,o;
 c=innerReflections(mouse); 
 o=outerReflections(c);

 /*var circle1="<circle cx='"+c.x+"' cy='"+c.y+"' r='3' />";
 var circle2="<circle cx='"+c.rx+"' cy='"+c.ry+"' r='3' />";
 var circle3="<circle cx='"+c.dx+"' cy='"+c.dy+"' r='3' />";
 var circle4="<circle cx='"+o.lhx+"' cy='"+o.lhy+"' r='3' />";
 var circle5="<circle cx='"+o.rhx+"' cy='"+o.rhy+"' r='3' />";
 var circle6="<circle cx='"+o.lx+"' cy='"+o.ly+"' r='3' />";
 var circle7="<circle cx='"+o.rx+"' cy='"+o.ry+"' r='3' />";
 var circles=circle1+circle2+circle3+circle4+circle5+circle6+circle7;*/

 
 var shred1=getPatternCode(c.x,c.y);
 var shred2=getPatternCode(c.rx,c.ry);
 var shred3=getPatternCode(c.dx,c.dy);

 var shred4=getPatternCode(o.lhx,o.lhy);
 var shred5=getPatternCode(o.rhx,o.rhy);
 var shred6=getPatternCode(o.lx,o.ly);
 var shred7=getPatternCode(o.rx,o.ry);

 var ishreds=shred1+shred2+shred3;
 var oshreds=shred4+shred5+shred6+shred7;
 var shreds=ishreds+oshreds;

 Kaleidopattern.innerHTML+=shreds;
 Virtualpattern.innerHTML+=shreds;

 var m1=getPatternCode(c.x,2*h-c.y);
 var m2=getPatternCode(c.rx,2*h-c.ry);
 var m3=getPatternCode(c.dx,2*h-c.dy);

 var m4=getPatternCode(o.lhx,2*h-o.lhy);
 var m5=getPatternCode(o.rhx,2*h-o.rhy);
 var m6=getPatternCode(o.lx,2*h-o.ly);
 var m7=getPatternCode(o.rx,2*h-o.ry);

 Virtualpattern.innerHTML+=m1+m2+m3+m4+m5+m6+m7;
  
 Drawframe.style.display="none";
 Kaleidopattern.style.display="inline";
}

function getPatternCode(X,Y){
 var attachment=curShred[curShredIndex-1];
 var rect1="<rect x='"+X+"' y='"+Y+"'";
 var rect2=" width='32' height='32' ";
 var rect3=" style='stroke:none;fill:url(#k";
 var rect4=curKey+")' />";
 var rect=rect1+rect2+rect3+rect4;
 var pshred=atob(attachment)+rect; 

 if(ShredSelected)
  {return pshred;}
 else
  {return '';}
}

function initSVG(){
 var i3angle1b="<polygon points='0,0 160,277 320,0 ' id='triangle' ";
 var i3angle3="style='fill:none;stroke:black;'/>";
 var i3angle=i3angle1b+i3angle3;
 var greenArea1="<polygon points='0,0 160,0 160,88 80,138.5' id='greenarea' ";
 var greenArea2="style='fill:lightgreen;stroke:green;' />";
 var greenArea=greenArea1+greenArea2;
 var line="<polyline points='160,88 240,138.5' style='stroke:black' />"; 
 var rline="<polyline points='240,138.5 320,189' style='stroke:black' />"; 
 var lline="<polyline points='80,138.5 0,189' style='stroke:black' />"; 
 var lines=line+rline+lline;

 Drawframe.innerHTML=i3angle+greenArea+lines; 
 Kaleidopattern.innerHTML='';
 Virtualpattern.innerHTML='';
 ShredSelected=false;
 
 var GreenArea=document.getElementById('greenarea');

 GreenArea.addEventListener('click',function(event)
                                     {var x={x: event.offsetX,y: event.offsetY};
                                      greenAreaClicked(x);});
 Kaleidopattern.addEventListener('click',function(event)
                                          {Kaleidopattern.style.display="none";
                                           Drawframe.style.display="inline";});

 GreenArea.addEventListener('mouseleave',function(){
                                               console.log("mouseleft");
                                               if(Kaleidopattern.innerHTML)
                                                {Kaleidopattern.style.display="inline";
                                                 Drawframe.style.display="none";}
                           });

 NewButton.addEventListener('click',function(){initSVG();});
 


 ShredsButton.addEventListener('click',function(){generateCatalog();});
 ColorButton.addEventListener('click',function(){choseColor();});
 BackgroundButton.addEventListener('click',function(){changeBackground();});
 GenerateButton.addEventListener('click',function(){generateCode();});
 ShowButton.addEventListener('click',function(){showFullPattern();});
 document.body.style.background="#eaeaea";
 document.body.style.backgroundColor="#eaeaea";
 Codedump.style.display="none";
 Katalog.style.display="none";
 Drawframe.style.display="inline";
 Kaleidopattern.style.display="none";
}

function increaseRed(){
 var red=Math.round(Color/(256*256));
 red+=16;
 if(red>255){red=8*16;}
 if(red<(8*16)){red=255;}
 Color=red*256*256+(Color%(256*256));
 var c="#"+Color.toString(16);
 console.log("color value "+c);
 colorfield.style.backgroundColor=c;
}

function increaseGreen(){
 var red=Math.round(Color/(256*256));
 var green=Math.round((Color & 255*256)/256);
 green+=16;
 if(red<(8*16)){red=8*16;}
 if(red>255){red=8*16;}
 if(green>255){green=8*16;}
 if(green<(8*16)){green=255;}
 Color=(red*256*256)+(green*256)+(Color%256);
 var c="#"+Color.toString(16);
 console.log("red "+red+" green "+green);
 console.log("color value "+c);
 colorfield.style.backgroundColor=c;
}

function increaseBlue(){
 var red=Math.round(Color/(256*256));
 var green=Math.round((Color & 255*256)/256);
 var blue=Color%256;
 blue+=15;
 if(red<(8*16)){red=8*16;}
 if(red>255){red=8*16;}
 if(green>255){green=8*16;}
 if(green<(8*16)){green=255;}
 if(blue>240){blue=8*16;}
 if(blue<(8*16)){blue=240;}
 Color=red*256*256+green*256+blue;
 var c="#"+Color.toString(16);
 console.log("color value "+c);
 colorfield.style.backgroundColor=c;
}

function colorSelected(){
 Colormenu.style.display = "none";
}

function choseColor(){
 Colormenu.style.display= "inline";
}

function changeBackground(){
 var c=Math.round(Math.random()*5); 
 console.log("changeBackground running");
 switch(c)
  {case 0: var Background="lightgreen";
           break;
   case 1: var Background="lightblue";
           break;
   case 2: var Background="lightpink";
           break;
   case 3: var Background="yellow";
           break;
   case 4: var Background="wheat";
           break;
  }
 document.body.style.backgroundColor=Background;
}

function generateCode(){
 svghead='<svg xmlns="http://www.w3.org/2000/svg" width="320px" height="554px" viewBox="0 0 320 554">';
 Codedump.style.display="inline";
 Codedump.textContent=svghead+Virtualpattern.innerHTML+"</svg>";
}


function showFullPattern(){
 svghead='<svg xmlns="http://www.w3.org/2000/svg" width="320px" height="554px" viewBox="0 0 320 554">';
 var p=svghead+Virtualpattern.innerHTML+"</svg>";
 var b=btoa(p);
 var url='url(data:image/svg+xml;base64,';
 var urltail=') repeat';
 console.log(url+b+urltail);
 document.body.style.background=url+b+urltail;
 document.body.style.backgroundSize="128px 221.6px";
}