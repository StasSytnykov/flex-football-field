import React, { MutableRefObject, useCallback, useMemo, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { USGSOverlay } from "@/components/overlay";
import { image } from "@/components/base64";
import { AddButton } from "@/components/addFieldButton";
import { useFieldsPosition } from "@/hooks/useFieldsPostion";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const Map = () => {
  const fieldsElements = useRef<any>([]);
  const center = useMemo(() => ({ lat: 62.3027, lng: -150.2464 }), []);
  const { changePosition, onMouseMove, fieldsArr, setFieldsArr } =
    useFieldsPosition(center);

  const onButtonClick = useCallback(() => {
    const lastField = fieldsArr[fieldsArr.length - 1];
    const newField = {
      ...lastField,
      bounds: {
        north: lastField.bounds.north,
        east: lastField.bounds.east + 0.0019,
        south: lastField.bounds.south,
        west: lastField.bounds.west + 0.0019,
      },
      id: lastField.id + 1,
    };
    setFieldsArr((prevFieldsArr) => [...prevFieldsArr, newField]);
  }, [fieldsArr]);

  const onMouseDown = (e: google.maps.MapMouseEvent) => {
    setFieldsArr((prevState) =>
      prevState.map((field, index) => {
        if (
          fieldsElements.current[index] &&
          fieldsElements.current[index].contains(e.domEvent.target)
        ) {
          return { ...field, isPositionChanged: true };
        }
        return { ...field };
      })
    );
  };

  const onMouseUp = () => {
    setFieldsArr((prevState) =>
      prevState.map((field) => {
        return { ...field, isPositionChanged: false };
      })
    );
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        mapTypeId="satellite"
        onMouseUp={onMouseUp}
        onLoad={() => changePosition("start")}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        options={{
          disableDoubleClickZoom: true,
          draggable: fieldsArr.every((field) => !field.isPositionChanged),
          mapTypeId: "satellite",
        }}
      >
        <AddButton onButtonClick={onButtonClick} />
        {fieldsArr.map((field, index) => {
          return (
            <USGSOverlay
              bounds={field.bounds}
              image={image}
              // setBounds={setBounds}
              changeRef={(element: MutableRefObject<HTMLElement>) =>
                (fieldsElements.current[index] = element)
              }
              key={field.id}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
