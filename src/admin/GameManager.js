let instance;
let SocketManager = require('./SocketManager').getInstance();

let GameManager = function() {

};

GameManager.prototype.init = () => {
	console.log('GameManager.init();');
};

exports.getInstance = () => {
	if(!instance) instance = new GameManager();
	return instance;
};