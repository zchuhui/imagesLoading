// 图片预加载
(function($){

	function PreLoad(images,options){
		// 判断图片是否数组
		this.images = (typeof images === "string") ? [images] : images;
		this.options = $.extend({},PreLoad.DEFAULTS,options);

		this._unordered();

	};

	PreLoad.DEFAULTS = {
		each:null,       //每张图片加载后执行
		all:null         //全部图片加载后执行
	};

	PreLoad.prototype._unordered = function(){
		var images = this.images,
			options = this.options,
			count = 0,
			len = images.length;

		//无序加载
		$.each(images,function(i,src){
			if (typeof src !== "string") return;
					
			var image = new Image();
			
			$(image).on("load error",function(){
				options.each && options.each(count);
				
				if(count >= len-1){
					options.all && options.all();
				}
				 count ++; 
			
			});
			
			image.src = src;
		
		});

	}

    $.extend({
    	preLoad:function(imgs,opts){
    		new PreLoad(imgs,opts);
    	}
    })


})(jQuery);