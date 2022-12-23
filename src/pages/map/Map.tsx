import React from "react";
import GoogleMapReact from "google-map-react";


const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

type Props = {};

const Map = (props: Props) => {
  const defaultProps = {
    center: {
      lat: 10.771663,
      lng: 106.669631,
    },
    zoom: 15,
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "s" }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
         <AnyReactComponent
          lat={19.955413}
          lng={20.337844}
          text="My Marker"
        />
         <AnyReactComponent
          lat={29.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
