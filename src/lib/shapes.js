import random from "./random";
import math from "./math";

const shapes = {

    getD (cx, cy, r) {

        const minX = cx - r;
        const minY = cy - r;
        const maxX = cx + r;
        const maxY = cy + r;

        let points = [{
            x: random.value(cx, minX),
            y: random.value(cy, minY),
        }, {
            x: random.value(maxX, cx),
            y: random.value(cy, minY),
        }, {
            x: random.value(maxX, cx),
            y: random.value(maxY, cy),
        }, {
            x: random.value(cx, minX),
            y: random.value(maxY, cy),
        }];

        return (x, y) => `M${points.map(item => `${Math.round(item.x + x)} ${Math.round(item.y + y)}`).join(' ')} Z`;

    },

    createShapesArray(countShapes, rAreaWithShapes, positionsShape, maxSizeShape, center) {
        return Array(countShapes).fill().map((_, i) => {
            const r = random.value(maxSizeShape, 2);

            const _angle = math.toRad(random.value(360));
            const x = Math.cos(_angle) * rAreaWithShapes - r * 2;
            const y = Math.sin(_angle) * rAreaWithShapes - r * 2;

            const cx = random.value(positionsShape[i % 2].x + x, positionsShape[i % 2].x - x);
            const cy = random.value(positionsShape[i % 2].y + y, positionsShape[i % 2].y - y);

            const a = cx - center;
            const b = cy - center;

            const angle = Math.atan2(b, a) * 180 / Math.PI;

            return {
                angle,
                kV: random.value(3, 1),
                r,
                cx,
                cy,
                getD: this.getD(cx, cy, r),
            }
        });
    },

    getPositionsShape (sizeMainShape, rAreaWithShapes, center, angle) {
        const angle1 = math.toRad(angle);
        const angle2 = math.toRad(angle + 180);

        const r = sizeMainShape / 6 + rAreaWithShapes;

        const getCoord = (angle, type = "cos") => center + r * Math[type](angle);


        return [{
            x: getCoord(angle1),
            y: getCoord(angle1, "sin")
        }, {
            x: getCoord(angle2),
            y: getCoord(angle2, "sin")
        }];

    },

    createShapesData (countShapes, sizeMainShape, sizeSVG, angle = 0) {

        const maxSizeShape = (sizeSVG - sizeMainShape) / countShapes / 0.4;

        const rAreaWithShapes = (sizeSVG - sizeMainShape) / 10;

        const center = sizeSVG / 2;

        const positionsShape = this.getPositionsShape(sizeMainShape, rAreaWithShapes, center, angle);

        return this.createShapesArray(countShapes, rAreaWithShapes, positionsShape, maxSizeShape, center);
    }
};

export default shapes;