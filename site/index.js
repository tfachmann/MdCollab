var FileSaver = require("file-saver");

var js = import("../pkg/md_collab.js");

var md = document.getElementById("md_input");

window.addEventListener("load", readMdFile("index.md"));
window.addEventListener("load", renderHtml);

md.addEventListener("keyup", renderHtml);
md.addEventListener("keydown", checkForTab, true);

var cssSelection = document.getElementById("output_css_selection");
cssSelection.addEventListener("change", specifyOutputCss);

var save = document.getElementById("btn_save");
save.addEventListener("click", function () { saveContents(getMdContents(), getFileName()); });

var saveToHtml = document.getElementById("btn_save_to_html");
saveToHtml.addEventListener("click", function () { saveHtmlContents(getHtmlContents(), getHtmlFileName()); });

function renderHtml () {
  const mdText = md.value;
  js.then(js => {
    const res = js.render(mdText);
    document.getElementById("html_output").innerHTML = res;
  });
}

function specifyOutputCss () {
  const newCssLink = "output-styles/" + cssSelection.value;
  // change css file
  document.getElementById("output_css").setAttribute("href", newCssLink);
}

function getMdContents () {
  // ...
  return md.value;
}

function getFileName () {
  // ....
  return "test.md";
}

function getHtmlContents () {
    // ...
    return document.getElementById("html_output").innerHTML;
}

function getHtmlFileName () {
    // ...
    return "test.html";
}

function saveContents (contents, filename) {
  const file = new Blob([contents], { type: "text/plain" });
  if (window.navigator.msSaveOrOpenBlob) { // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else { // Others
    FileSaver.saveAs(file, filename);
  }
}

function saveHtmlContents (contents, filename) {
  const file = new Blob([contents], { type: "text/html" });
  if (window.navigator.msSaveOrOpenBlob) { // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else { // Others
    FileSaver.saveAs(file, filename);
  }
}

function checkForTab (e) {
  const keyCode = e.keyCode || e.which;
  if (keyCode === 9) {
    e.preventDefault();
    const start = md.selectionStart;
    const end = md.selectionEnd;

    // set textarea value to: text in front of the selected range + tab + text after the selected range
    md.value = md.value.substring(0, start) + "\t" + md.value.substring(end);

    // put carriage at right position again
    md.selectionEnd = start + 1;
  }
}

function readMdFile (file) {
  const rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        const allText = rawFile.responseText;
        md.value = allText;
      }
    }
  };
  rawFile.send(null);
}
