import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
export const mdOpt = {
  html: true,
  xhtmlOut: false,
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  quotes: '‘’“”',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  },
};
const md = MarkdownIt(mdOpt);
