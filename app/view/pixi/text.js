define(['PIXI'], function(PIXI) {
	var text = {};

	text.getCentered = function() {
		var textEntity = new PIXI.Text('');
		textEntity.anchor.x = textEntity.anchor.y = .5;
		textEntity.style.font = 'bold 14px Arial';
		textEntity.style.fill = 'white';
		textEntity.style.dropShadow = true;
		textEntity.style.dropShadowDistance = 1;
		textEntity.style.dropShadowColor = '#444444';
		textEntity.resolution = 2;

		/**
		 * @param {String}  text
		 */
		textEntity.setText = function(text) {
			textEntity.text = text;
		};

		return textEntity;
	};

	return text;
});