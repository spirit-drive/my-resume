import React, { Component } from 'react';
import face from "../../img/face.jpg";
import html from '../../lib/html';
import math from '../../lib/math';
import shapes from '../../lib/shapes';

class Face extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distance: this.props.sizeSVG / 2,
            angle: this.props.angle,
        };

        this.shapesData = shapes.createShapesData(this.props.shapeCounts, this.props.centerRadius || this.props.sizeMainShape, this.props.sizeSVG, this.state.angle);

    }


    renderShapes = () => this.shapesData.map((item, i) => {
        const {sizeSVG, kSizeRunningShapes} = this.props;
        const {distance} = this.state;
        const center = sizeSVG / 2;
        const x = item.cx + item.kV * distance * kSizeRunningShapes * Math.cos(math.toRad(item.angle)) - center;
        const y = item.cy + item.kV * distance * kSizeRunningShapes * Math.sin(math.toRad(item.angle)) - center;
        return (
            <path
                key={`circles_25.10.2018.22:58_${i}`}
                d={item.getD(x, y)}
            />
        );
    });


    onMouseMove = e => {
        const center = this.props.sizeSVG / 2;
        let {x, y} = html.getPosition(e.currentTarget.parentNode);
        x = e.pageX - x;
        y = e.pageY - y;
        const a = x - center;
        const b = y - center;

        const distance = math.getHypotenuse(a, b);
        this.setState({distance})
    };

    render() {
        const size = this.props.sizeSVG;
        return (
            <div className="App">
                <div style={{display: 'inline-block'}}>
                    <svg
                        onMouseMove={this.onMouseMove}
                        xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        <defs>
                            <filter id="myFilter1">
                                <feImage x="0" y="0" width="100%" height="100%" href="#1" result="1"/>
                                <feImage x="0" y="0" width="100%" height="100%" href="#2" result="2"/>
                                <feComposite in="1" in2="2" operator="xor"/>
                            </filter>

                            <filter id="myFilter2">
                                <feImage x="0" y="0" width="100%" height="100%" href="#4" result="1"/>
                                <feImage x="0" y="0" width="100%" height="100%" href="#3" result="2"/>
                                <feComposite in="1" in2="2" operator="in"/>
                            </filter>

                            <filter id="myFilter3">
                                <feOffset result="offOut" in="SourceAlpha" dx="-5" dy="5" />
                                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
                                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                            </filter>
                        </defs>

                        <g filter="url(#myFilter2)">
                            <image id="4" x="0" y="0" width="100%" height="100%" href={face}/>
                            <g id="3" filter="url(#myFilter1)">
                                <circle id="2" cx={size / 2} cy={size / 2} r={this.props.sizeMainShape / 2} fill="#ccc"/>
                                <g id="1">{this.renderShapes()}</g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        );
    }
}

Face.defaultProps = {
    sizeSVG: 610,
    sizeMainShape: 290,
    angle: 45,
    shapeCounts: 75,
    kSizeRunningShapes: 0.03,
    centerRadius: 300,
};

export default Face;