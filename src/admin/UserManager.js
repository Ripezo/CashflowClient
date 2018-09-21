let instance;
let SocketManager 	= require('./SocketManager').getInstance();
let MD5 			= require('md5-js');
// let ProjectManager 	= require('./ProjectManager').getInstance();

let UserManager = function()
{
	
};

UserManager.prototype.init = function()
{
	console.log('UserManager.init();');
	SocketManager.on('whois', this.onWhoIsHandler.bind(this));
	SocketManager.on('login', this.onLoginHandler.bind(this));
	SocketManager.on('register', this.onRegisterHandler.bind(this));
};

UserManager.prototype.onWhoIsHandler = function(data)
{
	console.log('UserManager.onWhoIsHandler();');

	console.log(this.getCookie('token'));

	if(this.getCookie('token'))
	{
		var cookieValues = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1").split(':');
		SocketManager.emit('user-login', {
			email : cookieValues[0],
			token : cookieValues[1]
		});
	}
	else
	{
		this.addLoginOptions();
	}
};

UserManager.prototype.getCookie = (name) => {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
};

UserManager.prototype.setCookie = (name, value, days) => {
    let d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};

UserManager.prototype.addLoginOptions = function()
{
	let UserManager = this;

	let $UserOptions = $('#cashflow .user-options');
		$UserOptions.empty();

	let $loginButton = $('<button>', {
			class: 'mui-btn mui-btn--primary mui-btn--raised',
	        html: 'Sign In'
		}).appendTo($UserOptions);

		$loginButton.on('click', (event) => {
			event. preventDefault();
			UserManager.addLoginForm();
		});

	let $registerButton = $('<button>', {
			class: 'mui-btn mui-btn--primary mui-btn--raised',
	        html: 'Sign Up'
		}).appendTo($UserOptions);

		$registerButton.on('click', (event) => {
			event. preventDefault();
			UserManager.addRegisterForm();
		});
};

UserManager.prototype.addLoginForm = function()
{
	let signInForm = $('<form>', {
		id: 'login-form',
		class: 'mui-form'
	});

	let $shadowBoxContainer = $('<div>', {
		css: {
			width: '300px',
			background: 'white',
			padding: '15px',
			margin: '10% auto 0'
		},
		html: signInForm
	});

	let $shadowbox = mui.overlay('on', {
		'keyboard': true,
		'static': false,
		'onclose': () => {
			console.log('Close!');
		}
	}, $shadowBoxContainer.get(0));

	$('<legend>', {
		html: 'Email Address'
	}).appendTo(signInForm);

	let emailContainer = $('<div>', {
		class: 'mui-textfield',
		html: '<label>Required Text Field</label>'
	}).appendTo(signInForm);

	let userAccountInput = $('<input>', {
		id: 'user-account',
		type: 'text',
		name: 'email',
		required: true
	}).prependTo(emailContainer);

	$('<legend>', {
		html: 'Password'
	}).appendTo(signInForm);

	let passContainer = $('<div>', {
		class: 'mui-textfield',
		html: '<label>Required Text Field</label>'
	}).appendTo(signInForm);

	let userPasswordInput = $('<input>', {
		id: 'user-password',
		type: 'password',
		required: true
	}).prependTo(passContainer);

	let rememberContainer = $('<div>', {
		class: 'mui-checkbox',
		html: '<label>Remember me</label>'
	}).appendTo(signInForm);

	let rememberMe = $('<input>', {
		type: 'checkbox',
		value: ''
	}).prependTo(rememberContainer);

	let sendButton = $('<button>', {
		type: 'submit',
		class: 'mui-btn mui-btn--raised mui-btn--primary',
		html: 'Join'
	}).on('click', () => {
		event.preventDefault();

		let email 		= userAccountInput.val();
		let password 	= userPasswordInput.val();
		let remember 	= rememberMe.is(':checked');
		let token 		= MD5(email + password);

		SocketManager.emit('user-login', {
			token : token,
			remember : remember
		});
	}).appendTo(signInForm);

	let cancelButton = $('<button>', {
		type: 'button',
		class: 'mui-btn mui-btn--raised',
		html: "Cancel"
	}).on('click', (event) => {
		event.preventDefault();
		mui.overlay('off');
	}).appendTo(signInForm);
};

UserManager.prototype.addRegisterForm = function()
{
	let signUpForm = $('<form>', {
		id: 'register-form',
		class: 'mui-form'
	});

	let $shadowBoxContainer = $('<div>', {
		css: {
			width: '300px',
			background: 'white',
			padding: '15px',
			margin: '10% auto 0'
		},
		html: signUpForm
	});

	let $shadowbox = mui.overlay('on', {
		'keyboard': true,
		'static': false,
		'onclose': () => {
			console.log('Close!');
		}
	}, $shadowBoxContainer.get(0));

	$('<legend>', {
		html: 'Username'
	}).appendTo(signUpForm);

	let usernameContainer = $('<div>', {
		class: 'mui-textfield',
		html: '<label>Required Text Field</label>'
	}).appendTo(signUpForm);

	let usernameInput = $('<input>', {
		type: 'text',
		name: 'name',
		required: true
	}).prependTo(usernameContainer);

	$('<legend>', {
		html: 'Email Address'
	}).appendTo(signUpForm);

	let emailContainer = $('<div>', {
		class: 'mui-textfield',
		html: '<label>Required Text Field</label>'
	}).appendTo(signUpForm);

	let userAccountInput = $('<input>', {
		id: 'user-account',
		type: 'text',
		name: 'email',
		required: true
	}).prependTo(emailContainer);

	$('<legend>', {
		html: 'Password'
	}).appendTo(signUpForm);

	let passContainer = $('<div>', {
		class: 'mui-textfield',
		html: '<label>Required Text Field</label>'
	}).appendTo(signUpForm);

	let userPasswordInput = $('<input>', {
		type: 'password',
		name: 'password',
		required: true
	}).prependTo(passContainer);

	$('<legend>', {
		html: 'Confirm Password'
	}).appendTo(signUpForm);

	let confirmPassContainer = $('<div>', {
		class: 'mui-textfield',
		html: '<label>Required Text Field</label>'
	}).appendTo(signUpForm);

	let userPasswordConfirmInput = $('<input>', {
		type: 'password',
		name: 'password',
		required: true
	}).prependTo(confirmPassContainer);

	let rememberContainer = $('<div>', {
		class: 'mui-checkbox',
		html: '<label>Remember me</label>'
	}).appendTo(signUpForm);

	let rememberMe = $('<input>', {
		id: 'remember-me',
		type: 'checkbox',
		value: ''
	}).prependTo(rememberContainer);

	let sendButton = $('<button>', {
		type: 'submit',
		class: 'mui-btn mui-btn--raised mui-btn--primary',
		html: 'Register'
	}).on('click', () => {
		event.preventDefault();

		let username 	= usernameInput.val();
		let email 		= userAccountInput.val();
		let password 	= userPasswordInput.val();
		let confirm 	= userPasswordConfirmInput.val();
		let remember 	= rememberMe.is(':checked');
		let token 		= MD5(email + password);

		if(username.length < 2)
		{
			usernameInput.val('').focus();
		}
		else if(!this.validateEmail(email))
		{
			userAccountInput.val('').focus();
		}
		else if(password != confirm)
		{
			userPasswordInput.val('').focus();
			userPasswordConfirmInput.val('');
		}
		else
		{
			SocketManager.emit('user-register', {
				name : username,
				email : email,
				token : token,
				remember : remember
			});
		}
	}).appendTo(signUpForm);

	let cancelButton = $('<button>', {
		type: 'button',
		class: 'mui-btn mui-btn--raised',
		html: "Cancel"
	}).on('click', (event) => {
		event.preventDefault();
		mui.overlay('off');
	}).appendTo(signUpForm);
};

UserManager.prototype.onLoginHandler = function(data)
{
	console.log('onLoginHandler();');
	if(data.success)
	{
		mui.overlay('off');

		let $UserOptions = $('#cashflow .user-options');
			$UserOptions.empty();

		let $profileButton = $('<button>', {
			class: 'mui-btn mui-btn--flat mui-btn--primary',
	        html: data.success.name
		}).appendTo($UserOptions);

		$profileButton.on('click', (event) => {
			event. preventDefault();
		});

		if(data.success.remember)
		{
			this.setCookie('token', data.success.name + ':' + data.success.token);
		}
		else
		{
			this.setCookie('token', '', -1);
		}
	}
	else
	{
		$('#user-account').val('');
		$('#user-password').val('');
	}
};

UserManager.prototype.onRegisterHandler = function(data)
{
	//console.log('onRegisterHandler();');
	if(data.success)
	{
		mui.overlay('off');

		let $UserOptions = $('#cashflow .user-options');
			$UserOptions.empty();

		let $profileButton = $('<button>', {
			class: 'mui-btn mui-btn--flat mui-btn--primary',
	        html: data.success.name
		}).appendTo($UserOptions);

		$profileButton.on('click', (event) => {
			event. preventDefault();
		});

		if(data.success.remember)
		{
			this.setCookie('token', data.success.name + ':' + data.success.token);
		}
		else
		{
			this.setCookie('token', '', -1);
		}
	}
	else
	{
		$('#user-account').val('');
	}
};

UserManager.prototype.validateEmail = function(email)
{
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

exports.getInstance = function()
{
	if(!instance) instance = new UserManager();
	return instance;
};