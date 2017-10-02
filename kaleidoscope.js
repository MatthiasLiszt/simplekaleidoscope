

var Kaleidopattern=document.getElementById("kaleidopattern");
var Katalog=document.getElementById("shredcatalog");
var ShredsButton=document.getElementById("shreds");
var NewButton=document.getElementById("reset");

var Color=0;
var curShred=[],curShredIndex=0;
var Key=0;
var curKey=0;

document.body.style.background="#eaeaea";
initSVG();


function mouseAlert(){
 alert("mouse down!");
}

function withinTriangle(x,y,w=160,h=277){
 var picSize=64;//picture size to 64px 
 var deltaRight=w+((w/h)*y);
 var deltaLeft=w-((w/h)*y);

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
 var i3angle1="<polygon points='0,277 160,0 320,277 0,277 ' id='triangle' ";
 //var i3angle2=" onclick='"+"alert('mouse clicked')"+"' ";
 var i3angle3="style='fill:none;stroke:black;'/>";
 var i3angle=i3angle1+i3angle3;

 Kaleidopattern.innerHTML=i3angle; 
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
                                            var rect2=" width='64' height='64' ";
                                            var rect3=" style='stroke:none;fill:url(#k";
                                            var rect4=curKey+")' />";
                                            var rect=rect1+rect2+rect3+rect4;
                                            var pshred=atob(attachment)+rect; 
                                            
                                            console.log("pshred "+pshred);
                                            Kaleidopattern.innerHTML=content+pshred;
                                           }
                                          else
                                           {alert('not in triangle ! '+X+' '+Y);}  
                                         });
 console.log(i3angle);
 ShredsButton.addEventListener('click',function(){generateCatalog();});
}


