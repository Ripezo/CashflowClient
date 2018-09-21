let SocketManager 	= require('./admin/SocketManager').getInstance();
let UserManager 	= require('./admin/UserManager').getInstance();
let GameManager		= require('./admin/GameManager').getInstance();
	

$(() => {
	SocketManager.on('connect', () => {
		UserManager.init();
		GameManager.init();
	});
});