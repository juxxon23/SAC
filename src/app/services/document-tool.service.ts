import { Injectable } from '@angular/core';
import { TinyMCE } from 'tinymce';

@Injectable({
  providedIn: 'root'
})
export class DocumentToolService {

  constructor() { }

  newAssistant: string = '<tr class="instru"><td class="num-asis" style="text-align: center;"></td><td colspan="2"><span class="full-name" style="text-indent: 0.34em;"></span></td><td><span class="id-instru" style="margin-left: 0.58em;"></span></td><td class="bonding-type" style="text-align: center;"></td><td class="bonding-type" style="text-align: center;"></td><td class="company-depen" colspan="2"></td><td colspan="2"><span class="mail-instru" style="text-indent: 0.60em;"></span></td><td style="text-align: center;"><span class="phone-ext" style="text-indent: 0.01em;"></span></td><td><br></td></tr>';
  currContent: any;
  framDoc: any;
  headerKeys: any = [
    'num-act',
    'name-meet',
    'city-date',
    'start-time',
    'end-time',
    'place',
    'reg-cent',
    'topic',
    'objective'
  ];
  bodyKey: string = 'body-act';
  footerKeys: any = [
    'activity',
    'respo',
    'date-act',
    'obser',
    'reg-asis',
    'objective'
  ];
  instruKey: string = 'instru';
  assistantKeys: any = [
    'num-asis',
    'full-name',
    'id-instru',
    'bonding-type',
    'company-depen',
    'mail-instru',
    'phone-ext'
  ];

  updateContent(content: any): any {
    this.setCurrentContent(content);
    this.getFrameDocument();
    this.headerContent();
    this.bodyContentV1();
    this.footerContent();
    this.listAssis();
  }

  setCurrentContent(content: any) {
    this.currContent = content;
  }

  getFrameDocument() {
    let framesColl = document.getElementsByTagName('iframe');
    this.framDoc = framesColl[0].contentDocument;
  }

  headerContent() {
    this.accessContent(this.headerKeys, this.currContent['header']);
  }

  bodyContentV1() {
    this.writeContent(this.bodyKey, this.currContent['body']);
  }

  footerContent() {
    this.accessContent(this.footerKeys, this.currContent['footer']);
  }

  listAssis() {
    let lisass: any, l: number, i: number, la: any, lal: number, colTable: string, e: any, el: number;
    lisass = this.currContent['footer']['list_asis'];
    l = lisass.length;
    colTable = this.addAssistant(lisass.length);
    // Insertar filas a lista de asistencia
    e = this.framDoc.getElementsByTagName('tr');
    el = e.length;
    e[el - 1].insertAdjacentHTML('afterEnd', colTable);
    e[el - l].remove();
    // Insertar los datos de los assitentes
    la = this.framDoc.getElementsByClassName(this.instruKey);
    lal = la.length;
    for (i = 0; i < lal; i++) {
      this.accessContent(this.assistantKeys, lisass[i]);
    }
  }

  addAssistant(n: number) {
    if (n == 1) {
      return this.newAssistant;
    } else {
      return this.newAssistant.repeat(n);
    }

  }

  accessContent(sectionKeys: any, content: any) {
    let l: number, n: number, i: number, k: string, kc: string;
    l = sectionKeys.length;
    for (i = 0; i < l; i++) {
      k = sectionKeys[i]
      n = k.search('-')
      if (n > 0) {
        kc = k.replace('-', '_');
        this.writeContent(k, content[kc]);
      } else {
        this.writeContent(k, content[k]);
      }

    }
  }

  writeContent(elementClass: string, content: string) {
    let e: any, l: number, i: number;
    e = this.framDoc.getElementsByClassName(elementClass);
    l = e.length;
    if (l == 1) {
      e[0].innerHTML = content;
    }
    else if (l == 0) {
      console.log('not found');
    }
    else {
      for (i = 0; i < l; i++) {
        e[i].innerHTML = content;
      }
    }
  }
}
