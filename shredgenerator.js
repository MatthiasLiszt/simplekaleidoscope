
function shredgenerator(){
 console.log("shredgenerator running");
 
 var ax=Math.round(Math.random()*64);
 var ay=Math.round(Math.random()*64);
 var bx=Math.round(Math.random()*64);
 var by=Math.round(Math.random()*64);
 var cx=Math.round(Math.random()*64);
 var cy=Math.round(Math.random()*64);
 
 return {a: {x: ax, y: ay} , b: {x: bx, y: by}, c: {x: cx, y: cy}};
}

function shredSVG(p,c="black"){
 var head="<svg width=64 height=64>";
 var fhead1="<svg width=64 height=64 onclick='registerShred("+'"';
 var fhead2=' ")'+"'"+">"; 
 var tail=" '></svg>";
 var body="<path fill='"+c+"' d='";
 var cood=[];

 console.log("shredSVG running");
 console.log("p length "+p.length);
 cood.push(" M "+p.a.x+" "+p.a.y);
 cood.push(" L "+p.b.x+" "+p.b.y);
 cood.push(" L "+p.c.x+" "+p.c.y);
 console.log(JSON.stringify(cood));

 var rrr=head+body+cood[0]+cood[1]+cood[2]+tail;
 var brr=btoa(rrr);
 var frr=fhead1+brr+fhead2+body+cood[0]+cood[1]+cood[2]+tail;
 console.log(frr);

 return frr;
}

function patternSVG(p,key,c="black"){ // the same as shredSVG but creates a "pattern"
 var head1="<defs><pattern id='k"+key+"'"+"x='0' y='0' width='64' height='64' ";
 var head2="patternUnits='userSpaceOnUse' >";
 var fhead1="<svg width='64' height='64' onclick='registerPattern(";
 var fhead2=" )"+"'"+">"; 
 var tail=" '></pattern></defs>";
 var ftail="'/></svg>"
 var body="<path fill='"+c+"' d='";
 var cood=[];

 console.log("patternSVG running");
 console.log("p length "+p.length);
 cood.push(" M "+p.a.x+" "+p.a.y);
 cood.push(" L "+p.b.x+" "+p.b.y);
 cood.push(" L "+p.c.x+" "+p.c.y);
 console.log(JSON.stringify(cood));

 var rrr=head1+head2+body+cood[0]+cood[1]+cood[2]+tail;
 var brr=btoa(rrr);
 var brrr='"'+brr+'"';
 var frr=fhead1+brrr+","+key+fhead2+body+cood[0]+cood[1]+cood[2]+ftail;
 console.log(rrr);
 console.log(frr);

 return frr;
}


function cutOneCorner(p){
 var XX=p.a.x-p.b.x;
 var YY=p.a.y-p.b.y;
 var dX=XX/YY;
 var dY=YY/XX;
 var q=YY/(Math.random()*6); 
 var qq=XX/(Math.random()*6); 
 var nX=Math.round(dX*q);
 var nY=Math.round(dY*qq);

 var XXX=p.b.x-p.c.x;
 var YYY=p.b.y-p.c.y;
 var dXXX=XXX/YYY;
 var dYYY=YYY/XXX;
 var g=YYY/(Math.random()*6); 
 var gg=XXX/(Math.random()*6);  
 var mX=Math.round(dXXX*g);
 var mY=Math.round(dYYY*gg);

 var ax=p.a.x,ay=p.a.y,cx=p.c.x,cy=p.c.y,bx=p.b.x,by=p.b.y;
 var pp={a: {x: ax, y: ay} , n: {x: nX, y: nY}, m: {x: mX, y: mY} , c: {x: cx, y: cy}};

 console.log("dX "+dX+" dY "+dY);
 console.log("nX "+nX+" nY "+nY);
 console.log(JSON.stringify(pp));
 return pp;
}
