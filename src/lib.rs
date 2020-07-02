use pulldown_cmark::{html, Parser, Options};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn render(input: &str) -> String {
    let parser = Parser::new_ext(input, 
        Options::ENABLE_FOOTNOTES |
        Options::ENABLE_TABLES |
        Options::ENABLE_STRIKETHROUGH |
        Options::ENABLE_TASKLISTS);

    let mut html_out = String::with_capacity(input.len());
    html::push_html(&mut html_out, parser);
    html_out
}
