interface BarChartProps {
  // data item
  item: {
    name: string;
    count: number;
  }[];
  xAxisName: string;
  yAxisName: string;
}
export function BarChart({
  item = [{ name: 'sample', count: 5 }],
  xAxisName = 'X',
  yAxisName = 'Y',
}: BarChartProps) {
  const chartWidth = 760;
  const chartHeight = 480;
  const x0 = 100;
  const y0 = 50;
  const chartDividerNum = 4;
  const maxTextLength = 80;
  const chartLabelAxisOffset = 5;

  const xAxisLength = chartWidth - x0 * 2;
  const yAxisLength = chartHeight - y0 * 2;
  const yOrigin = y0 + yAxisLength;
  const chartDividerOffset = (chartWidth - x0) / chartDividerNum;

  if (item.length === 0) {
    return (
      <svg viewBox="0 0 960 960">
        <line x1={x0} x2={x0 + xAxisLength} y1={yOrigin} y2={yOrigin} stroke="red" />
        <text x={x0 + xAxisLength + chartLabelAxisOffset} y={yOrigin} dominantBaseline="middle">{xAxisName}</text>
        <line x1={x0} x2={x0} y1={y0} y2={yOrigin} stroke="red" />
        <text x={x0} y={y0 - chartLabelAxisOffset} textAnchor="middle">{yAxisName}</text>
      </svg>
    );
  }
  const largestCountItem = item.reduce((itemOne, itemTwo) => {
    if (itemOne.count > itemTwo.count) {
      return itemOne;
    }
    return itemTwo;
  });
  const maxDigitLength = largestCountItem.count.toString().length;
  const chartDividerFactor = 10 ** (maxDigitLength - 1);
  let largestDividerLabel = largestCountItem.count > 10
    ? Math.floor(largestCountItem.count / chartDividerFactor) * chartDividerFactor
    : largestCountItem.count;
  while (largestDividerLabel % 4 !== 0) {
    largestDividerLabel += chartDividerFactor;
  }

  const chartDividerLabels: string[] = [];
  let numAbbreviation = '';
  let removeDigitPlaces = 0;
  let sciNotation = false;

  if (maxDigitLength > 13) {
    sciNotation = true;
    removeDigitPlaces = maxDigitLength - 1;
  } else if (maxDigitLength >= 10) {
    numAbbreviation = 'B';
    removeDigitPlaces = 9;
  } else if (maxDigitLength >= 7) {
    numAbbreviation = 'M';
    removeDigitPlaces = 6;
  } else if (maxDigitLength >= 4) {
    numAbbreviation = 'K';
    removeDigitPlaces = 3;
  }

  for (let i = 0; i < 4; i++) {
    const dividerLabel = ((i + 1) * largestDividerLabel / 4) / (10 ** removeDigitPlaces);
    if (sciNotation) {
      chartDividerLabels.push(`${dividerLabel}e+${maxDigitLength}`);
    } else {
      chartDividerLabels.push(dividerLabel + numAbbreviation);
    }
  }

  const itemCount = item.length;
  const barYSpace = (chartHeight - y0) / (itemCount + 1);
  let itemCounter = -1;

  return (
    <svg viewBox="0 0 960 960">
      <line x1={x0} x2={x0 + xAxisLength} y1={yOrigin} y2={yOrigin} stroke="red" />
      <text x={x0 + xAxisLength + chartLabelAxisOffset} y={yOrigin} dominantBaseline="middle">{xAxisName}</text>
      <line x1={x0} x2={x0} y1={y0} y2={yOrigin} stroke="red" />
      <text x={x0} y={y0 - chartLabelAxisOffset} textAnchor="middle">{yAxisName}</text>

      {item && chartDividerLabels.map(
        (dividerLabel, idx) => {
          const xPos = (idx + 1) * chartDividerOffset;
          return (
            <g>
              <line
                x1={xPos}
                x2={xPos}
                y1={y0}
                y2={yOrigin}
                stroke="gray"
                opacity="0.33"
              />
              <text
                x={xPos}
                y={yOrigin + 5}
                textLength={maxTextLength / 4}
                lengthAdjust="spacingAndGlyphs"
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                {dividerLabel}
              </text>
            </g>
          );
        },
      )}

      {item && item.map((instance) => {
        const barWidth = (instance.count / largestDividerLabel) * chartDividerOffset * chartDividerNum - x0;

        let barHeight = (chartHeight - y0) / item.length;
        if (barHeight > 100) {
          barHeight = 100;
        }

        itemCounter += 1;
        return (
          <g>
            <rect x={x0} y={y0 + itemCounter * barYSpace} width={barWidth} height={barHeight} />
            <text
              x={0}
              y={y0 + itemCounter * barYSpace + barHeight / 2}
              textLength={maxTextLength}
              lengthAdjust="spacingAndGlyphs"
              dominantBaseline="middle"
            >
              {instance.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
