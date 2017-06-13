import {Pipe, PipeTransform} from '@angular/core';

import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {

      const renderer = new marked.Renderer();
      renderer.link = function (href, title, text) {
        if (href.includes('alvarez.tech')) {
          return '<a href="' + href + '">' + text + '</a>';
        } else {
          return '<a target="_blank" href="' + href + '">' +
            text +
            '&nbsp;' +
            '<span class="material-icons">launch</span>' +
            '</a>';
        }
      };
      renderer.image = function (href, title, text) {
        if (text.includes('*')) {
          return '<img class="shadow" alt="' + text + '" src="' + href + '">';
        } else {
          return '<img alt="' + text + '" src="' + href + '">';
        }
      };

      const mark = marked(value, {renderer: renderer});
      return mark;
    }
    return '';
  }

  prepare(raw: string) {
    if (!raw) {
      return '';
    }
    let indentStart: number;
    return raw
      .replace(/\&gt;/g, '>')
      .split('\n').map((line: string) => {
        // find position of 1st non-whitespace character
        // to determine the markdown indentation start
        if (line.length > 0 && isNaN(indentStart)) {
          indentStart = line.search(/\S|$/);
        }
        // remove whitespaces before indentation start
        return indentStart
          ? line.substring(indentStart)
          : line;
      }).join('\n');
  }

}
