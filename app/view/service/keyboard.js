define(function() {
	var keyboard = {};

	function KeyboardState() {
		this.left = false;
		this.up = false;
		this.right = false;
		this.down = false;
	}

	keyboard.state = new KeyboardState();
	keyboard.map = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	function keydown(event) {
		var key = keyboard.map[event.which];
		if(key in keyboard.state) {
			keyboard.state[key] = true;
		}
	}

	function keyup(event) {
		var key = keyboard.map[event.which];
		if(key in keyboard.state) {
			keyboard.state[key] = false;
		}
	}

	document.body.addEventListener('keydown', keydown);
	document.body.addEventListener('keyup', keyup);

	return keyboard;
});