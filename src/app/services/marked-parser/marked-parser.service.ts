import { Injectable } from '@angular/core';

import marked from 'marked';

@Injectable()
export class MarkedParserService {

  private md;

  constructor() { 
    this.md = marked;
    this.md.setOptions({
      gfm:true,
      breaks:true,
      sanitize: true,
      smartypants: true,
      xhtml: true
    });
  }



  public convert(markdown: string){
    return this.md.parse(markdown);
  }

  public updateInput(str: string){
    console.log(str)
  }
}
