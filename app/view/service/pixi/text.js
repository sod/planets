define(['PIXI'], function(PIXI) {
	var text = {};

	text.getCentered = function() {
		var textEntity = new PIXI.Text('');
		textEntity.anchor.x = .5;
		textEntity.anchor.y = .5;
		textEntity.style.font = 'bold 15px Arial';
		textEntity.style.fill = 0x222222;

		textEntity.setText = function(text) {
			textEntity.text = text;
		};

		return textEntity;
	};

	return text;
});