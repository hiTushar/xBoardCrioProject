async function init(){

    let linkData = []; 
    
   
    for(let link of magazines){
        linkData.push(await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${link}`).then(data => data.json())); 
    }
   
    let initNodeId = initAccordion(); 
    linkData.forEach((data, index) => addAccordionSection(data, index, initNodeId));
                    
}

/*****************************************************************************************/

function initAccordion(){
    document.getElementById('display').innerHTML = '<div class="accordion" id="accordionExample"></div>'
    return 'accordionExample'; 
}

/*****************************************************************************************/

function addAccordionSection(data, index, parentId){
    
    
    document.getElementById(parentId).innerHTML   += 
                           `<div class="card">
                              <div class="card-header bg-white" id="heading${index}">
                                <h2 class="mb-0">
                                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                    <i class="fas fa-angle-down"></i>${data.feed.title} 
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse${index}" class="collapse ${!index ? 'show' : ''}" aria-labelledby="heading${index}" data-parent="#${parentId}">
                                
                              </div>
                            </div>
                           `;

    addCarousel(data.items, `collapse${index}`);
}

/*****************************************************************************************/

function addCarousel(items, accordionId){
    let accordionNode = document.getElementById(accordionId); 

    accordionNode.innerHTML = `
                            <div class="card-body">
                                <a class="carousel-control-prev carousel-arrow" href="#${accordionId}carousel" role="button" data-slide="prev">
                                    <span class="fas fa-angle-left" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <div id="${accordionId}carousel" class="carousel slide" data-ride="carousel" data-interval=false>        
                                    <div class="carousel-inner">

                                    </div>
                                </div>
                                <a class="carousel-control-next carousel-arrow" href="#${accordionId}carousel" role="button" data-slide="next">
                                    <span class="fas fa-angle-right" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                                
                            </div>`;

    //accordionNode.getElementsByClassName('carousel-control-prev')[0].setAttribute('onclick', 'checkList(event)');
    //accordionNode.getElementsByClassName('carousel-control-next')[0].setAttribute('onclick', 'checkList(event)');
    //accordionNode.getElementsByClassName('carousel slide')[0].setAttribute('onclick', 'checkList(event)');

    let node = document.querySelector(`#${accordionId}carousel .carousel-inner`);

    items.forEach((item, index) => {
               
                node.innerHTML += `<div class="carousel-item ${!index ? 'active' : ''}">
                                     <div class="card card-dimension">
                                        <a href="${item.link}" target="_blank">
                                        <div class="card-body">
                                            <img class="card-img-top d-block w-100 slide-image" src="${item.enclosure.link}">
                                            <h5 class="card-title">${item.title}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted detail">${item.author} &#183; ${new Date(item.pubDate).toLocaleDateString('en-IN')}</h6>
                                            <p class="card-text description">${item.description}</p>
                                        </div>
                                        </a>
                                     </div>
                                   </div>
                                  `
            }          
        );                      

}

/*****************************************************************************************/

function checkList(event){
    console.log(event, event.target.className); 
}
