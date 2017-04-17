import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      let isContinueUl = false;
      const lines = value.split('\n');
      let newValue = '';
      for (const line of lines) {
        // console.log('-> ' + line);
        // Pre questions
        if (isContinueUl && !line.startsWith('* ')) {
          newValue += '</ul>';
          isContinueUl = false;
        }
        // Line by line
        if (line.startsWith('## ')) {
          newValue += '<h2>' + line.substring(3, line.length) + '</h2>';
        } else if (line.startsWith('### ')) {
          newValue += '<h3>' + line.substring(4, line.length) + '</h3>';
        } else if (line.startsWith('#### ')) {
          newValue += '<h4>' + line.substring(5, line.length) + '</h4>';
        } else if (line.startsWith('##### ')) {
          newValue += '<h5>' + line.substring(6, line.length) + '</h5>';
        } else if (line.startsWith('* ')) {
          if (!isContinueUl) {
            newValue += '<ul>';
            isContinueUl = true;
          }
          newValue += '<li>' + line.substring(2, line.length) + '</li>';
        } else if (line.length === 0) {
          newValue += '';
        } else if (line.startsWith('![')) {
          const imageUrl = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
          const imageAlt = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
          console.log('Alt:' + imageAlt);
          newValue += '<img src="' + imageUrl + '" alt="' + imageAlt + '">';
        } else {
          newValue += '<p>' + line.replace(' `', ' <code>').replace('`', '</code>') + '</p>';
        }
      }
      return newValue;
    }
    return '';
  }

}
