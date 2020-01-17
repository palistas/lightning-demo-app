var appBundle = (function () {
    'use strict';

    class Api{
        getAppData(){
            const promises = [
                this._getMovies(),
                this._getTvShows()
            ];
            return Promise.all(promises);
        }

        _getMovies(){
            return fetch("./static/movies.json").then((response)=>{
                return response.json();
            }).then((data)=>{
                return {ref:"Movies", data};
            });
        }

        async _getTvShows(){
            const stream = await fetch("./static/series.json");
            const data = await stream.json();
            return {ref:"TvShows", data};
        }
    }

    class Splash extends lng.Component{

        static _template(){
            return {
                Background:{
                    src:App.getPath("background.png")
                },
                GrayBackdrop:{
                    src:App.getPath("gradient.png"), scale:1.1, w:1920, h:1080, y: 1000, x:200, rotation: -0.3
                },
                Logo:{
                    src:App.getPath("movies-tv-logo.png"), y: 714, x:1100, rotation: -0.3
                }
            };
        }

        _init(){
            this._setState("Loading");
            this._createAnimations();
            this._register();
        }

        _createAnimations(){
            this._reveal = this.animation({
                duration:1.3, repeat: 0, delay:1, actions:[
                    {t:'Background', p:'y', v:{0.20:0,1:-550}},
                    {t:'GrayBackdrop', p:'rotation', v:{0:-0.3,1:0}},
                    {t:'GrayBackdrop', p:'scale', v:{0.6:1.1,1:1}},
                    {t:'GrayBackdrop', p:'y', v:{0:1000,1:0}},
                    {t:'GrayBackdrop', p:'x', v:{0:200,1:0}},
                    {t:'Logo', p:'y', v:{0:714,1:-400}},
                    {t:'Logo', p:'rotation', v:{0:-0.3,1:-0}},
                ]
            });
        }

        _register(){
            this._reveal.on("finish",()=>{
                this.signal("animationFinished");
            });
        }

        startAnimation(){
            this._start();
        }

        static _states(){
            return [
                class Loading extends this{
                    _start(){
                        this._reveal.start();
                    }
                },
                class Error extends this{
                    $enter(){
                        // signal error & retry
                    }
                    $exit(){
                        // signal that we exit Error state
                    }
                }
            ];
        }
    }

    class Loader extends lng.Component{

        static _template(){
            return {
                rect: true, w:1920, h: 1080, color: 0xff000000,
                Spinner:{
                    mount: 0.5, x: 960, y: 540, src: App.getPath("spinner.png")
                }
            }
        }

        _init(){
            this._spinner = this.tag("Spinner").animation({
                duration: 2, repeat: -1, actions:[
                    {p:"rotation", v:{0:0, 1: Math.PI * 2}}
                ]
            });
        }

        _active(){
            this._spinner.start();
        }

        _inactive(){
            this._spinner.stop();
        }

    }

    class MainSliderItem extends lng.Component{
        static _template(){
            return {
                rect: true, color: 0xffffffff, w: 370, h: 556, scale:1,
                transitions:{scale:{duration:0.3, delay:0.05}}
            }
        }

        set item(v){
            this._item = v;
            this.patch({
                src:App.getPath(`${v.path}/posterS.jpg`)
            });
        }

        get item(){
            return this._item;
        }

        _focus(){
            this.setSmooth("scale",1.1);
        }

        _unfocus(){
            this.setSmooth("scale",1);
        }

        static _states(){
            return [

            ]
        }

        static get width(){
            return 385;
        }

        static get height(){
            return 556;
        }
    }

    class Slider extends lng.Component {
        static _template(){
            return {
                alpha: 0.5,
                Title:{
                    text:{text:"", fontSize:40, fontFace:"verdana"}
                },
                Items:{
                    y:100
                }
            }
        }

        set data(v){
            const {label, data} = v;
            this.patch({
                Title:{
                    text:{text:label.toUpperCase()}
                },
                Items:{
                    children: data.map((item, idx)=>{
                        return {type: MainSliderItem, x:idx*350, item:item, scale:0.9}
                    })
                }
            });
        }

        _init(){
            this._index = 0;
        }

        _focus(){
            this.setSmooth("alpha",1);
            this._setState("Expanded");
            this._setIndex();
        }

        _unfocus(){
            this.setSmooth("alpha",0.5);
            this._setState("Collapsed");
        }

        get items(){
            return this.tag("Items").children;
        }

        get active(){
            return this.items[this._index];
        }

        _handleLeft(){
            if(this._index > 0){
                this._setIndex(this._index-1);
            }
        }

        _handleRight(){
            if(this._index < this.items.length - 1){
                this._setIndex(this._index+1);
            }
        }

        _handleEnter(){
            this.fireAncestors("$onItemSelect",{item:this.active.item});
        }

        _setIndex(index=this._index){
            this._index = index;
            this.patch({
                Items:{
                    smooth:{x: !index?0:(index*-440)}
                }
            });
        }

        _getFocused(){
            return this.active;
        }


        static _states(){
            return [
                class Expanded extends this{
                    $enter(){
                        this.setSmooth("alpha",1);
                        this.items.forEach((item, idx)=>{
                            item.patch({
                                smooth:{
                                    x: [idx * 440, {duration:0.3, delay:idx*0.04}],
                                    scale: 1
                                }
                            });
                        });
                    }
                },
                class Collapsed extends this{
                    $enter(){
                        this.setSmooth("alpha",0.5);
                        this.items.forEach((item, idx)=>{
                            item.patch({
                                smooth:{
                                    x: [idx * 350, {duration:0.3, delay:idx*0.03}],
                                    scale: 0.9
                                }
                            });
                        });
                    }
                }
            ]
        }
    }

    class Browse extends lng.Component{

        static _template(){
            return {
                Sliders:{

                }
            }
        }

        set data(v){
            this.patch({
                Sliders:{
                    children: v.map((data, idx)=>{
                        return {type: Slider, data, y: idx * 680}
                    })
                }
            });
        }

        _init(){
            this._index = 0;
        }

        get items(){
            return this.tag("Sliders").children;
        }

        get active(){
            return this.items[this._index];
        }

        _getFocused(){
            return this.active;
        }

        _handleUp(){
            if(this._index > 0){
                this.setIndex(this._index - 1);
            }else{
                return false;
            }
        }

        _handleDown() {
            if (this._index < this.items.length - 1) {
                this.setIndex(this._index + 1);
            }
        }

        setIndex(index = this._index){
            this._index = index;
            this.patch({
                Sliders:{
                    smooth:{y: !index ? 0 : index * -640}
                }
            });
        }
    }

    class Details extends lng.Component{

        static _template(){
            return {
                rect: true, w: 1920, h: 1080, color: 0xff000000,
                Blur: {
                    type: lng.components.FastBlurComponent, amount: 0, w: 1920, h:1080,
                    transitions:{
                        amount:{duration:2.1, delay:0.4},
                        alpha:{duration:1, delay:2.5}
                    },
                    content:{
                        Background:{
                            w: 1920, h: 1080
                        }
                    }
                },
                Details:{
                    x: 250, y: 300, flex:{direction:"row"}, w: 1000, alpha: 0,
                    Poster:{
                        flexItem:{
                            marginRight: 150
                        }
                    },
                    Metadata:{
                        flex: {
                            direction: "column"
                        },
                        Title:{
                            w: 900, text:{fontFace:"RobotoRegular", fontSize:51, lineHeight:50},
                        },
                        Year:{
                            w: 900,  text:{fontFace:"RobotoRegular", fontSize:28, lineHeight:50}
                        },
                        Info:{
                            w: 700, text:{fontFace:"RobotoRegular", fontSize:39, lineHeight:60}
                        }
                    }
                }

            }
        }

        _init(){
            this._blur  = this.tag("Blur").content;

            this._events = {
                showDetails: ()=>{
                    const amount = this.tag("Blur").amount;
                    if(amount === 3){
                        this.tag("Details").patch({
                            smooth:{
                                alpha: 1, y: 150
                            }
                        });
                    }
                }
            };

            this._register();
        }

        _register(){
            this._blur.tag("Background").on("txLoaded", (e)=>{
                this.signal("detailsLoaded");
            });

            this._blur.tag("Background").on("txError", (e)=>{
                this._blur.tag("Background").texture = null;
                this.signal("detailsLoaded");
            });

            this.tag("Blur").transition("amount").on("finish",this._events.showDetails);
        }

        set asset(v){
            this._asset = v;
            this._updateDetails(v);
            this._blur.tag("Background").src = App.getPath(`${v.path}/backdrop.jpg`);

        }

        _updateDetails({path, cast, title, year, info}){
            this.patch({
                Details:{
                    Poster:{
                        src: App.getPath(`${path}/posterS.jpg`)
                    },
                    Metadata:{
                        Title:{text:{text:title}},
                        Year:{text:{text:`released: ${year}`}},
                        Info:{text:{text:info}}
                    }
                }
            });
        }

        _focus() {
            this.tag("Blur").patch({
                smooth:{
                    amount:3,
                    alpha: 0.4
                }
            });
        }

        _unfocus(){
            this.patch({
                Blur:{
                    smooth:{
                        amount:0,
                        alpha: 1
                    }
                },
                Details:{
                    smooth:{
                        alpha: 0,
                        y: 300
                    }
                }

            });
        }
    }

    class Menu extends lng.Component{

        static _template(){
            return {
                flex:{
                    direction: "row"
                }
            }
        }

        _init(){
            this._index = 0;
            this.patch({
                Movies:{
                    type: MenuItem, item:{label:"Movies", ref:"Movies"}
                }
            });

            const shows = this.stage.c({
                type: MenuItem, item:{label:"Series", ref:"TvShows"}
            });

            this.childList.add(shows);
        }

        get items(){
            return this.children;
        }

        get active(){
            return this.items[this._index];
        }

        _handleLeft(){
            if(this._index > 0){
                this.setIndex(this._index - 1);
            }
        }

        _handleRight(){
            if(this._index < this.items.length - 1){
                this.setIndex(this._index + 1);
            }
        }

        setIndex(index){
            this._index = index;
        }

        _getFocused(){
            return this.active;
        }

        _handleEnter(){
            this.signal("select",{item:this.active.item});
        }
    }

    class MenuItem extends lng.Component{
        static _template(){
            return {
                text:{fontSize:40, fontFace:"verdana"}, flexItem: {
                    marginRight:30
                }
            }
        }

        set item(v){
            this._item = v;
            this.text.text = v.label;
        }

        get item(){
            return this._item;
        }

        _focus(){
            this.setSmooth("scale",1.2);
        }

        _unfocus(){
            this.setSmooth("scale",1);
        }
    }

    class App extends ux.App {

        static getFonts() {
            return [
                {family: 'RobotoBold', url: App.getPath('fonts/Roboto-Bold.ttf'), descriptors: {}},
                {family: 'RobotoRegular', url: App.getPath('fonts/Roboto-Regular.ttf'), descriptors: {}}
            ];
        }

        static _template() {
            return {
                Splash:{
                    type: Splash, signals:{animationFinished: true}, alpha: 0
                },
                Movies:{
                    type: Browse, x: 100, y: 150, alpha: 0
                },
                TvShows:{
                    type: Browse, x: 100, y: 150, alpha: 0
                },
                Menu:{
                    type: Menu, x: 1550, y: -100, alpha:0.5, signals:{select: true}
                },
                Details:{
                    type: Details, signals:{detailsLoaded:"_loaded"}, alpha: 0.001
                },
                Loader:{
                    type: Loader, alpha: 0
                }
            };
        }

        _construct(){
            this._api = new Api();
        }

        _init(){
            this._setState("Splash");
        }

        $api(){
            return this._api;
        }

        $onItemSelect({item}){
            this._setState("Loading");
            this.tag("Details").asset = item;
        }

        _populate(data){
            data.forEach((props)=>{
                this.tag(props.ref).data = props.data;
            });
        }

        _handleUp(){
            this._setState("Menu");
        }

        static _states(){
            return [
                class Splash$$1 extends this{
                    $enter(){
                        this.tag("Splash").setSmooth("alpha",1);
                        this._api.getAppData().then((data)=>{
                            this.tag("Splash").startAnimation();
                            this._populate(data);
                        });
                    }
                    animationFinished(){
                        this._setState("Movies");
                        this.tag("Menu").setSmooth("y", 50);
                    }
                },
                class Loading extends this {
                    _captureKey(){
                        // capture
                    }
                    $enter({prevState}){
                        this._appReturnState = prevState;
                        this.tag("Loader").setSmooth("alpha",1);
                    }
                    $exit(){
                        this.tag("Loader").setSmooth("alpha",0);
                    }
                    _loaded(){
                        setTimeout(()=>{
                            this._setState("Details");
                        },2000);
                    }
                },
                class Menu$$1 extends this {
                    $enter({prevState}){
                        this._menuReturnState = prevState;
                        this.tag("Menu").setSmooth("alpha",1);
                    }
                    $exit(){
                        this.tag("Menu").setSmooth("alpha",0.5);
                    }
                    _getFocused(){
                        return this.tag("Menu");
                    }
                    _handleDown(){
                        this._setState(this._menuReturnState);
                    }
                    select({item}){
                        const {ref} = item;
                        if(this.tag(ref)){
                            this.tag(this._menuReturnState).setSmooth("alpha",0);
                            this._setState(ref);
                        }
                    }
                },
                class Movies extends this{
                    $enter(){
                        this.tag("Movies").setSmooth("alpha",1);
                    }
                    $exit({newState}){
                        this.tag("Movies").setSmooth("alpha",newState==="Menu"?1:0);
                    }
                    _getFocused(){
                        return this.tag("Movies");
                    }
                },
                class TvShows extends this{
                    $enter(){
                        this.tag("TvShows").setSmooth("alpha",1);
                    }
                    $exit({newState}){
                        this.tag("TvShows").setSmooth("alpha",newState==="Menu"?1:0);
                    }
                    _getFocused(){
                        return this.tag("TvShows");
                    }
                },
                class Details$$1 extends this {
                    $enter(){
                        this.tag("Details").setSmooth("alpha", 1);
                    }
                    $exit(){
                        this.tag("Details").setSmooth("alpha", 0.001);
                    }
                    _handleBack(){
                        this._setState(this._appReturnState);
                    }
                    _getFocused(){
                        return this.tag("Details");
                    }
                }
            ]
        }
    }

    return App;

}());
