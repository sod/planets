define(['pixijs'], function(PIXI) {
	var text = {};

	text.getCentered = function(text) {
		var textEntity = new PIXI.Text(text);
		textEntity.anchor.x = .5;
		textEntity.anchor.y = .5;
		textEntity.style.font = 'bold 15px Arial';
		textEntity.style.fill = 0x222222;

		return textEntity;
	};

	return text;
});