
/* SideBar Navigation */
const show_max = document.querySelector('.show-max');
const nav = document.querySelector('.nav');
const container = document.querySelector('.container-fixed');
let sampleCard = document.querySelectorAll('.sample-box');
let z = 0;

console.log(sampleCard);
show_max.onclick = ()=>{
  if(z == 0){
      z = 1;
    nav.setAttribute('class', 'max-nav');
    container.style.width = "calc(100% - "+nav.clientWidth+"px)";
    container.style.left = nav.clientWidth+"px";
    for (let i = 0; i<13;i++) {
        sampleCard[i].style.width = "30rem";
        
    }
}
else{
    z = 0;
    nav.removeAttribute('class', 'max-nav');
    container.style.width = "calc(100% - "+nav.clientWidth+"px)";
    container.style.left = nav.clientWidth+"px";
  
    for (let i = 0; i<13;i++) {
        sampleCard[i].style.width = "36rem";

        
    }
  }
}


/* Filter Portfolios */
const ul = document.querySelector('nav ul');
const portfolios = [...document.querySelectorAll('.samples .sample-box')];
const size = portfolios.length
let sample_count = 0;

show_all = ()=>{
    portfolios.forEach((sample)=>{
        sample.style.display = "inline-block";
        setTimeout(()=>{
                document.querySelector('.empty').style.display = "none";
            }, 250);
        setTimeout(()=>{
            sample.style.opacity = 1;
        }, 250);
    })
}

ul.addEventListener('click', (event)=>{
    if(event.target.className == "show-max" || event.target.localName == "span"){
        return 0;
    }
    else{
        filter_data_type = event.target.closest('li').dataset.type;
        portfolios.forEach((sample)=>{
            console.log(filter_data_type);
            if(filter_data_type == "all"){
                console.log('sending');
                show_all();
            }
            else{
                if(filter_data_type == sample.dataset.type){
                    sample.style.display = "inline-block";
                    setTimeout(()=>{
                        sample.style.opacity = 1;
                    }, 250);
                    sample_count -= 1;
                }
                else{
                    sample.style.opacity = 0;
                    setTimeout(()=>{
                        sample.style.display = "none";
                    }, 250);
                }
                sample_count += 1;
            }
        });
        if(sample_count == size){
            setTimeout(()=>{
                document.querySelector('.empty').style.display = "flex";
            }, 250);
        }
        else{
            setTimeout(()=>{
                document.querySelector('.empty').style.display = "none";
            }, 250);
        }
        sample_count = 0;
    }
})

// Service-details

const sample = document.querySelectorAll('.sample-box');
const details = document.querySelectorAll('.service-details');
const btndetails = document.querySelectorAll('.btn-details');

var i = btndetails.findIndex(function(){
    for(x=0; x<sample.length-1; x++){
        if (x==btndetails[x].onclick){
            return x;
        }
    }
    return x;
})

btndetails[i].addEventListener('click' , () => {
    sample[i].classList.toggle('details');
    details[i].classList.toggle('details');
});
