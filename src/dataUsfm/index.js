import {GEN} from '../dataUsfm/01-GEN';
import {EXO} from '../dataUsfm/02-EXO';
import {LEV} from '../dataUsfm/03-LEV';
import {NUM} from '../dataUsfm/04-NUM';
import {DEU} from '../dataUsfm/05-DEU';
import {JOS} from '../dataUsfm/06-JOS';
import {JDG} from '../dataUsfm/07-JDG';
import {RUT} from '../dataUsfm/08-RUT';
import {SA1} from '../dataUsfm/09-1SA';
import {SA2} from '../dataUsfm/10-2SA';
import {KI1} from '../dataUsfm/11-1KI';
import {KI2} from '../dataUsfm/12-2KI';
import {CH1} from '../dataUsfm/13-1CH';
import {CH2} from '../dataUsfm/14-2CH';
import {EZR} from '../dataUsfm/15-EZR';
import {NEH} from '../dataUsfm/16-NEH';
import {EST} from '../dataUsfm/17-EST';
import {JOB} from '../dataUsfm/18-JOB';
import {PSA} from '../dataUsfm/19-PSA';
import {PRO} from '../dataUsfm/20-PRO';
import {ECC} from '../dataUsfm/21-ECC';
import {SNG} from '../dataUsfm/22-SNG';
import {ISA} from '../dataUsfm/23-ISA';
import {JER} from '../dataUsfm/24-JER';
import {LAM} from '../dataUsfm/25-LAM';
import {EZK} from '../dataUsfm/26-EZK';
import {DAN} from '../dataUsfm/27-DAN';
import {HOS} from '../dataUsfm/28-HOS';
import {JOL} from '../dataUsfm/29-JOL';
import {AMO} from '../dataUsfm/30-AMO';
import {OBA} from '../dataUsfm/31-OBA';
import {JON} from '../dataUsfm/32-JON';
import {MIC} from '../dataUsfm/33-MIC';
import {NAM} from '../dataUsfm/34-NAM';
import {HAB} from '../dataUsfm/35-HAB';
import {ZEP} from '../dataUsfm/36-ZEP';
import {HAG} from '../dataUsfm/37-HAG';
import {ZEC} from '../dataUsfm/38-ZEC';
import {MAL} from '../dataUsfm/39-MAL';
import {MAT} from '../dataUsfm/41-MAT';
import {MRK} from '../dataUsfm/42-MRK';
import {LUK} from '../dataUsfm/43-LUK';
import {JHN} from '../dataUsfm/44-JHN';
import {ACT} from '../dataUsfm/45-ACT';
import {ROM} from '../dataUsfm/46-ROM';
import {CO1} from '../dataUsfm/47-1CO';
import {CO2} from '../dataUsfm/48-2CO';
import {GAL} from '../dataUsfm/49-GAL';
import {EPH} from '../dataUsfm/50-EPH';
import {PHP} from '../dataUsfm/51-PHP';
import {COL} from '../dataUsfm/52-COL';
import {TH1} from '../dataUsfm/53-1TH';
import {TH2} from '../dataUsfm/54-2TH';
import {TI1} from '../dataUsfm/55-1TI';
import {TI2} from '../dataUsfm/56-2TI';
import {TIT} from '../dataUsfm/57-TIT';
import {PHM} from '../dataUsfm/58-PHM';
import {HEB} from '../dataUsfm/59-HEB';
import {JAS} from '../dataUsfm/60-JAS';
import {PE1} from '../dataUsfm/61-1PE';
import {PE2} from '../dataUsfm/62-2PE';
import {JN1} from '../dataUsfm/63-1JN';
import {JN2} from '../dataUsfm/64-2JN';
import {JN3} from '../dataUsfm/65-3JN';
import {JUD} from '../dataUsfm/66-JUD';
import {REV} from '../dataUsfm/67-REV';


const tabDocUsfm = [GEN, EXO, LEV, NUM, DEU, JOS, JDG, RUT, SA1, SA2, KI1, KI2, CH1, CH2, EZR, NEH, EST, JOB, PSA, PRO, ECC, SNG, ISA, JER, LAM, EZK, DAN, HOS, JOL, AMO, OBA, JON, MIC, NAM, HAB, ZEP, HAG, ZEC, MAL, MAT, MRK, LUK, JHN, ACT, ROM, CO1,CO2, GAL, EPH, PHP, COL, TH1, TH2, TI1, TI2, TIT, PHM, HEB, JAS, PE1, PE2, JN1, JN2, JN3, JUD, REV]
const _documents = [];

function loadingDoc(){

  tabDocUsfm.forEach( book => {

    let bookObj = {
      selectors: {
        org: 'unfoldingWord',
        lang: 'en',
        abbr: 'ult',
      },
      bookId: book,
      data: book,
    };
    
    _documents.push(bookObj)

    
  });

  return _documents
}

loadingDoc()

export {_documents} ; 