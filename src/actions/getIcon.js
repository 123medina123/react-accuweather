import img1 from '../images/01-s.png';
import img2 from '../images/02-s.png';
import img3 from '../images/03-s.png';
import img4 from '../images/04-s.png';
import img5 from '../images/05-s.png';
import img6 from '../images/06-s.png';
import img7 from '../images/07-s.png';
import img8 from '../images/08-s.png';
import img11 from '../images/11-s.png';
import img12 from '../images/12-s.png';
import img13 from '../images/13-s.png';
import img14 from '../images/14-s.png';
import img15 from '../images/15-s.png';
import img16 from '../images/16-s.png';
import img17 from '../images/17-s.png';
import img18 from '../images/18-s.png';
import img19 from '../images/19-s.png';
import img20 from '../images/20-s.png';
import img21 from '../images/21-s.png';
import img22 from '../images/22-s.png';
import img23 from '../images/23-s.png';
import img24 from '../images/24-s.png';
import img25 from '../images/25-s.png';
import img26 from '../images/26-s.png';
import img29 from '../images/29-s.png';
import img30 from '../images/30-s.png';
import img31 from '../images/31-s.png';
import img32 from '../images/32-s.png';
import img33 from '../images/33-s.png';
import img34 from '../images/33-s.png';
import img35 from '../images/35-s.png';
import img36 from '../images/36-s.png';
import img37 from '../images/37-s.png';
import img38 from '../images/38-s.png';
import img39 from '../images/39-s.png';
import img40 from '../images/40-s.png';
import img41 from '../images/41-s.png';
import img42 from '../images/42-s.png';
import img43 from '../images/43-s.png';
import img44 from '../images/44-s.png';

export const iconsMap = [{
  id: 1,
  icon: img1
}, {
  id: 2,
  icon: img2
}, {
  id: 3,
  icon: img3
}, {
  id: 4,
  icon: img4
}, {
  id: 5,
  icon: img5
}, {
  id: 6,
  icon: img6
}, {
  id: 7,
  icon: img7
}, {
  id: 8,
  icon: img8
}, {
  id: 11,
  icon: img11
}, {
  id: 12,
  icon: img12
}, {
  id: 13,
  icon: img13
}, {
  id: 14,
  icon: img14
}, {
  id: 15,
  icon: img15
}, {
  id: 16,
  icon: img16
}, {
  id: 17,
  icon: img17
}, {
  id: 18,
  icon: img18
}, {
  id: 19,
  icon: img19
}, {
  id: 20,
  icon: img20
}, {
  id: 21,
  icon: img21
}, {
  id: 22,
  icon: img22
}, {
  id: 23,
  icon: img23
}, {
  id: 24,
  icon: img24
}, {
  id: 25,
  icon: img25
}, {
  id: 26,
  icon: img26
}, {
  id: 29,
  icon: img29
}, {
  id: 30,
  icon: img30
}
, {
  id: 31,
  icon: img31
}, {
  id: 32,
  icon: img32
}, {
  id: 33,
  icon: img33
},
{
  id: 34,
  icon: img34
},
{
  id: 35,
  icon: img35
}, {
  id: 36,
  icon: img36
}, {
  id: 37,
  icon: img37
}, {
  id: 38,
  icon: img38
}, {
  id: 39,
  icon: img39
}, {
  id: 40,
  icon: img40
}, {
  id: 41,
  icon: img41
}, {
  id: 42,
  icon: img42
}, {
  id: 43,
  icon: img43
}, {
  id: 44,
  icon: img44
}
];

export default (
  iconId: string,
): string => {
 const icon = iconsMap.find(icon => icon.id === iconId);
 return icon.icon;
}
