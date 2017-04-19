import {Pipe, PipeTransform} from '@angular/core';

import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      let mark = marked(value);
      mark = mark.replace(/(<a.*href="([^"]*)"[^>]*)>/ig, '$1 class=\"btn btn-outline-primary\">');
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
