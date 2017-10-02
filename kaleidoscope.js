

Kaleidopattern=document.getElementById("kaleidopattern");

document.body.style.background="#eaeaea";
initSVG();


function mouseAlert(){
 alert("mouse down!");
}

function withinTriangle(x,y,w=160,h=277){
 //var w=160,h=277;
 var deltaRight=w+((w/h)*y);
 var deltaLeft=w-((w/h)*y);

 console.log("x = "+x+" y = "+y);
 console.log("deltaLeft "+deltaLeft+" deltaRight "+deltaRight);

 if( (x>deltaLeft) && (x<deltaRight) && (y<h) )
  {return true;}
 else
  {return false;}
}

function initSVG(){
 var i3angle1="<polygon points='0,277 160,0 320,277 0,277 ' id='triangle' ";
 //var i3angle2=" onclick='"+"alert('mouse clicked')"+"' ";
 var i3angle3="style='fill:none;stroke:black;'/>";
 var i3angle=i3angle1+i3angle3;

 Kaleidopattern.innerHTML=i3angle; 
 var Triangle=document.getElementById('triangle');
 //Triangle.addEventListener('click',function(){alert('mouse clicked');});
 Kaleidopattern.addEventListener('click',function(event){
                                          var X=event.offsetX;
                                          var Y=event.offsetY;
                                          console.log("layer "+event.layerX+" "+event.layerY);
                                          console.log("page "+event.pageX+" "+event.pageY);
                                          console.log("offset "+event.offsetX+" "+event.offsetY); 
                                          if(withinTriangle(X,Y))
                                           {alert('mouse clicked at '+X+' '+Y);}
                                          else
                                           {alert('not in triangle ! '+X+' '+Y);}  
                                         });
 console.log(i3angle);
}

