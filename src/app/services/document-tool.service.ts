import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentToolService {

  constructor(
    public auth: AuthService
  ) { }

  act: any;
  rows: any;
  tableContent: any = [];
  tabCurrent: any;
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
  bodyKey: any = [
    'deact',
    'conclusion'
  ];
  footerKeys: any = [
    'activity',
    'respo',
    'date-act',
    'img-assis',
    'reg-asis',
    'objective-assis'
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

  setCurrentTable() {
    this.getFrameDocument();
    this.tabCurrent = this.framDoc.getElementsByTagName('table');
    return this.tabCurrent;
  }

  setContentTable(content: any) {
    let tab: any, r: any, l: any, lcc: number, lc: number, e: any, el: number;
    let liElem: string = '<ol style="list-style-type:decimal;"><li><span style="margin-right: 1.21em;" class="topic" data-mce-style="margin-right: 1.21em;">Hola amigos</span></li></ol>';
    tab = this.setCurrentTable();
    for (let i = 0; i < tab.length; i++) {
      r = tab[i].rows;
      for (let j = 0; j < r.length; j++) {
        if (j < 4 || j > 5) {
          l = r[j].cells;
          if (l.length == 1) {
            lcc = l[0].children.length;
            // Si solo tiene un elemento hijo
            if (lcc == 0 || lcc == 1) {
              l[0].innerText = content[i][j];
            } else {
              for (let m = 0; m < lcc; m++) {
                l[0].children[m].innerText = content[i][j][m];
              }
            }
          } else {
            for (let k = 0; k < l.length; k++) {
              lc = l[k].children.length;
              // Si solo tiene un elemento hijo
              if (lc == 1) {
                l[k].children[0].innerText = content[i][j][k];
              } else {
                for (let m = 0; m < lc; m++) {
                  l[k].children[m].innerText = content[i][j][k][m]
                }
              }
            }
          }
        }
      }
    }
  }

  getContentTable(): any {
    let tab: any, r: any, l: any, lcc: number, lc: number;
    tab = this.setCurrentTable();
    for (let i = 0; i < tab.length; i++) {
      r = tab[i].rows;
      this.tableContent[i] = []
      // Recorre sobre las filas
      for (let j = 0; j < r.length; j++) {
        l = r[j].cells;
        // Si solo tiene una columna
        if (l.length == 1) {
          lcc = l[0].children.length;
          // Si solo tiene un elemento hijo
          if (lcc == 0 || lcc == 1) {
            this.tableContent[i][j] = l[0].innerText;
          } else {
            this.tableContent[i][j] = [];
            let childTab: any = [];
            // Sino guarda el texto de cada elemento hijo
            for (let m = 0; m < lcc; m++) {
              childTab.push(l[0].children[m].innerText);
            }
            this.tableContent[i][j] = childTab;
          }
        } else {
          // Sino tiene solo una columna
          this.tableContent[i][j] = [];
          // Recorre sobre las columnas
          for (let k = 0; k < l.length; k++) {
            lc = l[k].children.length;
            // Si solo tiene un elemento hijo
            if (lc == 1) {
              this.tableContent[i][j][k] = l[k].children[0].innerText;
            } else {
              let childTab: any = [];
              // Sino guarda el texto de cada elemento hijo
              for (let m = 0; m < lc; m++) {
                childTab.push(l[k].children[m].innerText);
              }
              this.tableContent[i][j][k] = childTab;
            }
          }
        }
      }
    }
    return this.tableContent;
  }

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
    let e = this.framDoc.getElementsByClassName('start-deact');
    e[0].innerHTML = this.currContent['body_h'];
  }

  footerContent() {
    this.accessContent(this.footerKeys, this.currContent['footer']);
  }

  listAssis() {
    let lisass: any, l: number, i: number, la: any, lal: number, colTable: string, e: any, el: number;
    let opt: string = "assis";
    lisass = this.currContent['footer']['list_asis'];
    l = lisass.length;
    colTable = this.addAssistant();
    // Insertar filas a lista de asistencia
    e = this.framDoc.getElementsByTagName('tr');
    el = e.length;
    e[el - 1].insertAdjacentHTML('afterEnd', colTable);
    this.accessContent(this.assistantKeys, lisass, opt);
    let dd: any = this.framDoc.getElementsByClassName('instru');
    dd[0].remove();
  }

  addAssistant() {
    return '<tr><td style="text-align:center;"><span class="num-asis">1</span></td><td colspan="2"><span style="margin-left:2.93em;"><br></span></td><td><span style="margin-left:0.45em" class="full-name"><br></span></td><td><span style="margin-left:0.45em" class="id-instru"><br></span></td><td style="text-align:center;"><span class="bonding-type"><br></span></td><td style="text-align:center;"><span class="bonding-type"><br></span></td><td style="text-align:center;"><span class="bonding-type"><br></span></td><td><span style="margin-left:0.45em;" class="company-depen"><br></span></td><td><span style="margin-left:0.45em" class="mail-instru"><br></span></td><td><span style="margin-left:0.46em" class="phone-ext"><br></span></td><td style="text-align:center;"><span><br></span></td><td><span style="margin-left:0.48em;"><br></span></td></tr>';
  }

  accessContent(sectionKeys: any, content: any, opt: string = "default") {
    let l: number, n: number, i: number, k: string, kc: string, inst: any;
    let m: any = [];
    l = sectionKeys.length;
    for (i = 0; i < l; i++) {
      k = sectionKeys[i]
      n = k.search('-')
      if (n > 0) {
        kc = k.replace('-', '_');
        m[i] = kc
      } else {
        m[i] = k
      }
    }
    if (opt == "default") {
      for (i = 0; i < l; i++) {
        let ind: string = m[i];
        this.writeContent(sectionKeys[i], content[ind]);
      }
    } else if (opt == "assis") {
      let la = this.framDoc.getElementsByClassName(this.instruKey);
      let lal = la.length - 1;
      for (i = 0; i < lal; i++) {
        inst = content[i];
        for (let j = 0; j < l; j++) {
          let sk: string = sectionKeys[j] + i.toString();
          let ind: string = m[j];
          this.writeContent(sk, inst[ind]);
        }
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


  getAct(doc: any): any {
    this.act = {
      't': doc['template'],
      'c': doc['u']
    }
    return this.act;
  }
}
