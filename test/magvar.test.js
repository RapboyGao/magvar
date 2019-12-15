// @flow
'use strict';

const MagVar = require('../src/magvar');

const testData = [
  /*
  # Field 1: Date
  # Field 2: Height above ellipsoid (km)
  # Field 3: geodetic latitude (deg)
  # Field 4: geodetic longitude (deg)
  # Field 5: declination (deg)
  # Field 6: inclination (deg)
  # Field 7: H (nT)
  # Field 8: X (nT)
  # Field 9: Y (nT)
  # Field 10: Z (nT)
  # Field 11: F (nT)
  # Field 12: dD/dt (deg/year)
  # Field 13: dI/dt (deg/year)
  # Field 14: dH/dt (nT/year)
  # Field 15: dX/dt (nT/year)
  # Field 16: dY/dt (nT/year)
  # Field 17: dZ/dt (nT/year)
  # Field 18: dF/dt (nT/year)
  */
  [2020.0,28,89,-121,-112.41,88.46,1510.0,-575.7,-1396.0,56082.3,56102.7,2.6,0.0,-18.0,69.5,-9.2,20.1,19.6],
  [2020.0,48,80,-96,-37.40,88.03,1910.8,1518.0,-1160.5,55671.9,55704.7,1.9,-0.0,41.6,72.5,26.3,-11.3,-9.8],
  [2020.0,54,82,87,51.30,87.48,2487.8,1555.6,1941.4,56520.5,56575.2,0.6,0.0,-46.4,-48.7,-20.4,39.7,37.7],
  [2020.0,65,43,93,0.71,63.87,24377.2,24375.3,303.2,49691.4,55348.7,-0.1,0.1,-34.1,-33.7,-32.4,101.1,75.7],
  [2020.0,51,-33,109,-5.78,-67.64,21666.6,21556.3,-2183.2,-52676.0,56957.9,0.0,0.0,33.3,34.4,9.2,-16.8,28.2],
  [2020.0,39,-59,-8,-15.79,-58.82,14933.4,14369.9,-4063.3,-24679.0,28845.4,0.0,0.0,-13.8,-12.3,7.3,60.0,-58.5],
  [2020.0,3,-50,-103,28.10,-55.01,22315.5,19684.4,10512.2,-31883.6,38917.2,-0.0,0.0,-45.1,-34.2,-31.8,85.1,-95.6],
  [2020.0,94,-29,-110,15.82,-38.38,24392.0,23467.8,6650.9,-19320.7,31116.9,-0.0,0.0,-44.7,-37.9,-30.4,42.5,-61.4],
  [2020.0,66,14,143,0.12,13.08,34916.9,34916.8,70.2,8114.9,35847.5,-0.1,-0.1,29.6,29.6,-41.4,-46.4,18.3],
  [2020.0,18,0,21,1.05,-26.46,29316.1,29311.2,536.0,-14589.0,32745.6,0.1,0.1,0.0,-0.9,51.2,54.5,-24.3],
  [2020.5,6,-36,-137,20.16,-52.21,25511.4,23948.6,8791.9,-32897.6,41630.3,0.0,0.0,-21.6,-21.6,-3.8,65.4,-64.9],
  [2020.5,63,26,81,0.43,40.84,34738.7,34737.7,259.2,30023.4,45914.9,0.0,0.1,5.9,5.9,2.4,128.2,88.3],
  [2020.5,69,38,-144,13.39,56.99,23279.9,22647.3,5390.0,35831.9,42730.3,-0.1,0.0,-46.5,-38.9,-37.1,-53.5,-70.1],
  [2020.5,50,-70,-133,57.40,-72.18,16597.2,8943.1,13981.7,-51628.5,54230.7,-0.0,0.0,13.3,13.3,7.2,103.1,-94.0],
  [2020.5,8,-52,-75,15.39,-49.50,20299.7,19571.7,5387.5,-23769.0,31257.7,-0.1,-0.0,-66.6,-55.8,-48.3,46.4,-78.6],
  [2020.5,8,-66,17,-32.56,-59.78,18089.7,15247.0,-9734.8,-31062.0,35945.6,-0.1,0.0,9.6,-12.5,-37.5,42.6,-32.0],
  [2020.5,22,-37,140,9.15,-68.61,21705.2,21429.0,3451.3,-55415.6,59514.7,0.0,-0.0,-9.6,-11.1,8.5,-12.6,8.2],
  [2020.5,40,-12,-129,10.83,-15.68,29295.6,28773.9,5503.9,-8221.8,30427.4,-0.0,0.1,-24.5,-20.0,-26.0,53.9,-38.2],
  [2020.5,44,33,-118,11.46,57.97,23890.9,23414.3,4748.3,38184.5,45042.6,-0.1,0.0,-51.1,-42.7,-46.2,-77.1,-92.4],
  [2020.5,50,-81,-67,28.65,-67.74,18332.1,16087.9,8788.9,-44780.8,48387.8,-0.1,0.0,-4.9,8.6,-25.9,81.0,-76.8],
  [2021.0,74,-57,3,-22.29,-59.07,14296.6,13228.0,-5423.3,-23859.2,27814.7,-0.0,0.1,1.6,-1.7,-8.2,59.2,-50.0],
  [2021.0,46,-24,-122,14.02,-34.29,26836.5,26037.0,6501.8,-18297.4,32480.6,-0.0,0.0,-32.2,-26.5,-26.8,46.8,-53.0],
  [2021.0,69,23,63,1.08,35.82,34456.5,34450.4,646.9,24869.2,42493.9,0.0,0.1,15.7,15.2,27.3,95.8,68.7],
  [2021.0,33,-3,-147,9.74,-2.35,31138.6,30690.1,5265.7,-1277.4,31164.8,0.0,0.1,-25.6,-25.6,-2.3,62.6,-28.1],
  [2021.0,47,-72,-22,-6.05,-61.27,18455.7,18352.8,-1946.6,-33665.0,38392.0,-0.0,0.0,-18.1,-19.5,-12.8,65.5,-66.1],
  [2021.0,62,-14,99,-1.71,-45.11,33227.7,33213.0,-990.3,-33354.0,47080.5,0.0,0.1,59.3,59.6,11.8,38.5,14.5],
  [2021.0,83,86,-46,-36.71,86.83,3004.8,2408.8,-1796.2,54184.7,54268.0,1.3,0.0,-15.6,26.9,62.1,21.4,20.5],
  [2021.0,82,-64,87,-80.81,-75.25,14087.8,2249.5,-13907.0,-53526.9,55349.8,-0.2,-0.0,-16.4,-48.1,8.9,-31.9,26.7],
  [2021.0,34,-19,43,-14.32,-52.47,19947.3,19327.6,-4933.5,-25969.5,32746.2,-0.1,0.1,70.3,59.8,-49.8,-15.5,55.1],
  [2021.0,56,-81,40,-59.03,-68.54,17872.0,9198.0,-15323.4,-45453.8,48841.2,-0.2,0.0,7.8,-37.3,-31.4,45.4,-39.4],
  [2021.5,14,0,80,-3.41,-17.32,39316.2,39246.6,-2338.9,-12258.0,41182.8,0.0,0.1,77.8,79.0,18.2,61.1,56.1],
  [2021.5,12,-82,-68,30.36,-68.18,18536.8,15995.1,9368.5,-46308.7,49880.9,-0.1,0.0,-2.2,12.7,-26.1,82.4,-77.3],
  [2021.5,44,-46,-42,-11.54,-53.82,14450.9,14159.0,-2889.8,-19762.2,24482.1,0.0,-0.1,-75.2,-73.4,16.4,-5.7,-39.8],
  [2021.5,43,17,52,1.23,23.87,35904.4,35896.1,773.7,15885.6,39261.7,0.0,0.1,23.4,23.0,17.8,74.5,51.5],
  [2021.5,64,10,78,-1.71,7.37,39311.5,39294.0,-1172.2,5088.1,39639.4,0.0,0.1,52.8,53.1,11.5,102.0,65.4],
  [2021.5,12,33,-145,12.36,52.51,24878.3,24301.2,5327.4,32429.3,40872.8,-0.0,0.0,-54.8,-48.9,-32.7,-38.8,-64.2],
  [2021.5,12,-79,115,-136.34,-77.43,12997.3,-9403.6,-8972.3,-58271.0,59702.9,-0.2,0.0,16.0,-49.4,28.7,29.1,-24.9],
  [2021.5,14,-33,-114,18.10,-44.23,24820.9,23592.3,7712.3,-24163.1,34640.0,-0.0,0.0,-43.5,-37.1,-26.7,54.1,-68.9],
  [2021.5,19,29,66,2.13,45.97,32640.6,32618.0,1215.2,33763.7,46961.7,0.0,0.1,3.9,2.9,27.5,105.1,78.3],
  [2021.5,86,-11,167,10.11,-31.45,33191.7,32676.0,5828.1,-20299.1,38906.8,0.1,-0.1,-18.5,-23.4,26.1,-43.0,6.7],
  [2022.0,37,-66,-5,-16.99,-59.27,17152.6,16404.3,-5011.2,-28849.5,33563.5,-0.0,0.0,-8.3,-11.9,-10.3,59.1,-55.1],
  [2022.0,67,72,-115,15.47,85.19,4703.2,4532.7,1254.7,55923.4,56120.8,-0.2,-0.1,68.0,70.4,0.4,-56.5,-50.7],
  [2022.0,44,22,174,6.56,31.91,28859.7,28671.0,3294.9,17967.2,33995.6,0.0,-0.0,12.7,11.8,9.1,-15.7,2.5],
  [2022.0,54,54,178,1.43,65.41,20631.2,20624.8,514.8,45076.8,49573.8,-0.2,0.0,-0.6,0.9,-59.8,9.2,8.1],
  [2022.0,57,-43,50,-47.43,-62.96,16769.3,11344.6,-12349.5,-32850.3,36883.0,-0.2,-0.0,21.7,-18.5,-46.4,-74.7,76.4],
  [2022.0,44,-43,-111,24.32,-52.71,22656.4,20646.1,9330.1,-29747.5,37392.8,-0.0,0.0,-42.5,-35.5,-24.5,72.8,-83.6],
  [2022.0,12,-63,178,57.08,-79.33,11577.2,6292.0,9718.1,-61429.1,62510.5,0.2,0.0,31.2,-12.8,45.4,58.2,-51.4],
  [2022.0,38,27,-169,8.76,42.60,26202.3,25896.5,3991.3,24097.4,35598.4,-0.0,0.0,-24.3,-23.5,-7.3,-4.6,-21.0],
  [2022.0,61,59,-77,-17.63,79.04,10595.8,10098.3,-3208.9,54735.3,55751.4,0.3,-0.1,56.5,67.9,27.2,-56.4,-44.6],
  [2022.0,67,-47,-32,-14.09,-57.63,13056.5,12663.7,-3178.2,-20600.9,24389.9,0.1,-0.1,-66.7,-60.3,34.0,13.5,-47.1],
  [2022.5,8,62,53,18.95,76.54,13043.3,12336.1,4236.6,54498.1,56037.2,0.1,0.0,-29.9,-37.9,18.3,80.0,70.8],
  [2022.5,77,-68,-7,-15.94,-60.00,17268.3,16604.7,-4741.2,-29908.6,34535.8,-0.0,0.0,-9.7,-13.4,-11.7,58.5,-55.5],
  [2022.5,98,-5,159,7.79,-23.04,33927.0,33613.6,4601.1,-14426.9,36867.1,0.0,-0.1,-12.4,-13.7,9.3,-63.6,13.5],
  [2022.5,34,-29,-107,15.68,-37.65,24657.0,23739.9,6662.3,-19023.5,31142.6,-0.0,0.0,-48.7,-41.4,-32.5,42.0,-64.2],
  [2022.5,60,27,65,1.78,42.84,32954.8,32938.8,1025.8,30561.3,44944.6,0.0,0.1,7.7,6.9,27.2,101.1,74.4],
  [2022.5,73,-72,95,-101.49,-76.44,13362.8,-2661.0,-13095.2,-55423.4,57011.5,-0.2,-0.0,-1.6,-54.1,12.6,-1.5,1.1],
  [2022.5,96,-46,-85,18.38,-47.38,20165.1,19136.4,6358.2,-21915.4,29781.1,-0.1,-0.0,-60.2,-47.6,-47.5,49.9,-77.5],
  [2022.5,0,-13,-59,-16.65,-13.41,22751.7,21797.3,-6520.6,-5425.9,23389.8,-0.2,-0.4,-66.3,-84.4,-50.8,-156.1,-28.3],
  [2022.5,16,66,-178,1.92,75.67,13812.2,13804.5,463.2,54055.4,55792.1,-0.3,-0.0,0.3,3.0,-80.1,-3.5,-3.3],
  [2022.5,72,-87,38,-64.66,-71.05,16666.4,7132.3,-15063.2,-48550.5,51331.5,-0.1,0.0,10.9,-33.8,-28.0,58.0,-51.3],
  [2023.0,49,20,167,5.20,26.85,30223.6,30099.4,2737.4,15301.2,33876.1,0.0,-0.1,23.9,23.3,7.2,-28.7,8.3],
  [2023.0,71,5,-13,-7.26,-17.38,28445.5,28217.7,-3592.6,-8905.8,29807.1,0.2,-0.1,-2.1,9.3,89.7,-65.6,17.6],
  [2023.0,95,14,65,-0.56,17.52,36805.8,36804.1,-356.8,11616.0,38595.3,0.0,0.1,37.7,37.9,22.9,90.4,63.1],
  [2023.0,86,-85,-79,41.76,-70.36,16888.7,12598.0,11248.0,-47331.2,50254.0,-0.1,0.0,6.0,25.6,-19.7,75.2,-68.9],
  [2023.0,30,-36,-64,-3.87,-39.40,17735.3,17694.8,-1198.1,-14566.5,22950.5,-0.2,-0.2,-76.8,-80.2,-47.9,-28.3,-41.4],
  [2023.0,75,79,125,-14.54,87.30,2692.1,2605.8,-676.0,57085.9,57149.3,-1.0,0.0,-15.7,-27.0,-41.5,31.6,30.8],
  [2023.0,21,6,-32,-15.22,-7.26,28634.3,27630.5,-7515.0,-3646.9,28865.6,0.2,-0.3,-10.8,11.3,82.5,-174.9,11.4],
  [2023.0,1,-76,-75,30.36,-65.32,19700.9,16998.9,9958.1,-42873.8,47183.6,-0.1,0.0,-17.2,-3.2,-28.5,88.0,-87.1],
  [2023.0,45,-46,-41,-11.94,-54.45,14187.4,13880.3,-2936.1,-19853.0,24401.3,0.0,-0.1,-74.8,-72.5,18.8,-4.5,-39.9],
  [2023.0,11,-22,-21,-24.12,-56.82,13972.9,12752.8,-5710.4,-21372.4,25534.7,0.1,-0.3,-99.1,-77.0,70.4,-57.8,-5.8],
  [2023.5,28,54,-120,16.20,74.02,15158.8,14556.6,4230.3,52945.6,55072.9,-0.1,-0.0,11.9,19.3,-24.0,-105.1,-97.8],
  [2023.5,68,-58,156,40.48,-81.60,9223.1,7015.1,5987.8,-62459.5,63136.8,0.3,0.0,9.5,-20.2,38.3,21.0,-19.4],
  [2023.5,39,-65,-88,29.86,-60.29,20783.0,18024.0,10347.2,-36415.6,41928.8,-0.1,0.0,-35.9,-20.5,-36.4,88.4,-94.6],
  [2023.5,27,-23,81,-13.98,-58.52,25568.2,24811.0,-6176.1,-41759.2,48965.0,0.1,0.0,44.0,55.4,40.2,-51.8,67.2],
  [2023.5,11,34,0,1.08,46.69,29038.8,29033.7,545.3,30807.0,42335.9,0.1,-0.0,26.2,24.9,70.4,26.6,37.4],
  [2023.5,72,-62,65,-66.98,-68.38,17485.0,6836.8,-16092.9,-44111.8,47450.8,-0.2,-0.0,-2.0,-50.3,-19.2,-35.3,32.1],
  [2023.5,55,86,70,61.19,87.51,2424.9,1168.7,2124.7,55750.6,55803.4,1.2,0.0,-32.0,-59.7,-3.6,34.7,33.3],
  [2023.5,59,32,163,0.36,43.05,28170.6,28170.0,176.0,26318.3,38551.7,-0.0,-0.0,25.9,26.0,-13.8,-0.7,18.4],
  [2023.5,65,48,148,-9.39,61.70,23673.8,23356.8,-3861.2,43968.0,49936.3,-0.1,0.0,14.1,10.3,-23.9,31.6,34.6],
  [2023.5,95,30,28,4.49,44.12,29754.7,29663.3,2331.2,28857.6,41450.1,0.1,0.1,12.0,8.7,42.8,66.2,54.8],
  [2024.0,95,-60,-59,8.86,-55.03,18317.9,18099.3,2821.2,-26193.2,31962.9,-0.1,-0.0,-57.4,-54.2,-25.1,43.5,-68.5],
  [2024.0,95,-70,42,-54.29,-64.59,18188.3,10615.3,-14769.3,-38293.4,42393.4,-0.2,0.0,9.1,-37.8,-38.4,15.3,-9.9],
  [2024.0,50,87,-154,-84.74,89.39,597.9,80.9,-592.4,55904.6,55907.8,4.5,-0.1,54.0,53.7,-47.2,12.8,13.3],
  [2024.0,58,32,19,3.94,45.89,29401.0,29331.6,2019.5,30329.8,42241.2,0.1,0.0,17.0,13.4,52.8,54.5,50.9],
  [2024.0,57,34,-13,-2.62,45.83,28188.3,28158.7,-1290.8,29015.5,40453.4,0.2,-0.0,33.7,37.4,79.9,-8.7,17.2],
  [2024.0,38,-76,49,-63.51,-67.40,18425.8,8218.0,-16491.7,-44260.7,47942.9,-0.2,0.0,7.9,-45.6,-31.5,27.6,-22.5],
  [2024.0,49,-50,-179,31.57,-71.40,18112.2,15431.4,9482.7,-53818.3,56784.4,0.1,0.0,-0.6,-22.2,34.9,44.3,-42.2],
  [2024.0,90,-55,-171,38.07,-72.91,16409.7,12918.7,10118.6,-53373.5,55839.2,0.1,0.0,7.8,-17.0,34.3,61.5,-56.5],
  [2024.0,41,42,-19,-5.00,56.57,24410.2,24317.3,-2127.0,36981.3,44311.1,0.2,-0.0,34.5,41.4,76.7,-9.2,11.4],
  [2024.0,19,46,-22,-6.60,61.04,22534.0,22384.7,-2590.4,40713.3,46533.4,0.2,-0.0,34.0,42.9,75.0,-8.5,9.0],
  [2024.5,31,13,-132,9.21,31.51,28413.4,28046.9,4548.8,17417.2,33326.9,-0.0,0.1,-62.9,-58.7,-30.8,27.1,-39.5],
  [2024.5,93,-2,158,7.16,-17.78,34124.3,33858.1,4253.5,-10940.3,35835.1,0.0,-0.1,-6.5,-7.4,6.3,-67.8,14.5],
  [2024.5,51,-76,40,-55.63,-66.27,18529.2,10459.6,-15294.7,-42141.5,46035.2,-0.2,0.0,7.6,-38.3,-35.4,33.4,-27.5],
  [2024.5,64,22,-132,10.52,43.88,26250.1,25808.9,4792.5,25239.1,36415.3,-0.0,0.1,-67.8,-62.6,-34.5,-9.5,-55.5],
  [2024.5,26,-65,55,-62.60,-65.67,18702.1,8607.6,-16603.5,-41366.0,45397.3,-0.2,0.0,7.3,-49.7,-34.0,-15.7,17.3],
  [2024.5,66,-21,32,-13.34,-56.95,15940.8,15510.7,-3677.9,-24502.7,29231.7,-0.1,0.1,45.8,37.2,-41.5,32.1,-1.9],
  [2024.5,18,9,-172,9.39,15.78,31031.6,30615.4,5065.5,8768.5,32246.7,0.1,0.0,-12.5,-17.9,31.4,12.7,-8.6],
  [2024.5,63,88,26,29.81,87.38,2523.6,2189.6,1254.6,55156.1,55213.8,1.4,0.0,-21.0,-48.3,42.1,29.2,28.2],
  [2024.5,33,17,5,0.61,13.58,34062.9,34060.9,362.9,8230.6,35043.1,0.1,0.0,19.6,18.9,65.9,9.6,21.3],
  [2024.5,77,-18,138,4.63,-47.71,31825.9,31722.0,2569.6,-34986.2,47296.1,-0.0,-0.0,-11.3,-9.0,-27.7,-26.8,12.2]
];

describe('MagVar tests', () => {
  // you can use the online calculator at
  // https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml
  test('can calculate Magvar correctly', () => {
    testData.forEach((test) => {
      const year = Math.trunc(test[0]);
      const month = 12 * (test[0] - year);
      const julian_days = MagVar.yymmdd_to_julian_days(year, month, 1);
      const height = test[1];
      const lat = test[2];
      const lon = test[3];
      const result = MagVar.calculateMagVar(julian_days, lat, lon, height);
      expect(result).toBeCloseTo(test[4], 0);
    });
  });

  test('can calculate Magvar correctly for the current date', () => {
    const lat = 51.2;
    const lon = -0.3;
    const magVarNow = MagVar.calculateMagVar(MagVar.julian_days_now, lat, lon, 0);
    expect(MagVar.get(lat, lon)).toBeCloseTo(magVarNow);
  });
});
