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
	 * @returns {Function}
	 */
	var getTickerFn = function(fn) {
		return debug.measure(typeof fn.tick === 'function' ? fn.tick : fn);
	};

	/**
	 * @param {Function|{tick: Function}} fn
	 * @param {*} [context=this]
	 */
	ticker.add = function(fn, context) {
		add(getTickerFn(fn), context);
	};

	/**
	 * @param {Number} timesPerSecond
	 * @param {Function|{tick: Function}} fn
	 * @param {*} [context=this]
	 */
	ticker.addPerSecond = function(timesPerSecond, fn, context) {
		var lastExecutionTime = -1;
		var executeEveryMs = (1000 / timesPerSecond);
		fn = getTickerFn(fn);

		add(function(deltaTime) {
			if((ticker.lastTime - lastExecutionTime) > executeEveryMs) {
				lastExecutionTime = ticker.lastTime;
				fn.call(context || this, deltaTime);
			}
		});
	};

	return ticker;
});