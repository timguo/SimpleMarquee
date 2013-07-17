/*
 * JavaScript plugin for Marquee v0.1.0
 * Only if the TEXT is out of the wrapper, just play the marquee.
 *
 * Date: 06/24/2013
 *
 * @author Tim Guo - timhappya(at)gmail(dot)com
 */
function SimpleMarquee(el, opts){
    var self = this;
	this.wrapper = typeof el=='object'?el:document.getElementById(el);
	this._tm = null;
	this.opts = {
		speed: 10,  // millisecond, speed for the animation
		delay_start: 5000,  // millisecond, delay before start
		delay_after: 3000,  //millisecond, delay after the animation finished
	};
	for (i in opts) this.opts[i] = opts[i];
	this._init = function(){
		this.wrapper.style.overflow = "hidden";
		this.wrapper.style.whiteSpace = "nowrap";
		this.container = document.createElement("div");
		this.container.innerHTML = this.wrapper.innerHTML;
		this.container.style.whiteSpace = "nowrap";
		this.wrapper.innerHTML = "";
		this.wrapper.appendChild(this.container);
		this.wrapper.scrollLeft = 0;
		this.start();
	}
	this.start = function(){
		if(self.wrapper.scrollWidth-self.wrapper.clientWidth>0){
			self._tm = setTimeout(self.play, self.opts.delay_start);
		}else{ // no scroll
		}
	}
	this.play = function(){
		if(self.wrapper.scrollWidth-self.wrapper.clientWidth-self.wrapper.scrollLeft<=0){
			self._tm = setTimeout(self.end, self.opts.delay_after);
		}else{
			self.wrapper.scrollLeft = self.wrapper.scrollLeft+1;
			self._tm = setTimeout(self.play, self.opts.speed)
		}
	}
	this.end = function(){
		self.refresh();
	}
	this.refresh = function(){
		clearTimeout(self._tm);
		self.wrapper.scrollLeft=0;
		self.start();
	}
	this._init();
}
