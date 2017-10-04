

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

var Color=0;
var curShred=[],curShredIndex=0;
var Key=0;
var curKey=0;

document.body.style.background="#eaeaea";
document.body.style.backgroundColor="#eaeaea";
initSVG();


function mouseAlert(){
 alert("mouse down!");
}

function withinTriangle(x,y,w=160,h=277){
 var picSize=32;//picture size to 32px 
 //var deltaRight=w+((w/h)*y);
 //var deltaLeft=w-((w/h)*y);
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

function initSVG(){
 var i3angle1="<polygon points='0,277 160,0 320,277 ' id='triangle' ";
 var i3angle1b="<polygon points='0,0 160,277 320,0 ' id='triangle' ";
 var i3angle3="style='fill:none;stroke:black;'/>";
 var i3angle=i3angle1b+i3angle3;
 var m3angle1="<polygon points='0,277 160,554 320,277 ' id='mtriangle' ";
 var m3angle=m3angle1+i3angle3;

 Kaleidopattern.innerHTML=i3angle; 
 //Virtualpattern.innerHTML=i3angle+m3angle;
 NewButton.addEventListener('click',function(){initSVG();});
 Kaleidopattern.addEventListener('click',function(event){
                                          var X=event.offsetX;
                                          var Y=event.offsetY;
                                          console.log("layer "+event.layerX+" "+event.layerY);
                                          console.log("page "+event.pageX+" "+event.pageY);
                                          console.log("offset "+event.offsetX+" "+event.offsetY); 
                                          if(withinTriangle(X,Y))
                                           {//alert('mouse clicked at '+X+' '+Y);
                                            var content=Kaleidopattern.innerHTML;
                                            var attachment=curShred[curShredIndex-1];
                                            var rect1="<rect x='"+X+"' y='"+Y+"'";
                                            var rect2=" width='32' height='32' ";
                                            var rect3=" style='stroke:none;fill:url(#k";
                                            var rect4=curKey+")' />";
                                            var rect=rect1+rect2+rect3+rect4;
                                            var pshred=atob(attachment)+rect; 
                                             
                                            var rX,rY=277-Y-32,a;
                                            if(X>160){a=X-160-32;rX=320-a-32;}
                                            else{rX=160-X;}

                                            var reflect1="<rect x='"+rX+"' y='"+rY+"'";
                                            var reflect=reflect1+rect2+rect3+rect4;
                                            var mX=320-rX,mY=rY; 
                                            var mreflect1="<rect x='"+mX+"' y='"+mY+"'";
                                            var mreflect=mreflect1+rect2+rect3+rect4;
                                           
                                            //alert("reflection "+rX+" "+rY);
                                            console.log("pshred "+pshred);
                                            var alltogether=content+pshred+reflect+mreflect;
                                            Kaleidopattern.innerHTML=alltogether;
                                            var oldcontent=Virtualpattern.innerHTML;
                                            var upper=oldcontent+pshred+reflect+mreflect;     
                                            var mrect1="<rect x='"+X+"' y='"+(554-Y)+"'";
                                            var mrect=mrect1+rect2+rect3+rect4;
                                            var mmreflec1="<rect x='"+mX+"' y='"+(554-mY)+"'";
                                            var mmreflec=mmreflec1+rect2+rect3+rect4;
                                            var mreflec1="<rect x='"+rX+"' y='"+(554-rY)+"'";
                                            var mreflec=mreflec1+rect2+rect3+rect4;
                                            var mirrored=mreflec+mmreflec+mrect;
                                            Virtualpattern.innerHTML=upper+mirrored; 
                                           }
                                          else
                                           {alert('not in triangle ! '+X+' '+Y);}  
                                         });
 //console.log(i3angle);
 ShredsButton.addEventListener('click',function(){generateCatalog();});
 ColorButton.addEventListener('click',function(){choseColor();});
 BackgroundButton.addEventListener('click',function(){changeBackground();});
 GenerateButton.addEventListener('click',function(){generateCode();});
 ShowButton.addEventListener('click',function(){showFullPattern();});
 document.body.style.background="#eaeaea";
 document.body.style.backgroundColor="#eaeaea";
 Codedump.style.display="none";
 Katalog.style.display="none";
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