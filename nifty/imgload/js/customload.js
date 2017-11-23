(function(){
    'use strict';
    var regBgp = /\.bpg$/i;

    var swapImage = function(img, src){
            var ctx, BPGimg;

            var canvas = document.createElement('canvas');

            canvas.className = img.className;

            img.parentNode.replaceChild(canvas, img);

            ctx = canvas.getContext("2d");
            BPGimg = new BPGDecoder(ctx);

            //
            BPGimg.onload = function() {
                /* draw the image to the canvas */
                canvas.width = this.imageData.width;
                canvas.height = this.imageData.height;
                ctx.putImageData(this.imageData, 0, 0);
            };
            BPGimg.load(src);
    };

    //start: new
    var slice = [].slice;
    var getCurrentSrc = function(img){
        var sources = [img];
        var parent = img.parentNode;

        if(parent.nodeName.toLowerCase() == 'picture'){
            sources = slice.call(parent.querySelectorAll('source, img')).filter(function(source){
                var media = source.getAttribute('media');
                return (!media || window.matchMedia(media));
            });
        }
        return sources[0] ?
            sources[0].getAttribute(lazySizesConfig.srcAttr) || sources[0].getAttribute(lazySizesConfig.srcsetAttr) || '' :
            ''
        ;
    };
    //end: new

    document.addEventListener('lazybeforeunveil', function(e){
        var src = getCurrentSrc(e.target);
        if(regBgp.test(src)){
            e.preventDefault();
            swapImage(e.target, src);
        }
    });
})();