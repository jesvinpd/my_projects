var rect=document.querySelector("#rect");

rect.addEventListener("mouseover",()=>{
    rect.innerHTML = "happy birthday!!";
 });

 rect.addEventListener("mouseout",()=>{
    rect.innerHTML="hover and cross over me";
 })


rect.addEventListener('mousemove',(details)=>{
    var rectanglelocation = rect.getBoundingClientRect();
    var insideRecXValue = details.clientX - rectanglelocation.left;
    var midPoint = rectanglelocation.width/2;
    var finalPoint = rectanglelocation.width;

    if(insideRecXValue < midPoint){
        var redColorValue = gsap.utils.mapRange(0 , midPoint , 255 , 0 , insideRecXValue);
        gsap.to(rect, { 
            backgroundColor:`rgb( ${redColorValue} , 0 , 0)`,
            ease: Power4 
        }
            );

    }else{
        var blueColorValue = gsap.utils.mapRange( midPoint , finalPoint , 0 , 255 , insideRecXValue);
        gsap.to(rect,{
            backgroundColor:`rgb(0,0,${blueColorValue})`,
            ease: Power4
        });
       
    } 
})

rect.addEventListener('mouseleave',()=>{
    gsap.to(rect,{
        backgroundColor:`white`,
        ease: Power4
    })
 })

