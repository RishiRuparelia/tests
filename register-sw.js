"use strict";
const stockSW = "./sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error("Service workers cannot be registered without https.");
		throw new Error("Your browser doesn't support service workers.");
	}

	const reg = await navigator.serviceWorker.register(stockSW, { scope: "/" });
	if (reg.installing) {
		await new Promise((resolve) => {
			reg.installing.addEventListener("statechange", () => {
				if (reg.active && navigator.serviceWorker.controller) resolve();
			});
		});
	}
	await navigator.serviceWorker.ready;
}
