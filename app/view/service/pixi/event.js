define(function() {
	var event = {};

	/**
	 * @param {PIXI.Container[]} elements
	 * @param {String} eventName
	 */
	event.emit = function(elements, eventName) {
		elements.forEach(function(entity) {
			entity.emit(eventName);
		});
	};

	return event;
});