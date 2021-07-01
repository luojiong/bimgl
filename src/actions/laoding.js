export function showLoading (url){
    let dom = document.createElement('div');
    if (url){
        let img = document.createElement('img');
        img.src = url;
        dom.appendChild(img);
    }
    let span = document.createElement('span');
    span.className = 'glbim-progress'
    dom.appendChild(span);
    dom.className = 'glbim-loading';

    document.querySelector('.glbim-container').appendChild(dom);
}
export function hideLoading (){
    let loadingEl =  document.querySelector('.glbim-loading');
    document.querySelector('.glbim-container').removeChild(loadingEl);
}
