import { MutableRefObject, useState } from "react";
import { calculateRectangleCoordinates } from "@/utils/calculateRectangleCoordinates";

type Bounds = {
  north: number;
  east: number;
  south: number;
  west: number;
};

interface Field {
  id: number;
  bounds: Bounds;
  isPositionChanged: boolean;
  ref?: MutableRefObject<any>;
}

type FieldsArr = Field[];

type Stage = "start" | "move";

interface Props {
  lat: number;
  lng: number;
}

export const useFieldsPosition = (center: Props) => {
  const [fieldsArr, setFieldsArr] = useState<FieldsArr>([
    {
      id: 1,
      bounds: {
        north: 0,
        east: 0,
        south: 0,
        west: 0,
      },
      isPositionChanged: false,
    },
  ]);

  const changePosition = (stage: Stage, coords?: google.maps.LatLng) => {
    if (stage === "start") {
      setFieldsArr((prevState) => {
        const newPosition = new google.maps.LatLng(center);
        const newBounds = calculateRectangleCoordinates(newPosition);
        return prevState.map((field) => {
          return {
            ...field,
            bounds: { ...newBounds },
          };
        });
      });
    }

    if (stage === "move") {
      setFieldsArr((prevState) => {
        const newBounds = calculateRectangleCoordinates(coords);
        return prevState.map((field) => {
          if (field.isPositionChanged) {
            return { ...field, bounds: { ...newBounds } };
          }
          return {
            ...field,
          };
        });
      });
    }
  };

  const onMouseMove = (e: google.maps.MapMouseEvent) => {
    fieldsArr.map((field) => {
      if (field.isPositionChanged) {
        changePosition("move", e.latLng);
      }
    });
  };

  return { changePosition, onMouseMove, fieldsArr, setFieldsArr };
};
