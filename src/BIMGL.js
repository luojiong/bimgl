import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Vector3,
    DirectionalLight,
    Mesh,
    Object3D,
    Group,
    Raycaster,
    Vector2,
    Color,
    AmbientLight,
    LoadingManager,
    sRGBEncoding
} from "../files/three.module.js";
import {setBaseColor} from "./actions/GLColor.js";
import {isPC} from "./lib/os.js";
import * as actions from './actions/index.js'
import {getEvent} from './lib/utils.js';
import FBXLoader from './loaders/FBXLoader.js';
import OrbitControls from '../files/OrbitControls.js'
import {CSS2DRenderer} from "./lib/CSS2DRenderer.js";

export default (()=>{
    let scoped = {
        Light:null,
        raycaster:null,
        camera:null,
        controls:null,
        visual:null,
        mouse:null,
        manager:null,
        renderer:null,
        labelRenderer:null
    }
    let options = {
        clearColor: 0xb9d3ff,
        antialias: false,
        sortObjects: true,
        loadingImage:"",
        logarithmicDepthBuffer: true,
        physicallyCorrectLights: false,
        selectColor:0x5cadff,
        animation:null
    }
    let scoped_method={
         controll(){
            scoped.controls =  new OrbitControls( scoped.camera, scoped.renderer.domElement );
            !options.animation && scoped.controls.addEventListener( 'change',this.render);
         },
         labelRender(domElement){
            scoped.labelRenderer = new CSS2DRenderer();
            scoped.labelRenderer.setSize(this.width,this.height);
            scoped.labelRenderer.domElement.style.position = 'absolute';
            scoped.labelRenderer.domElement.style.top = '0px';
            domElement.appendChild( scoped.labelRenderer.domElement );
            const controls = new OrbitControls( scoped.camera, scoped.labelRenderer.domElement );
            !options.animation &&  controls.addEventListener('change',()=>{
                 this.render();
             })
        },
        ondbl(){
            scoped.mouse= new Vector2();
            scoped.raycaster = new Raycaster();
            if(isPC()){
                this.domElement.addEventListener('dblclick',this.Select,false);
            }else{
                let i = 0;
                this.domElement.addEventListener('touchstart',(event)=>{
                    i++;
                    setTimeout(()=>{
                        i = 0
                    },500);
                    if(i > 1){
                        this.Select(event)
                    }
                },false);
            }
        },
        initLight(){
            this.scene.add(new AmbientLight( 0x313131 ,1))
            scoped.Light = new DirectionalLight(0xffffff,0.8);
            this.scene.add(scoped.Light);
        },
    }
    function  BIMGL(){
        this.domElement = null;
        this.scene = null;
        this.width = 0;
        this.height = 0;
        this.onError = null;
        this.onload = null;
        this.onStart = null;
        this.onProgress = null;
        this.onSelect = null;
        this.init = (el, outOptions={}) => {
            Object.assign(options,outOptions);
            this.domElement = el;
            this.width = outOptions.width || el.clientWidth;
            this.height = outOptions.height || el.clientHeight;
            this.scene = new Scene();
            scoped_method.initLight.call(this);
            scoped.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000000000);
            scoped.camera.position.z = 0;
            scoped.camera.position.y = 0;
            scoped.camera.lookAt(this.scene.position);
            scoped.renderer = new WebGLRenderer({
                antialias: options.antialias,
                physicallyCorrectLights: options.physicallyCorrectLights,
                logarithmicDepthBuffer: options.logarithmicDepthBuffer,
            });
            if(options.sRGBEncoding){
                scoped.renderer.outputEncoding = sRGBEncoding;
            }
            scoped.renderer.setSize(this.width, this.height);
            scoped.renderer.setClearColor(options.clearColor);
            let dom = document.createElement('div');
            dom.className = 'bimgl-container';
            dom.appendChild(scoped.renderer.domElement);
            scoped_method.labelRender.call(this,dom);
            this.domElement.appendChild(dom);
            options.animation &&  scoped.renderer.setAnimationLoop(options.animation);
            this.render();
            this.load(options.uri);
        }
        this.destroy = ()=>{
            scoped.renderer.setAnimationLoop(null)
            this.domElement.removeChild(document.querySelector('.bimgl-container'))
            this.scene = null;
            scoped.camera = null;
            scoped.renderer = null;
            scoped.controls.removeEventListener( 'change',this.render);
            this.width = 0;
            this.height = 0;
            if(isPC()){
                this.domElement.addEventListener('dblclick', null, false);
            }else{
                this.domElement.addEventListener('touchstart', null, false);
            }
            this.domElement = null;
        }
        this.render = ()=>{
            scoped.renderer.render(this.scene,scoped.camera);
            scoped.labelRenderer.render(this.scene,scoped.camera);
        }
        this.load = (uri) => {
            actions.showLoading(options.loadingImage);
            scoped.manager = new LoadingManager();
            scoped.manager.onStart = (url, itemsLoaded, itemsTotal) => {
                this.onStart && this.onStart(url, itemsLoaded, itemsTotal);
            }
            scoped.manager.onLoad = ()=>{
                this.onloadModel();
                actions.hideLoading();
            }
            scoped.manager.resolveURL(uri);
            let progressEl = document.querySelector('.bimgl-progress');
            const loader = new FBXLoader(scoped.manager);
            loader.load(
                uri,
                this.loadModel,
                (xhr)=>{
                    let progress = Math.floor(xhr.loaded / xhr.total * 100);
                    progressEl.textContent = progress + '%';
                    this.onProgress && this.onProgress(progress);
                },
                (error)=>{
                    this.onError && this.onError(error);
                })
        }
        this.resize = (width,height) => {
            this.width = width || this.domElement.clientWidth;
            this.height = height ||  this.domElement.clientHeight;
            scoped.camera.aspect = this.width / this.height;
            scoped.camera.updateProjectionMatrix();
            scoped.renderer.setSize( this.width, this.height );
            this.render();
        }
        this.loadModel = (obj)=>{
            const max = new Vector3(0,0,0)
            obj.traverse((item)=>{
                if(item instanceof  Mesh || item instanceof Object3D || item instanceof Group){
                    if(item.position.z > max.z){
                        max.setZ(item.position.z)
                    }
                    if(item.position.x > max.x){
                        max.setX(item.position.x)
                    }
                    if(item.position.y > max.y){
                        max.setY(item.position.y)
                    }
                }
            })
            scoped.visual = new Vector3(max.x / 2, max.y + max.y * 0.2,max.z + max.z * 2);
            scoped.Light.position.set(max.x * 0.5, max.y * 3, max.z * 0.3);
            scoped.camera.position.add(scoped.visual);
            scoped.camera.lookAt(this.scene.position);
            scoped.camera.updateProjectionMatrix();
            this.scene.add(obj);
            this.render();
        }

        this.Select = (e)=>{
            const event = getEvent(e);
            const selectColor = new Color(options.selectColor).getHex();
            const getBoundingClientRect = this.domElement.getBoundingClientRect()
            scoped.mouse.x = ((event.clientX - getBoundingClientRect.left) / this.width) * 2 - 1;
            scoped.mouse.y = -((event.clientY - getBoundingClientRect.top) / this.height) * 2 + 1;
            scoped.raycaster.setFromCamera( scoped.mouse, scoped.camera);
            const intersects = scoped.raycaster.intersectObjects(this.scene.children,true);
            if(intersects.length === 0)return;
            this.onSelect && this.onSelect(intersects[0]);
            for ( let i = 0; i < 1; i ++ ) {
                if(intersects[ i ].object.material instanceof  Array){
                    for(let j = 0;j < intersects[i].object.material.length;j++){
                        setBaseColor(intersects[i].object.material[j]);
                        const color =  selectColor ===  intersects[i].object.material[j].color.getHex() ? intersects[i].object.material[j].BaseColor.getHex() : options.selectColor;
                        intersects[i].object.material[j].color.setHex(color);
                        intersects[i].object.material[j].emissive.setHex(color);
                    }
                }else{
                    setBaseColor(intersects[i].object.material);
                    const color = selectColor ===  intersects[i].object.material.color.getHex() ? intersects[i].object.material.BaseColor.getHex() : options.selectColor;
                    intersects[i].object.material.color.setHex(color);
                    intersects[i].object.material.emissive.setHex(color);
                }
            }
            this.render();
        }
        this.onloadModel= ()=>{
            scoped_method.ondbl.call(this);
            this.onload && this.onload(this);
        }
    }
    BIMGL.prototype.transparentComponentsById = actions.transparentComponentsById;
    BIMGL.prototype.setComponentsColorById = actions.setComponentsColorById;
    BIMGL.prototype.clearComponentsColorById = actions.clearComponentsColorById;
    BIMGL.prototype.setWorldPosition = actions.setWorldPosition;
    BIMGL.prototype.removeWorldPosition = actions.removeWorldPosition;
    BIMGL.prototype.Color = actions.GLColor;
    return  BIMGL;
})();
