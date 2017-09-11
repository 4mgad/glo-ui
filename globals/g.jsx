export default class g {

	static setApp(app) {
		g._APP = app;
		window.onerror = (msg, url, line, col, error) => {
			app.showMessage("Error", msg);
		};
	}

	static getApp() {
		return g._APP;
	}

	static showTooltip({content, position, showDelay, hideDelay}) {
		if (g._APP) {
			g._APP.showTooltip({content, position, showDelay, hideDelay});
		}
	}

	static hideTooltip() {
		if (g._APP) {
			g._APP.hideTooltip();
		}
	}

	static showMessage({title, content, buttons, className = ""}) {
		if (g._APP) {
			g._APP.showMessage(title, content, buttons, className);
		}
	}

	static showDialog({title, content, buttons, className = ""}) {
		if (g._APP) {
			let classNames = ["dialog"];
			classNames.push(...className.split(" "));
			g._APP.showMessage(title, content, buttons, classNames.join(" "));
		}
	}

	static showErrorMessage(err) {
		console.error(err);
		if (g._APP) {
			g._APP.showMessage("Error", err.message);
		}
	}

	static hideMessage() {
		if (g._APP) {
			g._APP.hideMessage();
		}
	}
}
