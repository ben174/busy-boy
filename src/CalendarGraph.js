import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

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
    var svgStyle = {}
    if (props.drawMode) {
        svgStyle.cursor = 'crosshair';
    }
    for (var w=52;w>0;w--) { 
        var days = Array();
        for (var d=7; d>0; d--) {
            var {date, level, off} = props.dates[dateIndex];
            if (off) {
                level = 0;
            }
            var fillColor = colors[level];
            const formattedDate = date.format('MM/DD/YYYY');
            var day = (
                <Tooltip title={formattedDate}>
                    <rect key={`day-${d}`} class="day" width="10" height="10" x={14-w} y={(d)*13} fill={fillColor} data-level={level} data-date={formattedDate}></rect>
                </Tooltip>
            )
            days.push(day);
            dateIndex++;
        }
        var column = <g key={`week-${w}`} onMouseDown={props.onDraw} onMouseOver={props.onDraw} transform={`translate(${w*14}, 0)`}>{days}</g>
        columns.push(column)
    }
    return (
        <svg width="700" height="112" style={svgStyle}>
            <g transform="translate(0, 0)">
                {columns}
            </g>
        </svg>
    );
}

export default CalendarGraph;