import React, { FC, useRef, useState, useCallback } from "react";
import { OverlayView, OverlayViewF } from "@react-google-maps/api";
import Field from "@/components/field";
import FootballList from "@/components/field";
import Football from "@/components/field/football";

export const USGSOverlay: FC<any> = ({
  bounds,
  image,
  setBounds,
  changeRef,
  id,
}) => {
  const [isRotationChanged, setRotationChanged] = useState(false);

  const overlayRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  const getCenter = (el: any) => {
    const element = document.getElementById(el);
    // @ts-ignore
    const { left, top, width, height } = element.getBoundingClientRect();
    return { x: left + width / 2, y: top + height / 2 };
  };

  const handleMouse = (event: any) => {
    if (isRotationChanged) {
      const arrowCenter = getCenter("div");
      const angle = Math.atan2(
        event.clientY - arrowCenter.y,
        event.clientX - arrowCenter.x
      );
      setRotation(angle);

      // const { west, east, south, north } = bounds;
      // // console.log({west, east, south, north})
      // // console.log(angle)
      //
      // const center = {
      //     lat: (north + south) / 2,
      //     lng: (east + west) / 2
      // };
      // const newBounds = {
      //     north: center.lat + (north - center.lat) * Math.cos(angle) + (east - center.lng) * Math.sin(angle),
      //     east: center.lng + (east - center.lng) * Math.cos(angle) - (north - center.lat) * Math.sin(angle),
      //     south: center.lat + (south - center.lat) * Math.cos(angle) + (west - center.lng) * Math.sin(angle),
      //     west: center.lng + (west - center.lng) * Math.cos(angle) - (south - center.lat) * Math.sin(angle)
      // };
      //
      // console.log(newBounds)
      // setBounds((prev) => ({ ...prev, ...newBounds }));
    }
  };

  const minFieldWidth = 250;
  const minFieldHeight = 220;
  const [size, setSize] = useState({
    x: -162.3858715556562,
    y: -252.47920858114958,
  });

  const handler = (mouseDownEvent: { pageX: number; pageY: number }) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number }) {
      console.log(mouseMoveEvent.pageY);
      let newXCount = startSize.x - startPosition.x + mouseMoveEvent.pageX;
      let newYCount = startSize.y - startPosition.y + mouseMoveEvent.pageY;

      setSize({
        x: newXCount > minFieldWidth ? newXCount : minFieldWidth,
        y: newYCount > minFieldHeight ? newYCount : minFieldHeight,
      });
    }

    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
  };

  return (
    <OverlayViewF
      bounds={
        new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(bounds.south, bounds.west),
          new window.google.maps.LatLng(bounds.north, bounds.east)
        )
      }
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      // ref={overlayRef}
      onLoad={(overlayView) => {}}
    >
      {/*<div*/}
      {/*    // style={{ borderStyle: "none", borderWidth: "0px", position: 'absolute'}}*/}
      {/*    onMouseUp={(e) => {*/}
      {/*        e.stopPropagation()*/}
      {/*        setRotationChanged(!isRotationChanged);*/}
      {/*    }}*/}
      {/*    // onMouseMove={handleMouse}*/}
      {/*>*/}
      <div ref={changeRef}>
        {/*<div className="wrapper" style={{width: size.x, height: size.y}}>*/}
        {/*    <Football x={size.x} y={size.y}/>*/}
        {/*    <div className="draghandle" onMouseDown={handler}>Resize</div>*/}
        {/*</div>*/}
        <img
          onMouseUp={(e) => {
            e.stopPropagation();
            setRotationChanged(!isRotationChanged);
          }}
          id="div"
          src={image}
          style={{ width: "100%", height: "100%" }}
          alt="Football field"
        />
      </div>
    </OverlayViewF>
  );
};
