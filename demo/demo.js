const parent = document.getElementById("parent");
const types = ['direction', 'justify', 'align', 'container', 'wrap', 'hide', 'show', 'flex', 'only'];
const classes = {
	direction: ['row', 'col', 'row-reverse', 'col-reverse'],
	justify: ['j-start', 'j-end', 'j-center', 'j-between', 'j-around'],
	align: ['a-start', 'a-end', 'a-center', 'a-baseline', 'a-stretch'],
	container: ['container', 'fluid'],
	wrap: ['wrap', 'wrap-reverse', 'nowrap'],
	hide: ['hide', 'hide-at'],
	show: ['show', 'show-at'],
	flex: ['flex', 'flex-at'],
	only: ['only']
};

function addChild() {
	if (parent.children.length < 10) {
		let child = document.createElement("div");
		let t = document.createTextNode(parent.children.length + 1);
		child.appendChild(t);
		child.className += "child";
		parent.appendChild(child);
	}

}
function deleteChild() {
	if (parent.lastChild) {
		parent.removeChild(parent.lastChild);
	}
}
function setupControls() {
	let controls = document.getElementById("controls");
	types.forEach(function (type) {
		classes[type].forEach(function (className) {
			let label = document.createElement("label");
			label.setAttribute("for", className);
			label.textContent = "." + className;
			controls.appendChild(label);
			let input = document.createElement("input");
			input.addEventListener('change', changeCSS);
			input.setAttribute("name", className);
			input.setAttribute("id", className);
			input.setAttribute("type", "checkbox");
			controls.appendChild(input);
		});
	});
}

function changeCSS() {
	let oldStyles = document.getElementById("generated-styles");
	if (oldStyles) {
		oldStyles.remove();
	}
	let extend = "";
	types.forEach(function (type) {
		classes[type].forEach(function (className) {
			if (document.getElementById(className).checked) {
				extend += "." + className + ",";
			}
		});
	});
	let fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("id", "generated-styles");
	fileref.setAttribute("href", "/style.css?extend=" + extend);
	document.getElementsByTagName("head")[0].appendChild(fileref);
}
for (let i = 0; i < 5; i++) {
	addChild();
}
setupControls();
changeCSS();
