import * as React from 'react';

function CalendarGraph(props) {
    var columns = Array();
    var dateIndex = 0;
    const colors = [
        '#ebedf0',
        '#c6e48b',
        '#7bc96f',
        '#239a3b',
        '#196127',
    ]
    for (var w=0;w<52;w++) { 
        var days = Array();
        for (var d=0; d<7; d++) {
            var {date, level, off} = props.dates[dateIndex];
            if (off) {
                level = 0;
            }
            var fillColor = colors[level];
            var day = <rect key={`day-${d}`} class="day" width="10" height="10" x={14-w} y={d*13} fill={fillColor} data-level={level} data-date={date.format('MM/DD/YYYY')}></rect>
            days.push(day);
            dateIndex++;
        }
        var column = <g key={`week-${w}`} transform={`translate(${w*14}, 0)`}>{days}</g>
        columns.push(column)
    }
    return (
        <svg width="700" height="112">
            <g transform="translate(0, 20)">
                {columns}
            </g>
        </svg>
    );
}

export default CalendarGraph;