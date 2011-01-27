var futura = {
      src: '../../images/futura_light.swf'
      ,ratios: [7, 1.32, 11, 1.31, 13, 1.24, 14, 1.25, 19, 1.23, 27, 1.2, 34, 1.19, 42, 1.18, 47, 1.17, 48, 1.18, 69, 1.17, 74, 1.16, 75, 1.17, 1.16]
    };

var futura_bt = {
      src: '../../images/futura_bt.swf'
      ,ratios: [7, 1.32, 11, 1.31, 13, 1.24, 14, 1.25, 19, 1.23, 27, 1.2, 34, 1.19, 42, 1.18, 47, 1.17, 48, 1.18, 69, 1.17, 74, 1.16, 75, 1.17, 1.16]
    };

    var rockwell = {
      src: '../../images/rockwell.swf'
      ,ratios: [6, 1.41, 9, 1.35, 15, 1.29, 21, 1.25, 22, 1.22, 27, 1.24, 29, 1.21, 34, 1.22, 41, 1.21, 45, 1.2, 46, 1.21, 59, 1.2, 68, 1.19, 69, 1.2, 96, 1.19, 97, 1.18, 102, 1.19, 103, 1.18, 107, 1.19, 108, 1.18, 112, 1.19, 114, 1.18, 116, 1.19, 120, 1.18, 121, 1.19, 1.18]
    };

    // You probably want to switch this on, but read <http://wiki.novemberborn.net/sifr3/DetectingCSSLoad> first.
    // sIFR.useStyleCheck = true;
    sIFR.activate(futura,futura_bt, rockwell);

    sIFR.replace(rockwell, {
      selector: 'div.bakersville_text'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'13px' }
        ,transparent :true
        ,wmode:'transparent'
      }
    });

    sIFR.replace(rockwell, {
      selector: 'div.grey_alert'
      ,css: {
        '.sIFR-root': { 'color': '#454545','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });

    sIFR.replace(rockwell, {
      selector: 'div.blue_alert'
      ,css: {
        '.sIFR-root': { 'color': '#274a7e','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });


     sIFR.replace(rockwell, {
      selector: 'div.grey_text'
      ,css: {
        '.sIFR-root': { 'color': '#000000','background-color': '#DCDCDC' ,'font-size':'13px','text-align':'right','cursor':'pointer'}

      }
    });
    sIFR.replace(rockwell, {
      selector: 'div.rockwell_tx'
      ,css: {
        '.sIFR-root': { 'color': '#000000','background-color': '#DCDCDC' ,'font-size':'9px'}

      }
    });





   sIFR.replace(rockwell, {
      selector: 'span.dark_grey_text'
      ,css: {
        '.sIFR-root': { 'color': '#000000','background-color': '#DCDCDC' ,'font-size':'13px','font-weight':'bold' }

      }
    });





    sIFR.replace(rockwell, {
      selector: 'div.brown_alert'
      ,css: {
        '.sIFR-root': { 'color': '#a7551d','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });

    sIFR.replace(rockwell, {
      selector: 'div.q_text_default'
      ,css: {
        '.sIFR-root': { 'color': '#a7551d','background-color': '#DCDCDC' ,'font-size':'13px' }

      }
    });



     sIFR.replace(rockwell, {
      selector: 'div.baker'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'16px' }
        ,transparent :true
        ,wmode:'transparent'
      }
    });

     sIFR.replace(rockwell, {
      selector: 'div.g_black_bt'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'20px','font-weight':'bold','text-align': 'center' }
      }
    });

     sIFR.replace(futura_bt, {
      selector: 'div.futura_medium_heading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '16px' }
      }
    });

     sIFR.replace(futura, {
      selector: 'div.futura_subheading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '18px' }
      }
    });

    sIFR.replace(futura, {
      selector: 'div.red_head'
      ,css: {
        '.sIFR-root': {'color': '#a52a2a', 'background-color': '#DCDCDC' ,'font-size': '29px','line-height': '90px' }
      }
    });

    sIFR.replace(futura_bt, {
      selector: 'div.red_head_bt'
      ,css: {
        '.sIFR-root': {'color': '#a52a2a', 'background-color': '#DCDCDC' ,'font-size': '32px','line-height': '50px' }
      }
    });

    sIFR.replace(futura_bt, {
      selector: 'div.futura_heading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '21px' }
      }
    });

     sIFR.replace(futura_bt, {
      selector: 'div.heading'
      ,css: {
        '.sIFR-root': {'color': '#1c3f75', 'background-color': '#DCDCDC' ,'font-size': '21px' }
      }
    });

     sIFR.replace(futura_bt, {
      selector: 'div.blue_heading'
      ,css: {
        '.sIFR-root': {'color': '#4c6b99', 'background-color': '#DCDCDC' ,'font-size': '18px' }
      }
    });


      sIFR.replace(futura_bt, {
      selector: 'div.job'
      ,css: {
        '.sIFR-root': {'color': '#4c6b99', 'background-color': '#DCDCDC' ,'font-size': '15px','cursor':'pointer' }
      }
    });



     sIFR.replace(rockwell, {
      selector: 'h2'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'20px','font-weight':'bold','text-align': 'left' }
      }
    });

    sIFR.replace(rockwell, {
      selector: 'h3'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'16px','font-weight':'bold','text-align': 'left' }
      }
    });


      sIFR.replace(rockwell, {
      selector: 'h4'
      ,css: {
        '.sIFR-root': { 'background-color': '#DCDCDC' ,'font-size':'13px','font-weight':'bold','text-align': 'left' }
      }
    });



    

   