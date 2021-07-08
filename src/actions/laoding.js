export function showLoading (url){
    let dom = document.createElement('div');
    if (url){
        let img = document.createElement('img');
        img.src = url;
        dom.appendChild(img);
    }
    let span = document.createElement('span');
    span.className = 'bimgl-progress'
    dom.appendChild(span);
    dom.className = 'bimgl-loading';

    document.querySelector('.bimgl-container').appendChild(dom);
}
export function hideLoading (){
    let loadingEl =  document.querySelector('.bimgl-loading');
    document.querySelector('.bimgl-container').removeChild(loadingEl);
}
