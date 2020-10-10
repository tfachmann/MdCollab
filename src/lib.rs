use pulldown_cmark::{html, Parser, Options};
use wasm_bindgen::prelude::*;
use regex::Regex;
use lazy_static::lazy_static;

fn clear_symbols(input: &str) -> String {
    input
        .replace("&gt;", ">")
        .replace('\u{200b}', "")
}

fn clear_input(input: &str) -> String {
    lazy_static! {
        static ref RE_CLOSING_PRE: Regex = Regex::new("</pre>").unwrap();
        static ref RE_ANY_TAG: Regex = Regex::new(r"</?\w+[^>;]*>").unwrap();
    }
    let out_linebreak = RE_CLOSING_PRE.replace_all(input, "\n").to_string();
    let cleared: String = RE_ANY_TAG.replace_all(&out_linebreak, "").into();
    clear_symbols(&cleared)
}

#[wasm_bindgen]
pub fn render(input: &str) -> String {
    let input = clear_input(input);
    let parser = Parser::new_ext(&input, 
        Options::ENABLE_FOOTNOTES |
        Options::ENABLE_TABLES |
        Options::ENABLE_STRIKETHROUGH |
        Options::ENABLE_TASKLISTS);

    let mut html_out = String::with_capacity(input.len());
    html::push_html(&mut html_out, parser);
    html_out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn clear_empty() {
        let input = "";

        assert_eq!(clear_input(input), "");
    }

    #[test]
    fn clear_simple() {
        let input = r###"<pre>Test</pre>"###;

        assert_eq!(clear_input(input), "Test\n");
    }

    #[test]
    fn clear_single() {
        let input = r###"<pre class=" CodeMirror-line " role="presentation"><span role="presentation">fasd</span></pre>"###;

        assert_eq!(clear_input(input), "fasd\n");
    }

    #[test]
    fn clear_heading() {
        let input = r###"<pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-formatting cm-formatting-header cm-formatting-header-2 cm-header cm-header-2">## </span><span class="cm-header cm-header-2">Heading</span></span></pre>"###;

        assert_eq!(clear_input(input), "## Heading\n")
    }

    #[test]
    fn clear_citation() {
        let input = r###"<pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-formatting cm-formatting-quote cm-formatting-quote-1 cm-quote cm-quote-1">&gt; </span><span class="cm-quote cm-quote-1">cite</span></span></pre>"###;

        assert_eq!(clear_input(input), "> cite\n")
    }

    #[test]
    fn clear_citation_gap() {
        let input = r###"<pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-formatting cm-formatting-quote cm-formatting-quote-1 cm-quote cm-quote-1 CodeMirror-selectedtext">&gt; </span><span class="cm-quote cm-quote-1 CodeMirror-selectedtext">cite</span></span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span cm-text="">​</span></span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class=" CodeMirror-selectedtext">gap</span></span></pre>"###;

        assert_eq!(clear_input(input), "> cite\n\ngap\n")
    }

    #[test]
    fn clear_multiple() {
        let input = r###"<pre class=" CodeMirror-line " role="presentation"><span role="presentation">fasdf</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation">12345</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span cm-text="">​</span></span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-formatting cm-formatting-header cm-formatting-header-1 cm-header cm-header-1"># </span><span class="cm-header cm-header-1">Hallo</span></span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span cm-text="">​</span></span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation">cool!</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span cm-text="">​</span></span></pre>"###;

        assert_eq!(clear_input(input), "fasdf\n12345\n\n# Hallo\n\ncool!\n\n");
    }
}

