/* 4x1 bit memory device based on RS flip-flops */
var sram_canvas = document.getElementById('sram').getContext('2d');
var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
var colorZ = '#f515bb';
sram_canvas.font = '11pt PT Sans';
sram_canvas.textBaseline = 'middle';
var Z = {Z: '', z: ''};



function sram4bit(/* arrays */ node, el, wire, inputs) {
    node = node.concat(new X(sram_canvas, 15, 220), new X(sram_canvas, 35, 220, 1), new X(sram_canvas, 35, 250, 1), new X(sram_canvas, 50, 250)); // 0-3
    node = node.concat(new X(sram_canvas, 110, 250), new X(sram_canvas, 120, 250, 1), new X(sram_canvas, 140, 220, 1), new X(sram_canvas, 120, 160, 1)); // 4-7
    node = node.concat(new X(sram_canvas, 160, 160), new X(sram_canvas, 130, 190, 1), new X(sram_canvas, 160, 190), new X(sram_canvas, 15, 310)); // 8-11
    node = node.concat(new X(sram_canvas, 35, 310, 1), new X(sram_canvas, 35, 340, 1), new X(sram_canvas, 50, 340), new X(sram_canvas, 110, 340)); // 12-15
    node = node.concat(new X(sram_canvas, 130, 340, 1), new X(sram_canvas, 220, 175), new X(sram_canvas, 160, 220), new X(sram_canvas, 160, 250)); // 16-19
    node = node.concat(new X(sram_canvas, 130, 250, 1), new X(sram_canvas, 220, 235), new X(sram_canvas, 120, 280, 1), new X(sram_canvas, 160, 280)); // 20-23
    node = node.concat(new X(sram_canvas, 150, 310, 1), new X(sram_canvas, 160, 310), new X(sram_canvas, 220, 295), new X(sram_canvas, 140, 370, 1)); // 24-27
    node = node.concat(new X(sram_canvas, 160, 370), new X(sram_canvas, 150, 340, 1), new X(sram_canvas, 160, 340), new X(sram_canvas, 220, 355)); // 28-31
    node = node.concat(new X(sram_canvas, 15, 400), new X(sram_canvas, 270, 400, 1), new X(sram_canvas, 230, 175, 1), new X(sram_canvas, 230, 160, 1)); // 32-35
    node = node.concat(new X(sram_canvas, 280, 160), new X(sram_canvas, 240, 235, 1), new X(sram_canvas, 240, 220, 1), new X(sram_canvas, 280, 220)); // 36-39
    node = node.concat(new X(sram_canvas, 250, 295, 1), new X(sram_canvas, 250, 280, 1), new X(sram_canvas, 280, 280), new X(sram_canvas, 260, 355, 1)); // 40-43
    node = node.concat(new X(sram_canvas, 260, 340, 1), new X(sram_canvas, 280, 340), new X(sram_canvas, 270, 370, 1), new X(sram_canvas, 280, 370)); // 44-47
    node = node.concat(new X(sram_canvas, 270, 310, 1), new X(sram_canvas, 280, 310), new X(sram_canvas, 270, 250, 1), new X(sram_canvas, 280, 250)); // 48-51
    node = node.concat(new X(sram_canvas, 270, 190, 1), new X(sram_canvas, 280, 190), new X(sram_canvas, 340, 175), new X(sram_canvas, 340, 235)); // 52-55
    node = node.concat(new X(sram_canvas, 340, 295), new X(sram_canvas, 340, 355), new X(sram_canvas, 350, 175, 1), new X(sram_canvas, 360, 235, 1)); // 56-59
    node = node.concat(new X(sram_canvas, 370, 295, 1), new X(sram_canvas, 380, 355, 1), new X(sram_canvas, 230, 45, 1), new X(sram_canvas, 240, 55, 1)); // 60-63
    node = node.concat(new X(sram_canvas, 250, 65, 1), new X(sram_canvas, 260, 75, 1), new X(sram_canvas, 350, 85, 1), new X(sram_canvas, 360, 95, 1)); // 64-67
    node = node.concat(new X(sram_canvas, 370, 105, 1), new X(sram_canvas, 380, 115, 1), new X(sram_canvas, 15, 450), new X(sram_canvas, 15, 505)); // 68-71
    node = node.concat(new X(sram_canvas, 45, 505), new X(sram_canvas, 105, 505), new X(sram_canvas, 120, 505, 1), new X(sram_canvas, 135, 450)); // 72-75
    node = node.concat(new X(sram_canvas, 120, 480, 1), new X(sram_canvas, 135, 480), new X(sram_canvas, 195, 465), new X(sram_canvas, 390, 465, 1)); // 76-79
    node = node.concat(new X(sram_canvas, 390, 370, 1), new X(sram_canvas, 390, 310, 1), new X(sram_canvas, 390, 250, 1), new X(sram_canvas, 390, 190, 1)); // 80-83
    node = node.concat(new X(sram_canvas, 390, 45, 1), new X(sram_canvas, 390, 160, 1), new X(sram_canvas, 430, 160), new X(sram_canvas, 430, 190)); // 84-87
    node = node.concat(new X(sram_canvas, 400, 55, 1), new X(sram_canvas, 400, 220, 1), new X(sram_canvas, 430, 220), new X(sram_canvas, 430, 250)); // 88-91
    node = node.concat(new X(sram_canvas, 410, 65, 1), new X(sram_canvas, 410, 280, 1), new X(sram_canvas, 430, 280), new X(sram_canvas, 430, 310)); // 92-95
    node = node.concat(new X(sram_canvas, 420, 75, 1), new X(sram_canvas, 420, 340, 1), new X(sram_canvas, 430, 340), new X(sram_canvas, 430, 370)); // 96-99
    node = node.concat(new X(sram_canvas, 490, 175), new X(sram_canvas, 490, 235), new X(sram_canvas, 490, 295), new X(sram_canvas, 490, 355)); // 100-03
    node = node.concat(new X(sram_canvas, 500, 85, 1), new X(sram_canvas, 500, 145, 1), new X(sram_canvas, 500, 205, 1), new X(sram_canvas, 515, 205)); // 04-07
    node = node.concat(new X(sram_canvas, 575, 205), new X(sram_canvas, 590, 205), new X(sram_canvas, 590, 145), new X(sram_canvas, 590, 175)); // 08-11
    node = node.concat(new X(sram_canvas, 650, 175), new X(sram_canvas, 660, 175, 1), new X(sram_canvas, 660, 400, 1), new X(sram_canvas, 450, 400)); // 12-15
    node = node.concat(new X(sram_canvas, 670, 45, 1), new X(sram_canvas, 670, 370, 1), new X(sram_canvas, 680, 400), new X(sram_canvas, 680, 370)); // 16-19
    node = node.concat(new X(sram_canvas, 740, 385), new X(sram_canvas, 750, 385, 1), new X(sram_canvas, 750, 580, 1), new X(sram_canvas, 690, 95, 1)); // 20-23
    node = node.concat(new X(sram_canvas, 690, 145, 1), new X(sram_canvas, 690, 205, 1), new X(sram_canvas, 705, 205), new X(sram_canvas, 765, 205)); // 24-27
    node = node.concat(new X(sram_canvas, 780, 205), new X(sram_canvas, 780, 145), new X(sram_canvas, 680, 235, 1), new X(sram_canvas, 680, 175, 1)); // 28-31
    node = node.concat(new X(sram_canvas, 780, 175), new X(sram_canvas, 840, 175), new X(sram_canvas, 850, 175, 1), new X(sram_canvas, 850, 430, 1)); // 32-35
    node = node.concat(new X(sram_canvas, 450, 430), new X(sram_canvas, 860, 55, 1), new X(sram_canvas, 860, 400, 1), new X(sram_canvas, 870, 400)); // 36-39
    node = node.concat(new X(sram_canvas, 870, 430), new X(sram_canvas, 930, 415), new X(sram_canvas, 940, 415, 1), new X(sram_canvas, 940, 550, 1)); // 40-43
    node = node.concat(new X(sram_canvas, 955, 550), new X(sram_canvas, 955, 580), new X(sram_canvas, 1015, 565), new X(sram_canvas, 1410, 565)); // 44-147
    node = node.concat(new X(sram_canvas, 880, 105, 1), new X(sram_canvas, 880, 145, 1), new X(sram_canvas, 880, 205, 1), new X(sram_canvas, 895, 205)); // 148-151
    node = node.concat(new X(sram_canvas, 955, 205), new X(sram_canvas, 970, 205), new X(sram_canvas, 970, 145), new X(sram_canvas, 870, 295, 1)); // 152-155
    node = node.concat(new X(sram_canvas, 870, 175, 1), new X(sram_canvas, 970, 175), new X(sram_canvas, 1030, 175), new X(sram_canvas, 1040, 175, 1)); // 156-59
    node = node.concat(new X(sram_canvas, 1040, 460, 1), new X(sram_canvas, 450, 460), new X(sram_canvas, 1050, 65, 1), new X(sram_canvas, 1050, 430, 1)); // 60-63
    node = node.concat(new X(sram_canvas, 1060, 430), new X(sram_canvas, 1060, 460), new X(sram_canvas, 1120, 445), new X(sram_canvas, 1130, 445, 1)); // 64-67
    node = node.concat(new X(sram_canvas, 1070, 115, 1), new X(sram_canvas, 1070, 145, 1), new X(sram_canvas, 1070, 205, 1), new X(sram_canvas, 1085, 205)); // 68-71
    node = node.concat(new X(sram_canvas, 1145, 205), new X(sram_canvas, 1160, 205), new X(sram_canvas, 1160, 145), new X(sram_canvas, 1060, 355, 1)); // 72-75
    node = node.concat(new X(sram_canvas, 1060, 175, 1), new X(sram_canvas, 1160, 175), new X(sram_canvas, 1220, 175), new X(sram_canvas, 1230, 175, 1)); // 76-79
    node = node.concat(new X(sram_canvas, 1230, 490, 1), new X(sram_canvas, 450, 490), new X(sram_canvas, 1240, 75, 1), new X(sram_canvas, 1240, 460, 1)); // 80-83
    node = node.concat(new X(sram_canvas, 1250, 460), new X(sram_canvas, 1250, 490), new X(sram_canvas, 1310, 475), new X(sram_canvas, 1320, 475, 1)); // 84-87
    node = node.concat(new X(sram_canvas, 1130, 550, 1), new X(sram_canvas, 1320, 520, 1), new X(sram_canvas, 1335, 520), new X(sram_canvas, 1335, 550)); // 88-91
    node = node.concat(new X(sram_canvas, 1395, 535), new X(sram_canvas, 1410, 535), new X(sram_canvas, 1470, 550), new X(sram_canvas, 1505, 505)); // 92-195
    node = node.concat(new X(sram_canvas, 1480, 550, 1), new X(sram_canvas, 1480, 475, 1), new X(sram_canvas, 1490, 475), new X(sram_canvas, 1520, 475)); // 196-199
    node = node.concat(new X(sram_canvas, 1535, 475, 1), new X(sram_canvas, 1535, 600, 1), new X(sram_canvas, 450, 600, 1), new X(sram_canvas, 450, 530)); // 200-203

    el.push(new TEXT(sram_canvas, 400, 20, 'Память 4x1'));
    
    el.push(new INPUT(sram_canvas, node[0], inputs[0])); // A0
    el.push(new TEXT(sram_canvas, 2, 200, 'A0'));
    wire.push(new WIRE(sram_canvas, node[0], node[1]));
    wire.push(new WIRE(sram_canvas, node[1], node[2]));
    wire.push(new WIRE(sram_canvas, node[2], node[3]));
    el.push(new NOT(sram_canvas, node[3], node[4]));
    wire.push(new WIRE(sram_canvas, node[4], node[5]));
    wire.push(new WIRE(sram_canvas, node[5], node[7]));
    wire.push(new WIRE(sram_canvas, node[7], node[8]));
    
    el.push(new INPUT(sram_canvas, node[11], inputs[1])); // A1
    el.push(new TEXT(sram_canvas, 2, 290, 'A1'));
    wire.push(new WIRE(sram_canvas, node[11], node[12]));
    wire.push(new WIRE(sram_canvas, node[12], node[13]));
    wire.push(new WIRE(sram_canvas, node[13], node[14]));
    el.push(new NOT(sram_canvas, node[14], node[15]));
    wire.push(new WIRE(sram_canvas, node[15], node[16]));
    wire.push(new WIRE(sram_canvas, node[16], node[20]));
    wire.push(new WIRE(sram_canvas, node[20], node[9]));
    wire.push(new WIRE(sram_canvas, node[9], node[10]));
    wire.push(new WIRE(sram_canvas, node[20], node[19]));
    wire.push(new WIRE(sram_canvas, node[1], node[6]));
    wire.push(new WIRE(sram_canvas, node[6], node[18]));
    wire.push(new WIRE(sram_canvas, node[5], node[22]));
    wire.push(new WIRE(sram_canvas, node[22], node[23]));
    wire.push(new WIRE(sram_canvas, node[12], node[24]));
    wire.push(new WIRE(sram_canvas, node[24], node[25]));
    wire.push(new WIRE(sram_canvas, node[6], node[27]));
    wire.push(new WIRE(sram_canvas, node[27], node[28]));
    wire.push(new WIRE(sram_canvas, node[24], node[29]));
    wire.push(new WIRE(sram_canvas, node[29], node[30]));
    
    el.push(new AND(sram_canvas, node[8], node[10], node[17]));
    el.push(new AND(sram_canvas, node[18], node[19], node[21]));
    el.push(new AND(sram_canvas, node[23], node[25], node[26]));
    el.push(new AND(sram_canvas, node[30], node[28], node[31]));
    
    el.push(new INPUT(sram_canvas, node[32], inputs[2])); // data_IN
    el.push(new TEXT(sram_canvas, 2, 380, 'data IN'));
    
    wire.push(new WIRE(sram_canvas, node[32], node[33]));
    wire.push(new WIRE(sram_canvas, node[33], node[46]));
    wire.push(new WIRE(sram_canvas, node[46], node[47]));
    wire.push(new WIRE(sram_canvas, node[46], node[48]));
    wire.push(new WIRE(sram_canvas, node[48], node[49]));
    wire.push(new WIRE(sram_canvas, node[48], node[50]));
    wire.push(new WIRE(sram_canvas, node[50], node[51]));
    wire.push(new WIRE(sram_canvas, node[50], node[52]));
    wire.push(new WIRE(sram_canvas, node[52], node[53]));
    
    wire.push(new WIRE(sram_canvas, node[17], node[34]));
    wire.push(new WIRE(sram_canvas, node[34], node[35]));
    wire.push(new WIRE(sram_canvas, node[35], node[36]));
    wire.push(new WIRE(sram_canvas, node[21], node[37]));
    wire.push(new WIRE(sram_canvas, node[37], node[38]));
    wire.push(new WIRE(sram_canvas, node[38], node[39]));
    wire.push(new WIRE(sram_canvas, node[26], node[40]));
    wire.push(new WIRE(sram_canvas, node[40], node[41]));
    wire.push(new WIRE(sram_canvas, node[41], node[42]));
    wire.push(new WIRE(sram_canvas, node[31], node[43]));
    wire.push(new WIRE(sram_canvas, node[43], node[44]));
    wire.push(new WIRE(sram_canvas, node[44], node[45]));
    
    el.push(new AND(sram_canvas, node[36], node[53], node[54]));
    el.push(new AND(sram_canvas, node[39], node[51], node[55]));
    el.push(new AND(sram_canvas, node[42], node[49], node[56]));
    el.push(new AND(sram_canvas, node[45], node[47], node[57]));
    
    wire.push(new WIRE(sram_canvas, node[54], node[58]));
    wire.push(new WIRE(sram_canvas, node[55], node[59]));
    wire.push(new WIRE(sram_canvas, node[56], node[60]));
    wire.push(new WIRE(sram_canvas, node[57], node[61]));
    
    wire.push(new WIRE(sram_canvas, node[35], node[62]));
    wire.push(new WIRE(sram_canvas, node[38], node[63]));
    wire.push(new WIRE(sram_canvas, node[41], node[64]));
    wire.push(new WIRE(sram_canvas, node[44], node[65]));
    
    wire.push(new WIRE(sram_canvas, node[58], node[66]));
    wire.push(new WIRE(sram_canvas, node[59], node[67]));
    wire.push(new WIRE(sram_canvas, node[60], node[68]));
    wire.push(new WIRE(sram_canvas, node[61], node[69]));
    
    el.push(new INPUT(sram_canvas, node[70], inputs[3])); // C
    el.push(new TEXT(sram_canvas, 2, 430, 'C'));
    el.push(new INPUT(sram_canvas, node[71], inputs[4])); // R/nW
    el.push(new TEXT(sram_canvas, 2, 480, 'R/nW'));
    wire.push(new WIRE(sram_canvas, node[74], node[195]));
    
    wire.push(new WIRE(sram_canvas, node[71], node[72]));
    el.push(new NOT(sram_canvas, node[72], node[73]));
    wire.push(new WIRE(sram_canvas, node[73], node[74]));
    wire.push(new WIRE(sram_canvas, node[70], node[75]))    
    wire.push(new WIRE(sram_canvas, node[74], node[76]));
    wire.push(new WIRE(sram_canvas, node[76], node[77]));
    
    el.push(new AND(sram_canvas, node[75], node[77], node[78]));
    wire.push(new WIRE(sram_canvas, node[78], node[79]));
    wire.push(new WIRE(sram_canvas, node[79], node[80]));
    wire.push(new WIRE(sram_canvas, node[80], node[81]));
    wire.push(new WIRE(sram_canvas, node[81], node[82]));
    wire.push(new WIRE(sram_canvas, node[82], node[83]));
    
    wire.push(new WIRE(sram_canvas, node[62], node[84]));
    wire.push(new WIRE(sram_canvas, node[84], node[85]));
    wire.push(new WIRE(sram_canvas, node[85], node[86]));
    wire.push(new WIRE(sram_canvas, node[83], node[87]));

    wire.push(new WIRE(sram_canvas, node[63], node[88]));
    wire.push(new WIRE(sram_canvas, node[88], node[89]));
    wire.push(new WIRE(sram_canvas, node[89], node[90]));
    wire.push(new WIRE(sram_canvas, node[82], node[91]));

    wire.push(new WIRE(sram_canvas, node[64], node[92]));
    wire.push(new WIRE(sram_canvas, node[92], node[93]));
    wire.push(new WIRE(sram_canvas, node[93], node[94]));
    wire.push(new WIRE(sram_canvas, node[81], node[95]));

    wire.push(new WIRE(sram_canvas, node[65], node[96]));
    wire.push(new WIRE(sram_canvas, node[96], node[97]));
    wire.push(new WIRE(sram_canvas, node[97], node[98]));
    wire.push(new WIRE(sram_canvas, node[80], node[99]));

    el.push(new AND(sram_canvas, node[86], node[87], node[100]));
    el.push(new AND(sram_canvas, node[90], node[91], node[101]));
    el.push(new AND(sram_canvas, node[94], node[95], node[102]));
    el.push(new AND(sram_canvas, node[98], node[99], node[103]));
    
    wire.push(new WIRE(sram_canvas, node[66], node[104]));
    wire.push(new WIRE(sram_canvas, node[104], node[105]));
    wire.push(new WIRE(sram_canvas, node[105], node[106]));
    wire.push(new WIRE(sram_canvas, node[106], node[107]));
    el.push(new NOT(sram_canvas, node[107], node[108]));
    wire.push(new WIRE(sram_canvas, node[108], node[109])); 
    wire.push(new WIRE(sram_canvas, node[105], node[110])); 
    wire.push(new WIRE(sram_canvas, node[100], node[111])); 
    el.push(new RS(sram_canvas, node[110], node[109], node[111], node[112], inputs[5])); // ячейка памяти 00
    wire.push(new WIRE(sram_canvas, node[112], node[113]));
    wire.push(new WIRE(sram_canvas, node[113], node[114]));
    wire.push(new WIRE(sram_canvas, node[114], node[115]));
    el.push(new OUTPUT(sram_canvas, node[115])); // Q00
    el.push(new TEXT(sram_canvas, 405, 400, 'Q00'));
    wire.push(new WIRE(sram_canvas, node[84], node[116]));
    wire.push(new WIRE(sram_canvas, node[116], node[117]));
    wire.push(new WIRE(sram_canvas, node[117], node[119]));
    wire.push(new WIRE(sram_canvas, node[114], node[118]));
    el.push(new AND(sram_canvas, node[119], node[118], node[120]));
    wire.push(new WIRE(sram_canvas, node[120], node[121]));
    wire.push(new WIRE(sram_canvas, node[121], node[122]));
    
    wire.push(new WIRE(sram_canvas, node[67], node[123]));
    wire.push(new WIRE(sram_canvas, node[123], node[124]));
    wire.push(new WIRE(sram_canvas, node[124], node[125]));
    wire.push(new WIRE(sram_canvas, node[125], node[126]));
    el.push(new NOT(sram_canvas, node[126], node[127]));
    wire.push(new WIRE(sram_canvas, node[127], node[128]));
    wire.push(new WIRE(sram_canvas, node[124], node[129]));
    wire.push(new WIRE(sram_canvas, node[101], node[130]));
    wire.push(new WIRE(sram_canvas, node[130], node[131]));
    wire.push(new WIRE(sram_canvas, node[131], node[132]));
    el.push(new RS(sram_canvas, node[129], node[128], node[132], node[133], inputs[6])); // ячейка памяти 01
    wire.push(new WIRE(sram_canvas, node[133], node[134]));
    wire.push(new WIRE(sram_canvas, node[134], node[135]));
    wire.push(new WIRE(sram_canvas, node[135], node[136]));
    el.push(new OUTPUT(sram_canvas, node[136])); // Q01
    el.push(new TEXT(sram_canvas, 405, 430, 'Q01'));
    wire.push(new WIRE(sram_canvas, node[88], node[137]));
    wire.push(new WIRE(sram_canvas, node[137], node[138]));
    wire.push(new WIRE(sram_canvas, node[138], node[139]));
    wire.push(new WIRE(sram_canvas, node[135], node[140]));
    el.push(new AND(sram_canvas, node[139], node[140], node[141]));
    wire.push(new WIRE(sram_canvas, node[141], node[142]));
    
    wire.push(new WIRE(sram_canvas, node[142], node[143]));
    wire.push(new WIRE(sram_canvas, node[143], node[144]));
    wire.push(new WIRE(sram_canvas, node[122], node[145]));
    wire.push(new OR(sram_canvas, node[144], node[145], node[146]));
    wire.push(new WIRE(sram_canvas, node[146], node[147]));
    
    wire.push(new WIRE(sram_canvas, node[68], node[148]));
    wire.push(new WIRE(sram_canvas, node[148], node[149]));
    wire.push(new WIRE(sram_canvas, node[149], node[150]));
    wire.push(new WIRE(sram_canvas, node[150], node[151]));
    el.push(new NOT(sram_canvas, node[151], node[152]));
    wire.push(new WIRE(sram_canvas, node[152], node[153])); 
    wire.push(new WIRE(sram_canvas, node[149], node[154])); 
    wire.push(new WIRE(sram_canvas, node[102], node[155])); 
    wire.push(new WIRE(sram_canvas, node[155], node[156])); 
    wire.push(new WIRE(sram_canvas, node[156], node[157])); 
    el.push(new RS(sram_canvas, node[154], node[153], node[157], node[158], inputs[7])); // ячейка памяти 10
    wire.push(new WIRE(sram_canvas, node[158], node[159]));
    wire.push(new WIRE(sram_canvas, node[159], node[160]));
    wire.push(new WIRE(sram_canvas, node[160], node[161]));
    el.push(new OUTPUT(sram_canvas, node[161])); // Q10
    el.push(new TEXT(sram_canvas, 405, 460, 'Q10'));
    wire.push(new WIRE(sram_canvas, node[92], node[162]));
    wire.push(new WIRE(sram_canvas, node[162], node[163]));
    wire.push(new WIRE(sram_canvas, node[163], node[164]));
    wire.push(new WIRE(sram_canvas, node[160], node[165]));
    el.push(new AND(sram_canvas, node[164], node[165], node[166]));
    wire.push(new WIRE(sram_canvas, node[166], node[167]));
    
    wire.push(new WIRE(sram_canvas, node[69], node[168]));
    wire.push(new WIRE(sram_canvas, node[168], node[169]));
    wire.push(new WIRE(sram_canvas, node[169], node[170]));
    wire.push(new WIRE(sram_canvas, node[170], node[171]));
    el.push(new NOT(sram_canvas, node[171], node[172]));
    wire.push(new WIRE(sram_canvas, node[172], node[173]));
    wire.push(new WIRE(sram_canvas, node[169], node[174]));
    wire.push(new WIRE(sram_canvas, node[103], node[175]));
    wire.push(new WIRE(sram_canvas, node[175], node[176]));
    wire.push(new WIRE(sram_canvas, node[176], node[177]));
    el.push(new RS(sram_canvas, node[174], node[173], node[177], node[178], inputs[8])); // ячейка памяти 11
    wire.push(new WIRE(sram_canvas, node[178], node[179]));
    wire.push(new WIRE(sram_canvas, node[179], node[180]));
    wire.push(new WIRE(sram_canvas, node[180], node[181]));
    el.push(new OUTPUT(sram_canvas, node[181])); // Q11
    el.push(new TEXT(sram_canvas, 405, 490, 'Q11'));
    wire.push(new WIRE(sram_canvas, node[96], node[182]));
    wire.push(new WIRE(sram_canvas, node[182], node[183]));
    wire.push(new WIRE(sram_canvas, node[183], node[184]));
    wire.push(new WIRE(sram_canvas, node[180], node[185]));
    el.push(new AND(sram_canvas, node[184], node[185], node[186]));
    wire.push(new WIRE(sram_canvas, node[186], node[187]));
    
    wire.push(new WIRE(sram_canvas, node[167], node[188]));
    wire.push(new WIRE(sram_canvas, node[188], node[191]));
    wire.push(new WIRE(sram_canvas, node[187], node[189]));
    wire.push(new WIRE(sram_canvas, node[189], node[190]));
    el.push(new OR(sram_canvas, node[190], node[191], node[192]));
    wire.push(new WIRE(sram_canvas, node[192], node[193]));
    el.push(new OR(sram_canvas, node[193], node[147], node[194]));
    wire.push(new WIRE(sram_canvas, node[194], node[196]));
    wire.push(new WIRE(sram_canvas, node[196], node[197]));
    wire.push(new WIRE(sram_canvas, node[197], node[198]));
    el.push(new BTRI(sram_canvas, node[198], node[195], node[199]));
    wire.push(new WIRE(sram_canvas, node[199], node[200]));
    wire.push(new WIRE(sram_canvas, node[200], node[201]));
    wire.push(new WIRE(sram_canvas, node[201], node[202]));
    wire.push(new WIRE(sram_canvas, node[202], node[203]));
    el.push(new OUTPUT(sram_canvas, node[203]));
    el.push(new TEXT(sram_canvas, 373, 530, 'data OUT'));
    
    out = [node[112].state, node[133].state, node[158].state, node[178].state];
    return out;
}

var rnw = 0;
var ramIN = [false, false, false, false, false, false, false];

function reload_sram() {
    var wire = []; var el = []; var node = [];

    var datagot = [];
    datagot = sram4bit(node, el, wire, ramIN);
    ramIN[3] = !ramIN[3]; // C
    if (!ramIN[3]) {
        ramIN[2] = Math.random() * 10 < 5; // data_IN
        ramIN[0] = !ramIN[0]; // A0
        if (!ramIN[0]) ramIN[1] = !ramIN[1]; // A1
        rnw++;
    }
    if (rnw == 16) {
        ramIN[4] = !ramIN[4]; // R/nW
        rnw = 0;
    }
    for (i = 0; i < 4; i++) ramIN[i + 5] = datagot[i];
    
    clear(sram_canvas);
    for (i in wire) { wire[i].draw() }
    for (i in node) { node[i].draw() }
    for (i in el) { el[i].draw() }

    setTimeout("reload_sram()", 1000);
}

reload_sram();
