var FileSaver = require('file-saver');

var js = import("../pkg/md_collab.js");

var md = document.getElementById("md_input");

window.addEventListener("load", readMdFile("index.md"));
window.addEventListener("load", renderHtml);

md.addEventListener("keyup", renderHtml);
md.addEventListener("keydown", checkForTab, true);

var cssSelection = document.getElementById("output_css_selection");
cssSelection.addEventListener("change", specifyOutputCss);

var save = document.getElementById("btn_save");
save.addEventListener("click", function(){save_contents(get_md_contents(), get_file_name());});

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


function get_md_contents() {
    //...
    return md.value;
}


function get_file_name() {
    //....
    return 'test.md';
}


function save_contents(contents, filename) {
    let file = new Blob([contents], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
        FileSaver.saveAs(file, filename);
    }
}


function checkForTab(e) {
  let keyCode = e.keyCode || e.which;
  if (keyCode == 9) {
    e.preventDefault();
    let start = md.selectionStart;
    let end = md.selectionEnd;

    // set textarea value to: text in front of the selected range + tab + text after the selected range
    md.value = md.value.substring(0, start) + "\t" + md.value.substring(end);

    // put carriage at right position again
    md.selectionEnd = start + 1;
  }
}

function readMdFile(file)
{
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                let allText = rawFile.responseText;
                md.value = allText;
            }
        }
    }
    rawFile.send(null);
}
