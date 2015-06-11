define([
	'PIXI',
	'service/debug'
], function(PIXI, debug) {
	/** @var {PIXI.Ticker} ticker */
	var ticker = PIXI.ticker.shared;
	var add = ticker.add.bind(ticker);

	ticker.autoStart = false;

	/**
	 * @param {Function|{tick: Function}} fn
	 * @param {*} [context=this]
	 */
	ticker.add = function(fn, context) {
		if(fn && fn.tick) {
			add(debug.measure(fn.tick), context || fn);
			return;
		}
		add(debug.measure(fn), context);
	};

	/**
	 * @param {Number} timesPerSecond
	 * @param {Function|{tick: Function}} fn
	 * @param {*} [context=this]
	 */
	ticker.addPerSecond = function(timesPerSecond, fn, context) {
		var lastExecutionTime = -1;
		var executeEveryMs = (1000 / timesPerSecond);
		fn = fn && fn.tick ? fn.tick : fn;

		add(function(deltaTime) {
			if((ticker.lastTime - lastExecutionTime) > executeEveryMs) {
				lastExecutionTime = ticker.lastTime;
				fn.call(context || this, deltaTime);
			}
		});
	};

	return ticker;
});