const parent = document.getElementById("parent");
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
function changeCSS() {
	let oldStyles = document.getElementById("generated-styles");
	if (oldStyles) {
		oldStyles.remove();
	}
	let rowVal = document.getElementById("row").checked;
 	let extend = "";
	if (rowVal) {
		extend += ".row,";
	}
	let fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("id", "generated-styles");
	fileref.setAttribute("href", "/style.css?extend=" + extend);
	document.getElementsByTagName("head")[0].appendChild(fileref);
}
for (let i = 0; i < 5; i++) {
	addChild();
}
changeCSS();
