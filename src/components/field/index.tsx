import React, {FC, useState} from "react";
import Football from "@/components/field/football";
// import styles from "@/pages/field-view/field-view.module.scss";

interface FootballListProps {
}

const FootballList: FC<FootballListProps> = ({}) => {

    const minFieldWidth = 250;
    const minFieldHeight = 220;
    const [size, setSize] = useState({x: 420, y: 270});


    const handler = (mouseDownEvent: { pageX: number; pageY: number; }) => {
        const startSize = size;
        const startPosition = {x: mouseDownEvent.pageX, y: mouseDownEvent.pageY};

        function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number; }) {
            console.log(mouseMoveEvent.pageY)
            let newXCount = startSize.x - startPosition.x + mouseMoveEvent.pageX
            let newYCount = startSize.y - startPosition.y + mouseMoveEvent.pageY

            setSize({
                x: newXCount > minFieldWidth ? newXCount : minFieldWidth,
                y: newYCount > minFieldHeight ? newYCount : minFieldHeight
            });
        }

        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp,);
    };

    return (
        <div className="wrapper" style={{width: size.x, height: size.y}}>
            <Football x={size.x} y={size.y}/>
            <div className="draghandle" onMouseDown={handler}>Resize</div>
        </div>
    )
};

export default FootballList;
