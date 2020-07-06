var js = import("../pkg/md_collab.js");

var md = document.getElementById("md_input");
md.addEventListener("keyup", renderHtml);

var cssSelection = document.getElementById("output_css_selection");
cssSelection.addEventListener("change", specifyOutputCss);

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

renderHtml();
