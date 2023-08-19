export class ZoomService {

	private TRANSITION_DURATION = 800;

	private level = 1;

	private mouseX = 0;
	private	mouseY = 0;

	private panEngageTimeout: number | NodeJS.Timeout = -1;
  private	panUpdateInterval: number | NodeJS.Timer = -1;

	private callbackTimeout = -1;

	private supportsTransforms = 	'WebkitTransform' in document.body.style ||
								'MozTransform' in document.body.style ||
								'msTransform' in document.body.style ||
								'OTransform' in document.body.style ||
								'transform' in document.body.style;

  constructor() {
    if( this.supportsTransforms ) {
      // The easing that will be applied when we zoom in/out
      document.body.style.transition = 'transform '+ this.TRANSITION_DURATION +'ms ease';
      //document.body.style.OTransition = '-o-transform '+ this.TRANSITION_DURATION +'ms ease';
      //document.body.style.msTransition = '-ms-transform '+ this.TRANSITION_DURATION +'ms ease';
      //document.body.style.MozTransition = '-moz-transform '+ this.TRANSITION_DURATION +'ms ease';
      //document.body.style.WebkitTransition = '-webkit-transform '+ this.TRANSITION_DURATION +'ms ease';
    }

    document.addEventListener( 'keyup', this.keyupEvent);
    document.addEventListener( 'mousemove', this.mouseMoveEvent);
  }
  keyupEvent = (event: KeyboardEvent) => {
    if( this.level !== 1 && event.keyCode === 27 ) {
      this.out(undefined);
    }
  }
  mouseMoveEvent = (event: MouseEvent) => {
    if( this.level !== 1 ) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
  }

	private magnify( rect: OptionsZoom, scale: number ) {

		var scrollOffset = this.getScrollOffset();

		// Ensure a width/height is set
		rect.width = rect.width || 1;
		rect.height = rect.height || 1;

		// Center the rect within the zoomed viewport
		rect.x -= ( window.innerWidth - ( rect.width * scale ) ) / 2;
		rect.y -= ( window.innerHeight - ( rect.height * scale ) ) / 2;

		if( this.supportsTransforms ) {
			// Reset
			if( scale === 1 ) {
				document.body.style.transform = '';
				//document.body.style.OTransform = '';
				//document.body.style.msTransform = '';
				//document.body.style.MozTransform = '';
				//document.body.style.WebkitTransform = '';
			}
			// Scale
			else {
				var origin = scrollOffset.x +'px '+ scrollOffset.y +'px',
					transform = 'translate('+ -rect.x +'px,'+ -rect.y +'px) scale('+ scale +')';

				document.body.style.transformOrigin = origin;
				//document.body.style.OTransformOrigin = origin;
				//document.body.style.msTransformOrigin = origin;
				//document.body.style.MozTransformOrigin = origin;
				//document.body.style.WebkitTransformOrigin = origin;

				document.body.style.transform = transform;
				//document.body.style.OTransform = transform;
				//document.body.style.msTransform = transform;
				//document.body.style.MozTransform = transform;
				//document.body.style.WebkitTransform = transform;
			}
		}
		else {
			// Reset
			if( scale === 1 ) {
				document.body.style.position = '';
				document.body.style.left = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.height = '';
				//document.body.style.zoom = '';
			}
			// Scale
			else {
				document.body.style.position = 'relative';
				document.body.style.left = ( - ( scrollOffset.x + rect.x ) / scale ) + 'px';
				document.body.style.top = ( - ( scrollOffset.y + rect.y ) / scale ) + 'px';
				document.body.style.width = ( scale * 100 ) + '%';
				document.body.style.height = ( scale * 100 ) + '%';
				//document.body.style.zoom = scale;
			}
		}

		this.level = scale;
	}

	private pan() {
		var range = 0.12,
			rangeX = window.innerWidth * range,
			rangeY = window.innerHeight * range,
			scrollOffset = this.getScrollOffset();

		// Up
		if( this.mouseY < rangeY ) {
			window.scroll( scrollOffset.x, scrollOffset.y - ( 1 - ( this.mouseY / rangeY ) ) * ( 14 / this.level ) );
		}
		// Down
		else if( this.mouseY > window.innerHeight - rangeY ) {
			window.scroll( scrollOffset.x, scrollOffset.y + ( 1 - ( window.innerHeight - this.mouseY ) / rangeY ) * ( 14 / this.level ) );
		}

		// Left
		if( this.mouseX < rangeX ) {
			window.scroll( scrollOffset.x - ( 1 - ( this.mouseX / rangeX ) ) * ( 14 / this.level ), scrollOffset.y );
		}
		// Right
		else if( this.mouseX > window.innerWidth - rangeX ) {
			window.scroll( scrollOffset.x + ( 1 - ( window.innerWidth - this.mouseX ) / rangeX ) * ( 14 / this.level ), scrollOffset.y );
		}
	}

	private getScrollOffset() {
		return {
			x: window.scrollX !== undefined ? window.scrollX : window.pageXOffset,
			y: window.scrollY !== undefined ? window.scrollY : window.pageYOffset
		}
	}

  public to( options : OptionsZoom ) {
			if( this.level !== 1 ) {
				this.out(undefined);
			} else {
				options.x = options.x || 0;
				options.y = options.y || 0;

				// If an element is set, that takes precedence
				if( !!options.element ) {
					// Space around the zoomed in element to leave on screen
					var padding = typeof options.padding === 'number' ? options.padding : 20;
					var bounds = options.element.getBoundingClientRect();

					options.x = bounds.left - padding;
					options.y = bounds.top - padding;
					options.width = bounds.width + ( padding * 2 );
					options.height = bounds.height + ( padding * 2 );
				}

				// If width/height values are set, calculate scale from those values
				if( options.width !== undefined && options.height !== undefined ) {
					options.scale = Math.max( Math.min( window.innerWidth / options.width, window.innerHeight / options.height ), 1 );
				}

				if( options.scale > 1 ) {
					options.x *= options.scale;
					options.y *= options.scale;
					options.x = Math.max( options.x, 0 );
					options.y = Math.max( options.y, 0 );

					this.magnify( options, options.scale );

					if( options.pan !== false ) {

						this.panEngageTimeout = setTimeout(this.calculatePanUpdateInterval , this.TRANSITION_DURATION );

					}

					if( typeof options.callback === 'function' ) {
						this.callbackTimeout = setTimeout( options.callback, this.TRANSITION_DURATION );
					}
				}
			}
		}
  private calculatePanUpdateInterval() {
		this.panUpdateInterval = setInterval( this.pan, 1000 / 60 );
  }
  public out( options: OptionsZoom | undefined ){
			clearTimeout( this.panEngageTimeout );
			clearInterval( this.panUpdateInterval );
			clearTimeout( this.callbackTimeout );
			this.magnify( new OptionsZoom(0, 0, 1), 1 );
			if( options && typeof options.callback === 'function' ) {
				setTimeout( options.callback, this.TRANSITION_DURATION );
			}
			this.level = 1;
  }
}

export class OptionsZoom {
  public x : number = 0
  public y: number = 0
  public scale : number = 0
  public callback : Function | undefined
  public width: number | undefined
  public height: number | undefined
  public padding: number | undefined
  public element: HTMLElement | undefined
  public pan: boolean | any
  constructor (x: number, y: number , scale: number) {
    this.x = x
    this.y = y
    this.scale = scale
  }
}
